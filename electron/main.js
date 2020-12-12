const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const sqlite3 = require('sqlite3');
const { channels } = require('../src/shared/constants');

const userData = app.getPath('userData');
const dbFile = path.resolve(userData, 'db.sqlite3');
const db = new sqlite3.Database(dbFile, (err) => {
    if (err) console.error('Database opening error', err);
    console.log(`sqlite debug:`, { err, dbFile, userData });
});

const escpos = require('escpos');
escpos.USB = require('escpos-usb');
// escpos.USB.findPrinter();
// const usbDevice = new escpos.USB(0x01, 0xff);

const device = new escpos.USB();
// const options = { encoding: 'GB18030' /* default */ };
const options = { encoding: 'GB18030' /* default */ };
// const options = { encoding: 'GB18030' /* default */, includeParity: false };
// const options = { encoding: 'UTF-16BE', height: 25 /* default */ };
const printer = new escpos.Printer(device, options);

let mainWindow;

function createWindow() {
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
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    // mainWindow.removeMenu();
    mainWindow.setOpacity(1);
    mainWindow.loadURL(startUrl);
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on(channels.APP_INFO, (event, { username, password }) => {
    console.log('verify login:', { username, password });

    const sql = `SELECT * from Users WHERE username = ? AND password = ?`;

    db.get(sql, [username, password], (err, row) => {
        if (!row) {
            event.sender.send(channels.APP_INFO, {
                username,
                error: `Invalid Credential for User: ${username}`,
            });
        } else {
            const { user_id, username } = row;
            event.sender.send(channels.APP_INFO, {
                user_id,
                username,
            });
        }
    });
});

// LOGIN USER SQL
ipcMain.on(channels.LOGIN_USER, (event, { username, password }) => {
    console.log(`verify login:`, { username, password });
    const sql = `SELECT * from users WHERE username = ? AND password = ?`;

    db.get(sql, [username, password], (err, row) => {
        if (!row) {
            event.sender.send(channels.LOGIN_USER, {
                username,
                error: `Invalid Credential`,
            });
        } else {
            console.log('found user', row);
            const { user_id, username } = row;
            event.sender.send(channels.LOGIN_USER, {
                user_id,
                username,
            });
        }
    });
});

// GET ACCOUNT DETAIL
ipcMain.on(channels.GET_ACCOUNT, (event, { account }) => {
    console.log(`account detail`, { account });
    // const sql = `SELECT account, record_id, invoiceDate, invoiceTime, firstName, lastName, fullname, areaCode, phone memberSince, gallonRemain, gallonBuy, afterBuyGallonTotal, overGallon, lastRenewGallon  FROM mckee WHERE account = ${account} ORDER BY record_id DESC LIMIT 1`;
    const sql_invoices = `SELECT account, record_id, invoiceDate, invoiceTime, firstName, lastName, fullname, areaCode, phone memberSince, gallonCurrent, gallonBuy, gallonRemain, overGallon, lastRenewGallon, renew, renewFee FROM mckee WHERE account = ${account} ORDER BY record_id `;
    const sql = `SELECT account, record_id, invoiceDate, invoiceTime, firstName, lastName, fullname, areaCode, phone, memberSince, gallonCurrent, gallonBuy, gallonRemain, afterBuyGallonTotal, overGallon, lastRenewGallon, renew, renewFee FROM mckee WHERE account = ${account} ORDER BY record_id DESC LIMIT 1`;

    db.get(sql, (err, row) => {
        event.sender.send(channels.GET_ACCOUNT, row);
    });
});

// GET ACCOUNT INVOICES:
ipcMain.on(channels.GET_MEMBER_INVOICES, (event, args) => {
    const { account } = args;
    console.log(`get invoice`, account);
    const getAccountInvoices = `SELECT * FROM mckee WHERE account = ${account}`;
    db.all(getAccountInvoices, (err, row) => {
        // console.log({ statement, err, row });
        console.log(row);

        event.sender.send(channels.GET_MEMBER_INVOICES, row);
    });
});

// Print Receipt
ipcMain.on(channels.PRINT_RECEIPT, (event, args) => {
    const { receipt } = args;
    console.log('print receipt', receipt);

    const fullname = `${
        receipt.detail.fullname
    } --- ${receipt.detail.phone.slice(4, 8)} `;
    const account = `[Account #: ${receipt.account}]`;
    const prevGallon = `Gallon Prev: ${receipt.prevGallon}`;
    // const prevGallon = `Gallon Prev: ${receipt.detail.afterBuyGallonTotal}`;
    const buyGallon = `Gallon Buy:  ${receipt.buyGallon}`;
    const renew1 =
        receipt.gallonLeft <= 0 && receipt.overLimit === 0
            ? ` => [Please Renew Membership!!!]`
            : '';
    const renew2 =
        receipt.overLimit < 0 ? `=> [Please Renew Membership!!!]` : '';
    const remainGallon = `Gallon Left: ${receipt.gallonLeft} ${renew1}`;
    const gallonOver = `Gallon Over: ${receipt.overLimit} ${renew2}`;
    const timestamp = `${receipt.timestamp}`;
    const blank = ` `;
    const record_id = receipt.detail.record_id;
    device.open(function (error) {
        printer
            .font('a')
            // .font('b')
            .align('lt')
            // .style('bu')
            .text(fullname)
            .text(account)
            .text(prevGallon)
            .text(buyGallon)
            .text(remainGallon)
            .text(gallonOver)
            .text(timestamp)
            .text('Thank You')
            .text('Mckee Pure Water')
            // .barcode('1234567', 'EAN8')
            .barcode(record_id.toString(), 'EAN8', { includeParity: false })
            // .barcode(record_id.toString(), 'EAN13')
            .text(blank)
            .text(blank)
            .cut()
            .close();
        event.sender.send(channels.PRINT_RECEIPT, { done: true });
        // .qrimage('https://github.com/song940/node-escpos', function (err) {
        //     event.sender.send(channels.PRINT_RECEIPT, { done: true });
        //     this.cut();
        //     this.close();
        // });
    });
});

// GET CURRENT GALLON FOR MEMBER
ipcMain.on(channels.GET_CURRENT_GALLON, (event, args) => {
    console.log('current gallon', args);
    const sql = `SELECT account, firstName, lastName, fullname,  areaCode, phone, memberSince, gallonCurrent, gallonBuy, afterBuyGallonTotal, gallonRemain, overGallon, lastRenewGallon, renewFee, renewGallon, record_id, invoiceDate, invoiceTime FROM mckee WHERE account = '${args}' ORDER BY record_id DESC LIMIT 1;
`;

    db.get(sql, (err, row) => {
        event.sender.send(channels.GET_CURRENT_GALLON, row);
    });
});

// FIND MEMBERSHIP
ipcMain.on(channels.FIND_MEMBERSHIP, (event, args) => {
    console.log('find membership', { args });
    const { phone, account, firstName, lastName } = args;

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

    // const query = `SELECT
    //                 DISTINCT
    //                     firstName,
    //                     lastName,
    //                     fullname,
    //                     account,
    //                     areaCode,
    //                     phone,
    //                     memberSince
    //                 FROM mckee
    //                 WHERE phone = ?
    //                 OR account = ?
    //                 OR firstName = ?
    //                 OR lastName = ?
    // `;
    let query = `SELECT 
                    DISTINCT 
                        firstName, 
                        lastName, 
                        fullname, 
                        account, 
                        areaCode, 
                        phone,
                        memberSince 
                    FROM mckee 
                    WHERE phone = ?
                    OR account = ? AND areaCode is NOT NULL
                    OR fullname = ?`;

    let fullname;

    if (firstName && lastName) {
        fullname = firstName + ' ' + lastName;
        query = `SELECT 
                    DISTINCT 
                        firstName, 
                        lastName, 
                        fullname, 
                        account, 
                        areaCode, 
                        phone,
                        memberSince 
                    FROM mckee 
                    WHERE phone = ?
                    OR account = ?
                    OR fullname = ?`;
    } else if (firstName && !lastName) {
        fullname = firstName;
        query = `SELECT
                    DISTINCT
                        firstName,
                        lastName,
                        fullname,
                        account,
                        areaCode,
                        phone,
                        memberSince
                    FROM mckee
                    WHERE phone = ?
                    OR account = ?
                    OR firstName = ?`;
    } else if (lastName && !firstName) {
        fullname = lastName;
        query = `SELECT
                    DISTINCT
                        firstName,
                        lastName,
                        fullname,
                        account,
                        areaCode,
                        phone,
                        memberSince
                    FROM mckee
                    WHERE phone = ?
                    OR account = ?
                    OR lastName = ?`;
    }
    // if (firstName || lastName) {
    //     fullname = firstName || '%' + lastName || '%';
    //     query = `SELECT
    //                 DISTINCT
    //                     firstName,
    //                     lastName,
    //                     fullname,
    //                     account,
    //                     areaCode,
    //                     phone,
    //                     memberSince
    //                 FROM mckee
    //                 WHERE phone = ?
    //                 OR account = ?
    //                 OR fullname like ?`;
    // }

    // const sql = `SELECT * FROM memberships
    //                 WHERE Phone like '___${
    //                     phone ? phone.replace(/-/g, '') : ''
    //                 }'
    //                 OR MemberAccount = '${account}'
    //                 OR FirstName = '${firstName}'
    //                 AND LastName = '${lastName}' `;
    // db.all(sql, (err, rows) => {
    db.all(
        query,
        // [phone, account, firstName, lastName],
        // [phone, account, firstName || '%' + lastName || '%'],
        [phone, account, fullname],
        // [
        //     phone,
        //     account,
        //     firstName || firstName.toUpperCase(),
        //     lastName || lastName.toUpperCase(),
        // ],
        (err, rows) => {
            console.log(rows);
            if (err) console.log({ err });
            if (!rows.length) {
                console.log('Unable to find User');

                // event.sender.send(channels.FIND_MEMBERSHIP, {
                //     error: `Unable to locate Membership: ${selection} `,
                // });

                event.sender.send(channels.FIND_MEMBERSHIP, {
                    error: {
                        message: `Unable to locate Membership: ${selection} `,
                        field: selection,
                    },
                });
            } else {
                console.log(rows.length);
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
        }
    );
});
