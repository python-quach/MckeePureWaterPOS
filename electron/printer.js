const printReceipts = {
    newMembership: function (device, printer, args, row, callback) {
        const data = {
            renewFee: `Membership Fee: $${row.field9}`,
            fullname: `${row.field4} -- ${args.fourDigit}`,
            gallonLeft: `Gallon Total  : ${args.renew}`,
            blank: '',
            last: this.lastID,
            newMembership: row.field22,
            time: `${row.field15}  ${row.field32}`,
        };

        const account = `[Account#: ${row.field22}]`;
        const message = `Thank You                  ${account}`;

        device.open(function (error) {
            if (error) {
                return console.log(error.message);
            }

            printer
                .font('a')
                .align('lt')
                .text(data.blank)
                .text(data.fullname)
                // .text(`NEW MEMBERSHIP: ${data.newMembership}`)
                .text(`NEW MEMBERSHIP`)
                .text(data.renewFee)
                .text(data.gallonLeft)
                .text(data.time)
                .text(data.blank)
                // .text('Thank You')
                .text(message)
                .text('Mckee Pure Water')
                .text('(408) 729-1319')
                .text(data.blank)
                .cut()
                .close();
            callback();
        });
    },
    renewReceipt: function (device, printer, args, row, callback) {
        const renewGallon = `Gallon Renew: ${row.field28}`;
        const overLimit = `Gallon Prev : ${args.preOver}`;
        const renewFee = `Renew Fee   : $${row.field9}`;
        const fullname = `${row.field4} -- ${row.field7}`;
        const account = `[Account#: ${row.field22}]`;
        const totalGallon = `Gallon Left : ${row.field31}`;
        // const message = `Thank You             ${account}`;
        const message = `Thank You                  ${account}`;

        const blank = '';
        if (args.preOver < 0) {
            device.open(function (error) {
                if (error) return console.log(error.message);
                printer
                    .font('a')
                    .align('lt')
                    .text(blank)
                    .text(fullname.trim())
                    // .text(account)
                    .text(renewFee)
                    .text(args.preOver < 0 ? overLimit : '')
                    .text(renewGallon)
                    .text(totalGallon)
                    .text(row.field15 + ' ' + row.field32)
                    .text(blank)
                    // .text('Thank You')
                    .text(message)
                    .text('Mckee Pure Water')
                    .text('(408) 729-1319')
                    .text(blank)
                    .cut()
                    .close();
                callback();
            });
        } else {
            device.open(function (error) {
                if (error) return console.log(error.message);
                printer
                    .font('a')
                    .align('lt')
                    .text(blank)
                    .text(fullname.trim())
                    // .text(account)
                    .text(renewFee)
                    .text(`Gallon Prev : ${args.preOver}`)
                    .text(renewGallon)
                    .text(totalGallon)
                    .text(row.field15 + ' ' + row.field32)
                    .text(blank)
                    // .text('Thank You')
                    .text(message)
                    .text('Mckee Pure Water')
                    .text('(408) 729-1319')
                    .text(blank)
                    .cut()
                    .close();
                callback();
            });
        }
    },
};

exports.receiptPrinter = printReceipts;
