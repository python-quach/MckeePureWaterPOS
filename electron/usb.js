const usbDetect = require('usb-detection');
const escpos = require('escpos');
escpos.USB = require('escpos-usb');

const detectUSB = () => {
    let device;
    let printer;
    const options = { encoding: 'GB18030' /* default */ };
    usbDetect
        .find()
        .then(function (devices) {
            console.log(devices);
            devices.forEach(function (item) {
                if (item.deviceName === 'USB Printing Support') {
                    device = new escpos.USB();
                    printer = new escpos.Printer(device, options);
                    return {
                        device,
                        printer,
                    };
                }
            });
        })
        .catch(function (err) {
            console.log(err);
            device = null;
            printer = null;
            return {
                device,
                printer,
            };
        });
};

exports.detectUSB = detectUSB;
