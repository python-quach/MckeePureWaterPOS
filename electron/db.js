const { sql } = require('./query');

module.exports = {
    createNewMembership: function (db, args, callback) {
        console.log('Add New Membership', { account: args.account });
        db.run(sql.add, sql.addData(args), function (err) {
            if (err) return console.log(err.message);
            db.get(
                `SELECT * FROM mckee WHERE rowid = ${this.lastID}`,
                (err, row) => {
                    if (err) return console.log(err.message);
                    console.log(
                        `A row has been inserted with rowid ${this.lastID}`
                    );
                    callback(row, this.lastID);
                }
            );
        });
    },
};
