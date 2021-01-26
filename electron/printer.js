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
        const message = `Thank You                ${account}`;

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
        const message = `Thank You                ${account}`;
        const blank = '';
        if (args.preOver < 0) {
            device.open(function (error) {
                if (error) return console.log(error.message);
                printer
                    .font('a')
                    .align('lt')
                    .text(blank)
                    .text(fullname.trim())
                    .text(renewFee)
                    .text(args.preOver < 0 ? overLimit : '')
                    .text(renewGallon)
                    .text(totalGallon)
                    .text(row.field15 + ' ' + row.field32)
                    .text(blank)
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
                    .text(renewFee)
                    .text(`Gallon Prev : ${args.preOver}`)
                    .text(renewGallon)
                    .text(totalGallon)
                    .text(row.field15 + ' ' + row.field32)
                    .text(blank)
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
    buyReceipt: function (device, printer, args, row, callback) {
        const fullname = `${row.field4} -- ${row.field7}`;
        const prevGallon = `Gallon Prev: ${row.field31}`;
        const gallonBuy = `Gallon Buy : ${row.field19}`;
        const blank = '';
        const gallonLeft = `Gallon Left: ${row.field12}`;
        const account = `[Account#: ${row.field22}]`;
        const message = `Thank You                ${account}`;

        if (device) {
            device.open(function (error) {
                if (error) return console.log(error.message);
                printer
                    .font('a')
                    .align('lt')
                    .text(fullname.trim())
                    .text(prevGallon)
                    .text(gallonBuy)
                    .text(gallonLeft)
                    .text(row.field15 + ' ' + row.field32)
                    .text(blank)
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
    dailyReport: function (
        device,
        printer,
        totalFee,
        totalRenewAmount,
        // row,
        totalBuy,
        date,
        time,
        callback
    ) {
        // const { totalBuy } = row;
        const totalRenewFee = `Total Fee  : $${totalFee || 0}`;
        const totalRenew = `Total Renew: ${totalRenewAmount || 0}`;
        const totalBuyAmount = `Total Buy  : ${totalBuy || 0}`;
        // console.log('143', device);
        // if (device) {
        device.open(function (error) {
            if (error) return console.log(error.message);
            printer
                .font('a')
                .align('lt')
                .text('Mckee Pure Water')
                .text(`Daily Report`)
                .text(`${date} - ${time}`)
                .text(totalRenewFee)
                .text(totalRenew)
                .text(totalBuyAmount)
                .text('')
                .text('')
                .cut()
                .close();
            callback();
            // event.sender.send(channels.REPORT, {
            //     totalFee,
            //     totalRenewAmount,
            //     totalBuy,
            // });
        });
        // }
    },
};

exports.receiptPrinter = printReceipts;
