const express = require("express");
const router = express.Router();

var client = require('redis').createClient();

router.route("/:machinery_name")
    .get((req, res) => {
        client.get('key:test:0', function (err, val) {
            if (err) return console.log(err);
            var data = JSON.parse(val);
            console.log(data);
        });
    })
    .post((req, res) => {

    });