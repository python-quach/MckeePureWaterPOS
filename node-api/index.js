const express = require('express'),
    multer = require('multer'),
    bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs'),
    http = require('http'),
    miniDumpsPath = path.join(__dirname, 'app-crashes');

const app = express(),
    server = http.createServer(app);

let upload = multer({
    dest: miniDumpsPath,
}).single('upload_file_minidump');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// app.use(multer);

app.get('/api/app-crash', (req, res) => {
    console.log(req);
    res.send('Hello');
});

app.post('/api/app-crashes', upload, (req, res) => {
    console.log(req.body);
    req.body.filename = req.file.filename;
    const crashData = JSON.stringify(req.body);
    fs.writeFile(req.file.path + '.json', crashData, (e) => {
        if (e) {
            return console.error('Cant write: ' + e.message);
        }
        console.info('crash written to file:\n\t' + crashData);
    });
    res.end();
});

server.listen(3010, () => {
    console.log('running on port 3010');
});
