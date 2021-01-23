const { sql } = require('./query');

module.exports = {
    createNewMembership: function (db, args, callback) {
        console.log('Add New Membership', { account: args.account });
        db.run(sql.add, sql.addData(args), function (err) {
            if (err) return console.log(err.message);

            db.get(sql.findNewAdd, this.lastID, (err, row) => {
                if (err) return console.log(err.message);
                console.log(
                    `A row has been inserted with rowid ${this.lastID}`
                );
                callback(row, this.lastID);
            });
        });
    },
    buy: function () {},
    renewMembership: function (db, args, callback) {
        console.log('Renew Membership', { account: args.account });
        db.run(sql.renew, sql.addRenew(args), function (err) {
            if (err) return console.log(err.message);
            // const last = this.lastID;
            db.get(sql.findNewRenew, this.lastID, (err, row) => {
                if (err) return console.log(err.message);
                console.log(
                    `A row has been inserted with rowid ${this.lastID}`
                );
                callback(row, this.lastID);
            });
        });
    },
    updateMembershipInfo: function () {},
};
