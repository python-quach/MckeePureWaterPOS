const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');
const sqlite3 = require('sqlite3');
const { channels } = require('../src/shared/constants');
const { sql } = require('./query');
const { receiptPrinter } = require('./printer');
const {
    createNewMembership,
    renewMembership,
    buyWaterGallon,
    getDailyReport,
} = require('./db');
const userData = app.getPath('userData');
const dbFile = path.resolve(userData, 'membership.sqlite3');
const usbDetect = require('usb-detection');

let db;

// ESC-POS PRINTER SETUP
let escpos = require('escpos');
escpos.USB = require('escpos-usb');
const options = { encoding: 'GB18030' /* default */ };

let device;
let printer;
let mainWindow;

usbDetect.startMonitoring();
usbDetect
    .find()
    .then(function (devices) {
        console.log(devices);
        devices.forEach(function (item) {
            if (item.deviceName === 'USB Printing Support') {
                device = new escpos.USB();
                printer = new escpos.Printer(device, options);
            }
        });
    })
    .catch(function (err) {
        console.log(err);
        device = null;
        printer = null;
    });

usbDetect.on('remove', function (device) {
    console.log('remove', device);
    app.quit();
});

usbDetect.on('add', function (device) {
    console.log('add', device);
});

usbDetect.on('change:vid:pid', function (device) {
    console.log('change', device);
});

// Electron Main Window Setup
function createWindow() {
    // Connect to Sqlite3 local database
    db = new sqlite3.Database(dbFile, (err) => {
        if (err) console.error('Database opening error', err);
        console.log(`sqlite debug:`, { err, dbFile, userData });
    });

    const startUrl =
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, '../index.html'),
            protocol: 'file:',
            slashes: true,
        });

    mainWindow = new BrowserWindow({
        show: false,
        width: 800,
        height: 600,
        darkTheme: true,
        backgroundColor: '#060b22',
        frame: true,
        fullscreen: true,
        maximizable: true,
        transparent: false,
        fullscreenable: true,
        autoHideMenuBar: true,
        resizable: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            // devTools: false,
        },
    });
    // mainWindow.removeMenu();
    mainWindow.setOpacity(1);
    mainWindow.loadURL(startUrl);
    mainWindow.on('closed', function () {
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
            usbDetect.stopMonitoring();
            mainWindow = null;
        });
    });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
            app.quit();
        });
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

// Close Application
ipcMain.on(channels.CLOSE_APP, (event, _) => {
    ipcMain.removeAllListeners(channels.CLOSE_APP);
    console.log('Closing App');
    app.quit();
});

// LOGIN USER SQL
ipcMain.on(channels.LOGIN_USER, (event, { username, password }) => {
    db.get(sql.login, [username, password], (err, row) => {
        if (!row) {
            event.sender.send(channels.LOGIN_USER, {
                username,
                error: `Invalid Credential`,
            });
        } else {
            const { user_id, username } = row;
            event.sender.send(channels.LOGIN_USER, {
                user_id,
                username,
            });
        }
    });
});

// FIND MEMBERSHIP
ipcMain.on(
    channels.FIND_MEMBERSHIP,
    (event, { phone, account, firstName, lastName }) => {
        const first = firstName || '';
        const last = lastName || '';
        const fullname = phone || account ? '' : first + '%' + last;
        const values = [phone, account, fullname];

        let selection;

        if (phone) {
            selection = 'phone';
        }
        if (account) {
            selection = 'account';
        }
        if (firstName) {
            selection = 'firstName';
        }

        if (lastName) {
            selection = 'lastName';
        }

        db.all(sql.find, values, (err, rows) => {
            if (err) console.log({ err });
            if (!rows.length) {
                event.sender.send(channels.FIND_MEMBERSHIP, {
                    error: {
                        message: `Unable to locate Membership: ${selection} `,
                        field: selection,
                    },
                });
            } else {
                if (rows.length === 1) {
                    event.sender.send(channels.FIND_MEMBERSHIP, {
                        membership: rows,
                    });
                } else {
                    event.sender.send(channels.FIND_MEMBERSHIP, {
                        memberships: rows,
                    });
                }
            }
        });
    }
);

// GET LAST ACCOUNT:
ipcMain.on(channels.GET_LAST_ACCOUNT, (event, _) => {
    db.get(sql.lastAccount, (err, row) => {
        if (err) return console.log(err.message);
        event.sender.send(channels.GET_LAST_ACCOUNT, {
            account: parseInt(row.account),
        });
    });
});

// GET LAST RECORD ID:
ipcMain.on(channels.LAST_RECORD, (event, args) => {
    db.get(sql.lastRecord, (err, row) => {
        event.sender.send(channels.LAST_RECORD, row);
    });
});

// GET ACCOUNT DETAIL
ipcMain.on(channels.GET_ACCOUNT, (event, { account }) => {
    db.get(sql.accountDetail, account, (err, row) => {
        event.sender.send(channels.GET_ACCOUNT, row);
    });
});

// GET ACCOUNT INVOICES:
ipcMain.on(channels.GET_MEMBER_INVOICES, (event, args) => {
    const { account, limit, offset } = args;
    db.all(sql.getInvoices, [account, limit, offset], (err, rows) => {
        if (err) return console.log(err.message);
        event.sender.send(channels.GET_MEMBER_INVOICES, rows);
    });
});

// GET TOTAL INVOICE
ipcMain.on(channels.GET_TOTAL_INVOICE, (event, args) => {
    const { account } = args;
    db.get(sql.totalInvoice, account, (err, count) => {
        if (err) return console.log(err.message);
        event.sender.send(channels.GET_TOTAL_INVOICE, {
            count: count.count,
        });
    });
});

// BUY
ipcMain.on(channels.BUY_WATER, (event, args) => {
    buyWaterGallon(db, args, (row, lastID) => {
        if (device) {
            receiptPrinter.buyReceipt(device, printer, args, row, () => {
                event.sender.send(channels.BUY_WATER, {
                    ...row,
                    lastRecord: lastID,
                });
            });
        } else {
            event.sender.send(channels.BUY_WATER, {
                ...row,
                lastRecord: lastID,
            });
        }
    });
});

// ADD NEW MEMBERSHIP TO DATABASE
// ipcMain.on(channels.ADD_NEW_MEMBER, (event, args) => {
//     createNewMembership(db, args, (row, lastID) => {
//         if (device) {
//             receiptPrinter.newMembership(device, printer, args, row, () => {
//                 event.sender.send(channels.ADD_NEW_MEMBER, {
//                     ...row,
//                     lastRecord: lastID,
//                 });
//             });
//         } else {
//             event.sender.send(channels.ADD_NEW_MEMBER, {
//                 ...row,
//                 lastRecord: lastID,
//             });
//         }
//     });
// });

// RENEW
ipcMain.on(channels.RENEW_WATER, (event, args) => {
    renewMembership(db, args, (row, lastID) => {
        if (device) {
            receiptPrinter.renewReceipt(device, printer, args, row, () => {
                event.sender.send(channels.RENEW_WATER, {
                    ...row,
                    lastRecord: lastID,
                });
            });
        } else {
            event.sender.send(channels.RENEW_WATER, {
                ...row,
                lastRecord: lastID,
            });
        }
    });
});

// GET CURRENT GALLON FOR MEMBER
ipcMain.on(channels.GET_CURRENT_GALLON, (event, args) => {
    db.get(sql.currentGallon, (err, row) => {
        event.sender.send(channels.GET_CURRENT_GALLON, row);
    });
});

// UPDATE MEMBERSHIP INFO
ipcMain.on(channels.UPDATE_MEMBER, (event, args) => {
    const { firstName, lastName, areaCode, phone, account } = args;
    const threeDigit = phone.slice(0, 3);
    const fourDigit = phone.slice(4, 8);
    const fullname = firstName + ' ' + lastName;

    const data = [
        areaCode,
        phone,
        firstName,
        lastName,
        fullname,
        threeDigit,
        fourDigit,
        account,
    ];

    db.run(sql.update, data, function (err) {
        if (err) {
            return console.error(err.message);
        }
        event.sender.send(channels.UPDATE_MEMBER, args);
    });
});

// GET TOTAL RENEW FEE
ipcMain.on(channels.GET_TOTAL_FEE, (event, request) => {
    const { account } = request;

    db.get(sql.totalFee, account, (err, row) => {
        if (err) {
            ipcMain.removeAllListeners(channels.GET_TOTAL_FEE);
            return console.log(err.message);
        }

        const { totalRenewalFee } = row;
        event.sender.send(channels.GET_TOTAL_FEE, { totalRenewalFee });
    });
});

// GET TOTAL RENEW GALLON
ipcMain.on(channels.GET_TOTAL_RENEW_GALLON, (event, request) => {
    const { account } = request;
    db.all(sql.totalRenew, account, (err, row) => {
        if (err) {
            ipcMain.removeAllListeners(channels.GET_TOTAL_RENEW_GALLON);
            return console.log(err.message);
        }
        let sum = 0;
        row.forEach((data) => {
            if (parseInt(data.field19) === 0 && data.field28 === null) {
                sum = sum + parseInt(data.field31);
            } else {
                if (data.field28 !== null) {
                    sum = sum + parseInt(data.field28);
                }
            }
        });

        event.sender.send(channels.GET_TOTAL_RENEW_GALLON, {
            totalRenewalGallon: sum,
        });
    });
});

// GET TOTAL BUY GALLON
ipcMain.on(channels.GET_TOTAL_BUY_GALLON, (event, request) => {
    const { account } = request;
    db.get(sql.totalBuy, account, (err, row) => {
        if (err) {
            ipcMain.removeAllListeners(channels.GET_TOTAL_BUY_GALLON);
            return console.log(err.message);
        }
        const { totalBuyGallon } = row;
        event.sender.send(channels.GET_TOTAL_BUY_GALLON, {
            totalBuyGallon,
        });
    });
});

// GET DAILY REPORT
ipcMain.on(channels.REPORT, (event, request) => {
    const { date, time } = request;
    getDailyReport(db, date, (totalFee, totalRenewAmount, totalBuy) => {
        if (device) {
            receiptPrinter.dailyReport(
                device,
                printer,
                totalFee,
                totalRenewAmount,
                totalBuy,
                date,
                time,
                () => {
                    event.sender.send(channels.REPORT, {
                        totalFee,
                        totalRenewAmount,
                        totalBuy,
                    });
                }
            );
        } else {
            event.sender.send(channels.REPORT, {
                totalFee,
                totalRenewAmount,
                totalBuy,
            });
        }
    });
});

// CHECK FOR DUPLICATE ACCOUNT
ipcMain.on(channels.DUPLICATE_ACCOUNT, (event, account) => {
    console.log('account check', account);
    const sql = `SELECT DISTINCT field22 FROM mckee WHERE field22 = ?`;
    db.get(sql, account, (err, row) => {
        console.log(row);
        if (err) return console.log(err.message);
        event.sender.send(channels.DUPLICATE_ACCOUNT, row);
    });
});

ipcMain.on(channels.SHOW_BACKUP_DIALOG, (event, request) => {
    console.log('open dialog box');
    const currentdate = new Date();
    const datetime =
        currentdate.getMonth() +
        1 +
        '-' +
        currentdate.getDate() +
        '-' +
        currentdate.getFullYear();
    console.log(datetime);
    const saveFile = dialog.showSaveDialog({
        properties: ['openFile', 'multiSelections'],
        defaultPath: `backup-${datetime}.sqlite3`,
        filters: [{ name: 'Sqlite3', extensions: ['sqlite3'] }],
    });

    console.log(saveFile);
    if (saveFile) {
        fs.copyFile(dbFile, saveFile, function (err) {
            if (err) {
                event.sender.send(channels.SHOW_BACKUP_DIALOG, { open: false });
                throw err;
            } else {
                console.log(
                    'Successfully copied and moved the file!',
                    saveFile
                );
                event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                    open: `backup-${datetime}.sqlite3`,
                });
            }
        });
    } else {
        event.sender.send(channels.SHOW_BACKUP_DIALOG, { open: false });
    }
});

// ADD NEW MEMBERSHIP
ipcMain.on(channels.ADD_NEW_MEMBER, (event, args) => {
    const { account } = args;
    let sql = `SELECT * FROM mckee WHERE field22 = ?`;

    db.get(sql, [account], (err, row) => {
        if (!row) {
            createNewMembership(db, args, (row, lastID) => {
                if (device) {
                    receiptPrinter.newMembership(
                        device,
                        printer,
                        args,
                        row,
                        () => {
                            event.sender.send(channels.ADD_NEW_MEMBER, {
                                ...row,
                                lastRecord: lastID,
                                message: `${account} added to Database`,
                            });
                        }
                    );
                } else {
                    event.sender.send(channels.ADD_NEW_MEMBER, {
                        ...row,
                        lastRecord: lastID,
                        message: `${account} added to Database`,
                    });
                }
            });
        } else {
            event.sender.send(channels.ADD_NEW_MEMBER, {
                error: `${account} already existed, Please use another account`,
            });
        }
    });
});
