//Libraries
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Modules
var animators = require('./animators.js');
var choreographer = require('./choreographer.js');

var config = require('./config.js');


////---------------------------------------------------

const PORT = 80;

////---------------------------------------------------

var weatherdata = require('./weatherdata.js');
weatherdata.init(config.weather_url_host, config.weather_url_path);

////---------------------------------------------------
//Wite main page

//handle requests and send response
// var handleRequest = function(request, response) {
//         var res = "<p>Conductor</p>";
//         var weather = "<table>";
//         var wdata = weatherdata.getLatestData();
//         for (var w in wdata) {
//             weather += "<tr><td>" + w + "</td><td>" + wdata[w] + "</td></tr>";
//         }
//         weather += "</table>";
//         //res += "<p>version : " + configs.build_version + " </p>";
//         //response.end('It Works!! Path Hit: ' + request.url);
//         res += weather;
//         console.log(weatherdata.data);
//         response.end(res);
//     }
//     //create http server
// var server = http.createServer(handleRequest);

////---------------------------------------------------
//socket for the html interface

var io_int = io.of('/int');
io_int.on('connection', function(socket) {
    var clientIpV6 = socket.request.connection.remoteAddress;
    //::ffff:10.35.16.112
    var clientIp = clientIpV6.split(":")[3];

    console.log('--- http', clientIp);

    //listen for disconnect event and remove it from the connected animators
    socket.on('disconnect', function() {

        console.log("< > http", clientIp);
    });

    socket.on('get_modes', function(data, _callback) {
        var res = {
            modes: choreographer.getModes(),
            mode: choreographer.getCurrentMode(),
        }
        _callback(res);
    });

    socket.on('set_mode', function(data, _callback) {
        if (data) {
            if (data.mode) {
                choreographer.setMode(data.mode);
                var res = {
                    mode: choreographer.getCurrentMode(),
                }
                _callback(res);
            }
        }
    });

    socket.on('play_animation', function(data, _callback) {
        if (data) {
            if (data.who && data.name && data.strips) {
                //**SUPER INSECURE**
                //must do a better job at scrubbing info 
                var who = data.who.trim().toUpperCase();
                var name = data.name.trim().toUpperCase();
                var strips = [];
                for (var i = 0; i < data.strips.length; i++) {
                    strips.push(data.strips[i].trim().toUpperCase());
                }
                choreographer.playAnimation(who, name, strips);
                _callback(true);
            }
        }
    });

});
//io_int.emit('hi', 'everyone!');





////---------------------------------------------------


animators.init(io, choreographer);

weatherdata.onDataUpdate(function(data) {
    //on new data 
    animators.writeToAnimators('ALL', 'weather', data);
});

app.use(express.static(__dirname + '/public'));






////---------------------------------------------------

//start server
http.listen(PORT, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Conductor Listening on: http://localhost:%s", PORT);
    choreographer.init(config, animators);
});