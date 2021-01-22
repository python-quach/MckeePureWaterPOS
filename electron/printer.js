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

        device.open(function (error) {
            if (error) {
                return console.log(error.message);
            }

            printer
                .font('a')
                .align('lt')
                .text(data.blank)
                .text(data.fullname)
                .text(`NEW MEMBERSHIP: ${data.newMembership}`)
                .text(data.renewFee)
                .text(data.gallonLeft)
                .text(data.time)
                .text(data.blank)
                .text('Thank You')
                .text('Mckee Pure Water')
                .text('(408) 729-1319')
                .text(data.blank)
                .cut()
                .close();
            callback();
        });
    },
};

exports.receiptPrinter = printReceipts;
