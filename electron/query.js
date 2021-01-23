const sql = {
    login: `SELECT * from users WHERE username = ? AND password = ?`,
    update: `UPDATE 
                    mckee 
                SET 
                    field5 = ?,
                    field8 = ?,
                    field1 = ?,
                    field2 = ?,
                    field4 = ?,
                    field6 = ?,
                    field7 = ? 
                WHERE field22 = ?`,
    find: `SELECT * FROM
            ( SELECT DISTINCT
    		    field22 account,
    		    field1 firstName,
    		    field2 lastName,
    		    field4 fullname,
    		    field8 phone
            FROM mckee
                WHERE
    		        phone = ?
    		        OR account =  ?
    		        OR fullname like ?
    		        ORDER BY
    		    fullname
            ) 
        WHERE 
            account IS NOT NULL 
			AND phone IS NOT NULL`,
    lastAccount: `SELECT DISTINCT field22 account FROM mckee ORDER BY field20  DESC LIMIT 1`,
    lastRecord: `SELECT MAX(rowid) barcode, field20 record_id FROM mckee`,
    accountDetail: `SELECT
						field22 account, 
						field20 record_id, 
						field15 invoiceDate, 
						field32 invoiceTime, 
						field1 firstName, 
						field2 lastName, 
					    field4 fullname,
						field5 areaCode, 
						field6 threeDigit, 
						field7 fourDigit,
						field8 phone,
						field9 fee,
						field10 memberSince, 
						field31 gallonCurrent, 
						field19 gallonBuy, 
						field12 gallonRemain, 
						field12 afterBuyGallonTotal, 
						field12 overGallon, 
						field28 lastRenewGallon, 
						field28 renew, 
						field9 renewFee 
					FROM 
						mckee 
					WHERE field22 = ? ORDER BY field20 DESC LIMIT 1`,
    getInvoices: `SELECT  
					field28 renew,
       				field19 gallonBuy,
        			field12 gallonRemain,
        			field9 renewFee,
        			field12 overGallon,
        			field31 gallonCurrent,
        			field20 record_id,
        			field22 account,
        			field10 memberSince,
        			field5 areaCode,
        			field8 phone,
        			field4 fullname,
        			field15 invoiceDate,
					field32 invoiceTime 
				FROM mckee WHERE field22 = ? ORDER BY field20 DESC LIMIT ? OFFSET ?`,
    totalInvoice: `SELECT COUNT(*) as count FROM mckee WHERE field22 = ?`,
    buy: `INSERT INTO mckee (
			field20,
			field22,
			field1,
			field2,
			field4,
			field10,
			field8,
			field31,
			field19,
			field12,
			field12,
			field28,
			field9,
			field28,
			field15,
			field32,
			field5,
			field6,
			field7
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    add: `INSERT INTO mckee (
		 	field20,
			field22,
			field1,
			field2,
			field4,
			field10,
			field8,
			field31,
			field19,
			field12,
			field12,
			field28,
			field9,
			field28,
			field15,
			field32,
			field5,
			field6,
			field7
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    renew: `INSERT INTO mckee (
				field20,
				field22,
				field1,
				field2,
				field4,
				field10,
				field8,
				field31,
				field19,
				field12,
				field12,
				field28,
				field9,
				field28,
				field15,
				field32,
				field5,
				field6,
				field7
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    currentGallon: `SELECT 
						field22 account, 
						field1 firstName, 
						field2 lastName, 
						field4 fullname,  
						field5 areaCode, 
						field8 phone, 
						field10 memberSince,
						field31 gallonCurrent,
						field19 gallonBuy, 
						field12 afterBuyGallonTotal,
						field12 gallonRemain, 
						field12 overGallon, 
						field28 lastRenewGallon, 
						field9 renewFee, 
						field28 renewGallon, 
						field20 record_id, 
						field15 invoiceDate, 
						field32 invoiceTime 
					FROM 
						mckee 
					WHERE 
						field22 = ? 
					ORDER BY 
						record_id 
					DESC LIMIT 1`,
    totalRenewGallon: `SELECT 
						SUM(field28) totalRenewalGallon 
					FROM
                    	(SELECT * FROM mckee WHERE field22 = ?)
					WHERE 
						field19 IS NULL 
						OR field19 = 0 
						OR field28 IS NULL`,
    totalBuyGallon: `SELECT SUM(field19) totalBuyGallon FROM 
                (SELECT * FROM mckee WHERE field22 = ?) 
				WHERE field19 IS NOT NULL AND field19 != 0 AND field28 IS NOT NULL`,
    totalFee: `SELECT SUM(fees) totalRenewalFee FROM
(SELECT 
	field19 buyGallon,
	field28 renewAmount,
	field31 currentGallon,
	field9 fees
FROM 
	mckee 
WHERE field22 = ?)
WHERE buyGallon = 0 OR buyGallon IS NULL`,
    totalRenew: `SELECT * FROM
(SELECT 
	field19 ,
	field28 ,
	field31,
	field9 
FROM 
	mckee 
WHERE field22 = ?)
WHERE field19 = 0 OR field19 IS NULL`,
    totalBuy: `SELECT SUM(field19) totalBuyGallon FROM
(SELECT 
	field19 ,
	field28 ,
	field31,
	field9 
FROM 
	mckee 
WHERE field22 = ?)`,
    reportRenew: `SELECT SUM(renewAmount) totalRenewAmount, SUM(fee) totalFee FROM 
                          (SELECT ROWID record_id,
	field20 invoice_id,
	field22 account,
	field15 purchaseDate,
	field32 purchaseTime,
	field10 memberSince,
	field1 firstName,
	field2 lastName,
	field4 fullname,
	field5 areaCode,
	field6 threeDigit,
	field7 fourDigit,
	field8 phone,
	field31 currentGallon,
	field19 buyGallon,
	field12 remainGallon,
	field28 renewAmount,
	field9 fee,
	field30 clerk
FROM 
	mckee 
WHERE field15 = ?) 
WHERE buyGallon IS NULL OR buyGallon = '0'`,
    reportBuy: `SELECT SUM(buyGallon) totalBuy FROM 
(SELECT 
	ROWID record_id,
	field20 invoice_id,
	field22 account,
	field15 purchaseDate,
	field32 purchaseTime,
	field10 memberSince,
	field1 firstName,
	field2 lastName,
	field4 fullname,
	field5 areaCode,
	field6 threeDigit,
	field7 fourDigit,
	field8 phone,
	field31 currentGallon,
	field19 buyGallon,
	field12 remainGallon,
	field28 renewAmount,
	field9 fee,
	field30 clerk
FROM 
	mckee 
WHERE field15 = ?) 
WHERE buyGallon IS NOT NULL OR buyGallon = '0'`,
    buyData: (data) => {
        return [
            data.record_id,
            data.account,
            data.firstName,
            data.lastName,
            data.fullname,
            data.memberSince,
            data.phone,
            data.prevGallon,
            data.buyGallon,
            data.gallonLeft,
            data.overGallon,
            data.renew,
            data.renewFee,
            data.lastRenewGallon,
            data.invoiceDate,
            data.invoiceTime,
            data.areaCode,
            data.threeDigit,
            data.fourDigit,
        ];
    },
    addData: (data) => {
        return [
            data.record_id,
            data.account,
            data.firstName,
            data.lastName,
            data.fullname,
            data.memberSince,
            data.phone,
            data.prevGallon,
            data.buyGallon,
            data.gallonLeft,
            data.overGallon,
            data.renew,
            data.renewFee,
            data.lastRenewGallon,
            data.invoiceDate,
            data.invoiceTime,
            data.areaCode,
            data.threeDigit,
            data.fourDigit,
        ];
    },
    addRenew: (data) => {
        return [
            data.record_id,
            data.account,
            data.firstName,
            data.lastName,
            data.fullname,
            data.memberSince,
            data.phone,
            data.prevGallon,
            data.buyGallon,
            data.gallonLeft,
            data.overGallon,
            data.renew,
            data.renewFee,
            data.lastRenewGallon,
            data.invoiceDate,
            data.invoiceTime,
            data.areaCode,
            data.threeDigit,
            data.fourDigit,
        ];
    },

    findNewAdd: `SELECT * FROM mckee WHERE rowid = ?`,
    findNewRenew: `SELECT * FROM mckee WHERE rowid = ?`,
    findNewBuy: `SELECT * FROM mckee WHERE rowid = ?`,
    findLastRecord: `SELECT * FROM mckee WHERE rowid = ?`,
};
exports.sql = sql;
