const express = require('express');
const path = require('path');
const app = express();


var server = require('http').Server(app);

const port = process.env.PORT || 8888;

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('./webpack.config.js').default;
    const compiler = webpack(config);

    app.use(webpackHotMiddleware(compiler));
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
    }));
}

const io = require('socket.io').listen(server, { path: '/api' });
const redisClient = require("redis").createClient({ host: "redis" });
io.sockets.on('connection', (socket) => {
    console.log("websocket connected");
    socket.on('toggle', (msg) => {
        console.log(msg);
        const { WebClient } = require('@slack/client');

        const web = new WebClient(process.env.SLACK_TOKEN);
        msg = msg === "reco" ? "recorder" : msg
        web.chat.postMessage({ channel: process.env.HARUNA_DM, text: `send ${msg}:on` })
            .then((res) => {
                console.log('Message sent: ', res);
            })
            .catch(console.error);
    });
    socket.on('changeState', (msg) => {
        let key = msg;
        redisClient.hget('power', key, (err, val) => {
            const HASH_KEY = 'power';
            if (val == null) {
                return;
            }

            let json = JSON.parse(val);
            json.power = !json.power;
            let jsonStr = JSON.stringify(json);

            io.sockets.emit("receiveMessage", jsonStr);
            redisClient.hset(HASH_KEY, key, jsonStr);
        });
    })
});

const mqttClient = require('mqtt').connect({ host: 'siro.nov', port: 1883 });
const HASH_KEY = "power"
mqttClient.on('connect', function () {
    console.log("mqtt connected");
    mqttClient.subscribe('power');
    mqttClient.subscribe('ir');
})
mqttClient.on('message', (topic, msg) => {
    let key = msg.toString("UTF-8");
    console.log(`${topic}:${msg}`)
    switch (topic) {
        case 'power':
            redisClient.hget(HASH_KEY, key, (err, val) => {
                if (val == null) {
                    return;
                }

                let json = JSON.parse(val);
                json.power = !json.power;
                let jsonStr = JSON.stringify(json);

                io.sockets.emit("receiveMessage", jsonStr);
                redisClient.hset(HASH_KEY, key, jsonStr);
            });
            break;
        case 'ir':
            io.sockets.emit("ir", msg.toString('utf-8'));
            break;
    }
});

app.get('/power', (req, res) => {
    var defaultState = {};
    redisClient.hvals("power", (err, vals) => {
        vals.forEach(element => {
            let json = JSON.parse(element);
            defaultState[json.name] = json.power;
        });
        res.json(defaultState);
    });
});

console.log(`Served: http://localhost:${port}`);
server.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});

process.on('SIGINT', () => {
    io.close();
    redisClient.quit();
    mqttClient.close();
    server.close();
    process.exit(0);
});
