//Create app using express.js
const port = process.env.PORT || 3000;
const express = require("express");
const body_parser = require("body-parser");
const path = require("path");
const http = require("http");
const app = express();
const server = http.createServer(app);
const dir = path.join(__dirname, "../");

app.use(express.static(dir));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.listen(port, () => console.log("TV Picker started on port " + port));

app.post("/email", function(req, res) {
    http.get('http://nodejs.org/dist/index.json', (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
        } catch (e) {
        console.error(e.message);
        }
    });
    }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
    });
});