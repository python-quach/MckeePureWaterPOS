const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const sqlite3 = require('sqlite3');
const { channels } = require('../src/shared/constants');
const { sql } = require('./query');

const userData = app.getPath('userData');
// const dbFile = path.resolve(userData, 'db.sqlite3');
const dbFile = path.resolve(userData, 'membership.sqlite3');
// const db = new sqlite3.Database(dbFile, (err) => {
//     if (err) console.error('Database opening error', err);
//     console.log(`sqlite debug:`, { err, dbFile, userData });
// });

let db;

const sqlSum = `SELECT SUM(lastRenewGallon) FROM (

SELECT 
	record_id, 
	account, 
	firstName, 
	lastName, 
	fullname, 
	memberSince, 
	areaCode, 
	field6, 
	field7, 
	phone, 
	gallonCurrent,
	gallonBuy, 
	gallonRemain, 
	renewFee, 
	invoiceDate, 
	renew, 
	lastRenewGallon, 
	invoiceTime, 
	overGallon
FROM 
	mckee
WHERE account = '45403' 
ORDER BY 
	record_id
DESC 
) WHERE renew IS NULL OR gallonBuy IS NULL ORDER BY record_id ASC `;

const sqlGallonbuy = `SELECT SUM(gallonBuy) FROM (

SELECT 
	record_id, 
	account, 
	firstName, 
	lastName, 
	fullname, 
	memberSince, 
	areaCode, 
	field6, 
	field7, 
	phone, 
	gallonCurrent,
	gallonBuy, 
	gallonRemain, 
	renewFee, 
	invoiceDate, 
	renew, 
	lastRenewGallon, 
	invoiceTime, 
	overGallon
FROM 
	mckee
WHERE account = '45403' 
ORDER BY 
	record_id
DESC 
) ORDER BY record_id ASC `;

// ESC-POS PRINTER SETUP
const escpos = require('escpos');
escpos.USB = require('escpos-usb');
const device = new escpos.USB();
const options = { encoding: 'GB18030' /* default */ };
const printer = new escpos.Printer(device, options);

// const device = {};
// const printer = {};

let mainWindow;

function createWindow() {
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
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
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
        });
        mainWindow = null;
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
        });
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

// LOGIN USER SQL
ipcMain.on(channels.LOGIN_USER, (event, { username, password }) => {
    console.log(`verify login:`, { username, password });
    db.get(sql.login, [username, password], (err, row) => {
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

// FIND MEMBERSHIP
ipcMain.on(
    channels.FIND_MEMBERSHIP,
    (event, { phone, account, firstName, lastName }) => {
        console.log('find membership', { phone, account, firstName, lastName });

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
            console.log(rows);
            if (err) console.log({ err });
            if (!rows.length) {
                console.log('Unable to find User');
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
        });
    }
);

// GET LAST ACCOUNT:
ipcMain.on(channels.GET_LAST_ACCOUNT, (event, _) => {
    console.log('getting last account');
    // const sql = `SELECT DISTINCT account FROM mckee ORDER BY record_id DESC LIMIT 1`;
    // const sql = `SELECT DISTINCT field22 account FROM mckee ORDER BY field20  DESC LIMIT 1`;
    db.get(sql.lastAccount, (err, row) => {
        if (err) return console.log(err.message);
        event.sender.send(channels.GET_LAST_ACCOUNT, {
            account: parseInt(row.account),
        });
    });
});

// GET LAST RECORD ID:
ipcMain.on(channels.LAST_RECORD, (event, args) => {
    console.log('getting last record');
    // const sql = `SELECT MAX(rowid) barcode, field20 record_id FROM mckee`;
    db.get(sql.lastRecord, (err, row) => {
        // console.log(row);
        event.sender.send(channels.LAST_RECORD, row);
    });
});

// GET ACCOUNT DETAIL
ipcMain.on(channels.GET_ACCOUNT, (event, { account }) => {
    console.log(`account detail`, { account });
    // const sql = `SELECT account, record_id, invoiceDate, invoiceTime, firstName, lastName, fullname, field6, field7, areaCode, phone, memberSince, gallonCurrent, gallonBuy, gallonRemain, afterBuyGallonTotal, overGallon, lastRenewGallon, renew, renewFee FROM mckee WHERE account = ${account} ORDER BY record_id DESC LIMIT 1`;

    db.get(sql.accountDetail, account, (err, row) => {
        console.log(row);
        event.sender.send(channels.GET_ACCOUNT, row);
    });
});

// GET ACCOUNT INVOICES:
ipcMain.on(channels.GET_MEMBER_INVOICES, (event, args) => {
    // console.log('get invoices');
    const { account, limit, offset } = args;
    console.log('get invoices', account, limit, offset);
    // const getAccountInvoices = `SELECT * FROM mckee WHERE account = ${account} ORDER BY record_id DESC LIMIT ${limit} OFFSET ${offset}`;
    // const getAccountInvoices = `SELECT * FROM mckee WHERE account = ${account} ORDER BY record_id DESC LIMIT ${limit} OFFSET ${offset}`;
    db.all(sql.getInvoices, [account, limit, offset], (err, rows) => {
        // db.all(getAccountInvoices,  (err, row) => {
        console.log(rows);
        if (err) return console.log(err.message);

        event.sender.send(channels.GET_MEMBER_INVOICES, rows);
    });
});

// GET TOTAL INVOICE
ipcMain.on(channels.GET_TOTAL_INVOICE, (event, args) => {
    console.log('get total', args);
    const { account } = args;
    // const sql = `SELECT COUNT(*) as count FROM mckee WHERE account = ?`;
    // db.get(sql, account, (err, count) => {
    db.get(sql.totalInvoice, account, (err, count) => {
        if (err) return console.log(err.message);
        event.sender.send(channels.GET_TOTAL_INVOICE, {
            count: count.count,
        });
    });
});

// CUSTOMER WATER BUY UPDATE
ipcMain.on(channels.BUY_WATER, (event, args) => {
    console.log(`add buy update`, args);
    const {
        record_id,
        account,
        firstName,
        lastName,
        fullname,
        memberSince,
        phone,
        prevGallon,
        buyGallon,
        gallonLeft,
        overGallon,
        renew,
        renewFee,
        lastRenewGallon,
        invoiceDate,
        invoiceTime,
        areaCode,
        threeDigit,
        fourDigit,
    } = args;

    db.run(
        sql.buy,
        [
            record_id,
            account,
            firstName,
            lastName,
            fullname,
            memberSince,
            phone,
            prevGallon,
            buyGallon,
            gallonLeft,
            overGallon,
            renew,
            renewFee,
            lastRenewGallon,
            invoiceDate,
            invoiceTime,
            areaCode,
            threeDigit,
            fourDigit,
        ],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            const last = this.lastID;
            db.get(
                `SELECT * FROM mckee WHERE rowid = ${this.lastID}`,
                (err, row) => {
                    console.log(row);
                    const fullname = `${row.field4} -- ${row.field7}`;
                    const account = `[Account #: ${row.field22}]`;
                    const prevGallon = `Gallon Prev: ${row.field31}`;
                    const gallonBuy = `Gallon Buy:  ${row.field19}`;
                    const invoice = `Invoice #: ${row.field20}-${this.lastID}`;
                    const blank = '';
                    const renew2 =
                        row.field12 <= 0
                            ? `=> [Please Renew Membership!!!]`
                            : '';
                    const gallonLeft = `Gallon Left: ${row.field12}${renew2}`;
                    device.open(function (error) {
                        printer
                            .font('a')
                            .align('lt')
                            .text('Thank You')
                            .text('Mckee Pure Water')
                            .text('2349 McKee Rd')
                            .text('San Jose, CA 95116')
                            .text('(408) 729-1319')
                            .text(blank)
                            .text(fullname)
                            .text(account)
                            .text(prevGallon)
                            .text(gallonBuy)
                            .text(gallonLeft)
                            .text(row.field15 + ' ' + row.field32)
                            .text(blank)
                            .text(invoice)
                            .text(blank)
                            .cut()
                            .close();
                        event.sender.send(channels.BUY_WATER, {
                            ...row,
                            lastRecord: last,
                            // lastRecord: this.lastID,
                        });
                    });
                }
            );

            console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
    );
});

// Add New Membership
ipcMain.on(channels.ADD_NEW_MEMBER, (event, args) => {
    console.log('Add New Member', args);
    const {
        record_id,
        account,
        firstName,
        lastName,
        fullname,
        memberSince,
        phone,
        gallonLeft,
        buyGallon,
        lastRenewGallon,
        overGallon,
        renew,
        renewFee,
        prevGallon,
        invoiceDate,
        invoiceTime,
        areaCode,
        threeDigit,
        fourDigit,
    } = args;

    db.run(
        sql.add,
        [
            record_id,
            account,
            firstName,
            lastName,
            fullname,
            memberSince,
            phone,
            prevGallon,
            buyGallon,
            gallonLeft,
            overGallon,
            renew,
            renewFee,
            lastRenewGallon,
            invoiceDate,
            invoiceTime,
            areaCode,
            threeDigit,
            fourDigit,
        ],
        function (err) {
            if (err) return console.log(err.message);
            const last = this.lastID;

            db.get(
                `SELECT * FROM mckee WHERE rowid = ${this.lastID}`,
                (err, row) => {
                    if (err) return console.log(err.message);
                    console.log(row);
                    const renewFee = `Membership Fee: $${row.field9}`;
                    const fullname = `${row.field4} -- ${row.field7}`;
                    const account = `[Account #: ${row.field22}]`;
                    const prevGallon = `Gallon Total: ${row.field31}`;
                    const invoice = `Invoice #: ${row.field20}-${this.lastID}`;
                    const blank = '';

                    device.open(function (error) {
                        printer
                            .font('a')
                            .align('lt')
                            .text('Thank You')
                            .text('Mckee Pure Water')
                            .text('2349 McKee Rd')
                            .text('San Jose, CA 95116')
                            .text('(408) 729-1319')
                            .text(blank)
                            .text(fullname)
                            .text(account)
                            .text(renewFee)
                            .text(prevGallon)
                            .text(row.field15 + ' ' + row.field32)
                            .text(blank)
                            .text(invoice)
                            .text(blank)
                            .cut()
                            .close();
                        event.sender.send(channels.ADD_NEW_MEMBER, {
                            ...row,
                            // lastRecord: this.lastID,
                            lastRecord: last,
                        });
                    });
                }
            );
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
    );
});

// RENEW
ipcMain.on(channels.RENEW_WATER, (event, args) => {
    console.log('renew', args);
    const {
        record_id,
        account,
        firstName,
        lastName,
        fullname,
        memberSince,
        phone,
        prevGallon,
        buyGallon,
        gallonLeft,
        overGallon,
        renew,
        renewFee,
        lastRenewGallon,
        invoiceDate,
        invoiceTime,
        areaCode,
        threeDigit,
        fourDigit,
    } = args;
    //     const sql = `INSERT INTO mckee (
    // 	record_id,
    // 	account,
    // 	firstName,
    // 	lastName,
    // 	fullname,
    // 	memberSince,
    // 	phone,
    // 	gallonCurrent,
    // 	gallonBuy,
    // 	gallonRemain,
    // 	overGallon,
    // 	renew,
    // 	renewFee,
    // 	lastRenewGallon,
    // 	invoiceDate,
    // 	invoiceTime,
    // 	areaCode,
    // 	field6,
    // 	field7
    // ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(
        sql.renew,
        [
            record_id,
            account,
            firstName,
            lastName,
            fullname,
            memberSince,
            phone,
            prevGallon,
            buyGallon,
            gallonLeft,
            overGallon,
            renew,
            renewFee,
            lastRenewGallon,
            invoiceDate,
            invoiceTime,
            areaCode,
            threeDigit,
            fourDigit,
        ],
        function (err) {
            if (err) {
                return console.log(err.message);
            }

            const last = this.lastID;

            db.get(
                `SELECT * FROM mckee WHERE rowid = ${this.lastID}`,
                (err, row) => {
                    console.log(row);
                    // const renewGallon = `Renew Gallon: ${row.renew}`;
                    const renewGallon = `Renew Gallon: ${row.field28}`;
                    const overLimit = `Gallon Over: ${args.preOver}`;
                    // const renewFee = `Renew Fee: $${row.renewFee}`;
                    const renewFee = `Renew Fee: $${row.field9}`;
                    // const fullname = `${row.fullname} -- ${row.field7}`;
                    const fullname = `${row.field4} -- ${row.field7}`;
                    // const account = `[Account #: ${row.account}]`;
                    const account = `[Account #: ${row.field22}]`;
                    // const prevGallon = `Gallon Total: ${row.gallonCurrent}`;
                    const prevGallon = `Gallon Total: ${row.field31}`;
                    // const gallonBuy = `Gallon Buy:  ${row.gallonBuy}`;
                    // const invoice = `Invoice #: ${row.record_id}-${this.lastID}`;
                    const invoice = `Invoice #: ${row.field20}-${this.lastID}`;
                    const blank = '';
                    // const renew2 =
                    //     row.overGallon < 0
                    //         ? `=> [Please Renew Membership!!!]`
                    //         : '';
                    // const gallonOver = `Gallon Over: ${row.overGallon} ${renew2}`;
                    // const gallonLeft = `Gallon Left: ${row.gallonRemain}${renew2}`;
                    if (args.preOver < 0) {
                        device.open(function (error) {
                            printer
                                .font('a')
                                .align('lt')
                                .text('Thank You')
                                .text('Mckee Pure Water')
                                .text('2349 McKee Rd')
                                .text('San Jose, CA 95116')
                                .text('(408) 729-1319')
                                .text(blank)
                                .text(fullname)
                                .text(account)
                                .text(renewFee)
                                .text(renewGallon)
                                .text(args.preOver < 0 ? overLimit : '')
                                .text(prevGallon)
                                // .text(gallonLeft)
                                // .text(args.preOver)
                                // .text(row.invoiceDate + '@' + row.invoiceTime)
                                .text(row.field15 + '@' + row.field32)
                                .text(blank)
                                .text(invoice)
                                .text(blank)
                                .cut()
                                .close();
                            event.sender.send(channels.RENEW_WATER, {
                                ...row,
                                lastRecord: last,
                            });
                        });
                    } else {
                        device.open(function (error) {
                            printer
                                .font('a')
                                .align('lt')
                                .text('Thank You')
                                .text('Mckee Pure Water')
                                .text('2349 McKee Rd')
                                .text('San Jose, CA 95116')
                                .text('(408) 729-1319')
                                .text(blank)
                                .text(fullname)
                                .text(account)
                                .text(renewFee)
                                .text(renewGallon)
                                .text(prevGallon)
                                // .text(row.invoiceDate + '@' + row.invoiceTime)
                                .text(row.field15 + '@' + row.field32)
                                .text(blank)
                                .text(invoice)
                                .text(blank)
                                .cut()
                                .close();
                            event.sender.send(channels.RENEW_WATER, {
                                ...row,
                                lastRecord: last,
                            });
                        });
                    }
                }
            );

            console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
    );
});

// Print Receipt
ipcMain.on(channels.PRINT_RECEIPT, (event, args) => {
    const { receipt } = args;
    console.log('print receipt', receipt);

    const fullname = `${
        receipt.detail.fullname
    } -- ${receipt.detail.phone.slice(4, 8)} `;
    const account = `[Account #: ${receipt.account}]`;
    const prevGallon = `Gallon Prev: ${receipt.prevGallon}`;
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
    const record_id = `Invoice #: ${parseInt(receipt.record_id) + 1}-${
        parseInt(receipt.barcode) + 1
    }`;
    const blank = ` `;
    device.open(function (error) {
        printer
            .font('a')
            .align('lt')
            .text(fullname)
            .text(account)
            .text(prevGallon)
            .text(buyGallon)
            .text(remainGallon)
            .text(gallonOver)
            .text(timestamp)
            .text('Thank You')
            .text('Mckee Pure Water')
            .text(record_id)
            .text(blank)
            .text(blank)
            .cut()
            .close();
        event.sender.send(channels.PRINT_RECEIPT, { done: true });
    });
});

// GET CURRENT GALLON FOR MEMBER
// WEE NEED TO TAKE IN ACCOUNT
ipcMain.on(channels.GET_CURRENT_GALLON, (event, args) => {
    console.log('current gallon', args);
    //     const sql = `SELECT account, firstName, lastName, fullname,  areaCode, phone, memberSince, gallonCurrent, gallonBuy, afterBuyGallonTotal, gallonRemain, overGallon, lastRenewGallon, renewFee, renewGallon, record_id, invoiceDate, invoiceTime FROM mckee WHERE account = '${args}' ORDER BY record_id DESC LIMIT 1;
    // `;

    db.get(sql.currentGallon, (err, row) => {
        event.sender.send(channels.GET_CURRENT_GALLON, row);
    });
});

// UPDATE MEMBERSHIP INFO
ipcMain.on(channels.UPDATE_MEMBER, (event, args) => {
    console.log(`Account update:`, { args });
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

    // console.log(data);
    // const sql = `UPDATE
    //                 mckee
    //             SET
    //                 areaCode = ?,
    //                 phone = ?,
    //                 firstName = ?,
    //                 lastName  = ?,
    //                 fullname = ?,
    //                 field6 = ?,
    //                 field7 = ?
    //             WHERE account = ?`;

    // console.log({ sql });

    db.run(sql.update, data, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
        event.sender.send(channels.UPDATE_MEMBER, args);
    });
    // event.sender.send(channels.UPDATE_MEMBER, args);
});

// GET TOTAL RENEW FEE
ipcMain.on(channels.GET_TOTAL_FEE, (event, request) => {
    // const sql = `SELECT SUM(renewFee) totalRenewalFee
    //                 FROM
    //                     (SELECT * FROM mckee WHERE account = ?)
    //             WHERE gallonBuy IS NULL OR gallonBuy = 0 OR renew IS NULL`;
    const { account } = request;
    console.log(`getTotalRenewFee from `, { account });

    db.get(sql.totalRenewFee, account, (err, row) => {
        // db.get(sql, account, (err, row) => {
        if (err) {
            return console.log(err.message);
        }
        const { totalRenewalFee } = row;
        console.log(row);
        event.sender.send(channels.GET_TOTAL_FEE, { totalRenewalFee });
    });
});

// GET TOTAL RENEW GALLON
ipcMain.on(channels.GET_TOTAL_RENEW_GALLON, (event, request) => {
    // const sql = `SELECT SUM(lastRenewGallon) totalRenewalGallon FROM
    //                 (SELECT * FROM mckee WHERE account = ?)
    //             WHERE gallonBuy IS NULL OR gallonBuy = 0 OR renew IS NULL`;

    //     const sql = `SELECT SUM(renewGallon) totalRenewalGallon
    //     FROM(SELECT * FROM mckee WHERE account = ?)WHERE renew IS NULL
    // `;

    const { account } = request;
    console.log(`getTotalRenewalGallon`, { account });
    // db.get(sql, account, (err, row) => {
    db.get(sql.totalRenewGallon, account, (err, row) => {
        if (err) {
            ipcMain.removeAllListeners(channels.GET_TOTAL_RENEW_GALLON);
            return console.log(err.message);
        }

        // db.get(
        //     `SELECT gallonRemain FROM mckee WHERE account = ? LIMIT 1 `,
        //     account,
        //     (err, row) => {
        //         const
        //     }
        // );
        const { totalRenewalGallon } = row;

        console.log(row);
        event.sender.send(channels.GET_TOTAL_RENEW_GALLON, {
            totalRenewalGallon,
        });
    });
});

// GET TOTAL BUY GALLON
ipcMain.on(channels.GET_TOTAL_BUY_GALLON, (event, request) => {
    // const sql = `SELECT SUM(gallonBuy) totalBuyGallon FROM
    //             (SELECT * FROM mckee WHERE account= ?)
    //             WHERE gallonBuy IS NOT NULL AND gallonBuy != 0 AND renew IS NOT NULL`;
    const { account } = request;
    console.log(`getTotalBuyGallon`, { account });
    // db.get(sql, account, (err, row) => {
    db.get(sql.totalBuyGallon, account, (err, row) => {
        if (err) {
            ipcMain.removeAllListeners(channels.GET_TOTAL_BUY_GALLON);
            return console.log(err.message);
        }
        const { totalBuyGallon } = row;
        console.log(row);
        event.sender.send(channels.GET_TOTAL_BUY_GALLON, {
            totalBuyGallon,
        });
    });
});
