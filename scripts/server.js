//Create app using express.js
const port = process.env.PORT || 3000;
const express = require("express");
const body_parser = require("body-parser");
const path = require("path");
const https = require("https");
const app = express();
const server = https.createServer(app);
const dir = path.join(__dirname, "../");
const uri = "theoffice";
const encode = encodeURI(uri);

const api_key = "96b4c29a230ca6080bb875ea7f415745";
//Example request: https://api.themoviedb.org/3/movie/550?api_key=96b4c29a230ca6080bb875ea7f415745


app.use(express.static(dir));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.listen(port, () => console.log("TV Picker started on port " + port));

app.post("/server", function(req, res) {
    const id = req.body.id;
    const show_options = {
        "method": "GET",
        "hostname": "api.themoviedb.org",
        "port": null,
        "path": "/3/tv/" + id + "?api_key=" + api_key,
        "headers": {}
      };

    https.get(show_options, (cb) => {
    const { statusCode } = cb;
    const contentType = cb.headers['content-type'];

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
        cb.resume();
        return;
    }

    cb.setEncoding('utf8');
    let rawData = '';
    cb.on('data', (chunk) => { rawData += chunk; });
    cb.on('end', () => {
        try {
        const parsedData = JSON.parse(rawData);
        console.log('data', parsedData.seasons.length);
        const season_num = parsedData.seasons.length;
        // res.send(parsedData);
            //Get season data
            const rand_season = Math.floor(Math.random() * (season_num - 1 + 1)) + 1;
            const season_options = {
                "method": "GET",
                "hostname": "api.themoviedb.org",
                "port": null,
                "path": "/3/tv/" + id + "/season/" + rand_season + "?api_key=" + api_key,
                "headers": {}
              };
        
            https.get(season_options, (cb) => {
            const { statusCode } = cb;
            const contentType = cb.headers['content-type'];
        
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
                cb.resume();
                return;
            }
        
            cb.setEncoding('utf8');
            let rawData = '';
            cb.on('data', (chunk) => { rawData += chunk; });
            cb.on('end', () => {
                try {
                const parsedData = JSON.parse(rawData);
                    //Get episode data
                    const episode_num = parsedData.episodes.length;
                    const rand_episode = Math.floor(Math.random() * (episode_num - 1 + 1)) + 1;
                    const episode_options = {
                        "method": "GET",
                        "hostname": "api.themoviedb.org",
                        "port": null,
                        "path": "/3/tv/" + id + "/season/" + rand_season + "/episode/" + rand_episode + "?api_key=" + api_key,
                        "headers": {}
                      };
                
                    https.get(episode_options, (cb) => {
                    const { statusCode } = cb;
                    const contentType = cb.headers['content-type'];
                
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
                        cb.resume();
                        return;
                    }
                
                    cb.setEncoding('utf8');
                    let rawData = '';
                    cb.on('data', (chunk) => { rawData += chunk; });
                    cb.on('end', () => {
                        try {
                        const parsedData = JSON.parse(rawData);
                        res.send(parsedData);
                            //Get episode data
                            
                
                        } catch (e) {
                        console.error(e.message);
                        }
                    });
                    }).on('error', (e) => {
                    console.error(`Got error: ${e.message}`);
                    });
        
                } catch (e) {
                console.error(e.message);
                }
            });
            }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
            });

        } catch (e) {
        console.error(e.message);
        }
    });
    }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
    });
});