const { sql } = require('./query');

module.exports = {
    createNewMembership: function (db, args, callback) {
        console.log('Add New Membership', { account: args.account });
        db.run(sql.add, sql.addData(args), function (err) {
            if (err) return console.log(err.message);
            db.get(sql.findLastRecord, this.lastID, (err, row) => {
                if (err) return console.log(err.message);
                console.log(
                    `A row has been inserted with rowid ${this.lastID}`
                );
                callback(row, this.lastID);
            });
        });
    },
    buyWaterGallon: function (db, args, callback) {
        console.log('Buy Water', { account: args.account });
        db.run(sql.buy, sql.buyData(args), function (err) {
            if (err) return console.log(err.message);
            db.get(sql.findLastRecord, this.lastID, (err, row) => {
                if (err) return console.log(err.message);
                console.log(
                    `A row has been inserted with rowid ${this.lastID}`
                );
                callback(row, this.lastID);
            });
        });
    },

    renewMembership: function (db, args, callback) {
        console.log('Renew Membership', { account: args.account });
        db.run(sql.renew, sql.addRenew(args), function (err) {
            if (err) return console.log(err.message);
            db.get(sql.findLastRecord, this.lastID, (err, row) => {
                if (err) return console.log(err.message);
                console.log(
                    `A row has been inserted with rowid ${this.lastID}`
                );
                callback(row, this.lastID);
            });
        });
    },
    getDailyReport: function (db, date, callback) {
        console.log('daily report', { date });
        db.get(sql.reportRenew, date, (err, row) => {
            if (err) return console.log(err.message);
            const { totalFee, totalRenewAmount } = row;
            db.get(sql.reportBuy, date, (err, row) => {
                if (err) return console.log(err.message);
                const { totalBuy } = row;
                callback(totalFee, totalRenewAmount, totalBuy);
            });
        });
    },
    updateMembershipInfo: function () {},
};
