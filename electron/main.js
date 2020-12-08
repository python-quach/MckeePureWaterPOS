const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
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

// GET CURRENT GALLON FOR MEMBER
ipcMain.on(channels.GET_CURRENT_GALLON, (event, args) => {
    console.log('current gallon', args);
    const sql = `SELECT account, firstName, lastName, fullname,  areaCode, phone, memberSince, gallonCurrent, gallonBuy, gallonRemain, overGallon, lastRenewGallon, renewFee, renewGallon, record_id, invoiceDate, invoiceTime FROM mckee WHERE account = '${args}' ORDER BY record_id DESC LIMIT 1;
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
                    OR account = ?
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
