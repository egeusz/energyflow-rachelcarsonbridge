//Libraries
var http = require('http');
//Lets define a port we want to listen to
const PORT = 80;


//Modules
var configs = require('./configs').configs;
var teensyport = require('./teensyport');
var loop = require('./loop');
var animControl = require('./animation/animationcontrol.js');


///---------------------------------------------------
//Globals for display

var teensyerror = null;
var socketerror = "Could not connect to Conductor at " + configs.conductor_url + ":" + configs.conductor_port;

var myip = "[unknown]";
var myhostname = "[unknown]";

//weatherdata
var weatherdata = {};

//config setup
//---------------------------------------------------
var myconfig = null;

var config_error;

var frame_rate = configs.frame_rate; //fps

//After configs are parsed the lengths will
//look like this:
// var lengths = {
//     strip1: 554,
//     circle: 54,
//     strip2: 60,
//     tstrip1: 60,
// }
var lengths;


function getConfig(_myip) {
    for (i in configs.list) {
        var config = configs.list[i];
        for (i in config.ips) {
            if (config.ips[i] == _myip) {
                //yay found my config
                myconfig = config;
                return parseConfig(myconfig);
            }
        }
    }
    if (!myconfig) {
        config_error = "Could not locate Config for IP :" + _myip;
    }
}

function parseConfig(_config) {
    //for output logging
    var str_1 = "none";
    var str_2 = "none";
    var str_c = "none";
    var str_co = "none";
    var tstr_1 = "none";
    var tstr_2 = "none";

    lengths = {
        maxrun: configs.max_run_length,
    };

    if (_config.strip1) {
        if (_config.strip1.length) {
            lengths.strip1 = _config.strip1.length;
            str_1 = lengths.strip1;
        }
        if (_config.strip1.circle_length) {
            lengths.circle = _config.strip1.circle_length;
            str_c = lengths.circle;
        }
        if (_config.strip1.circle_offset) {
            lengths.circle_offset = _config.strip1.circle_offset;
            str_co = lengths.circle_offset;
        }
    }
    if (_config.strip2) {
        if (_config.strip2.length) {
            lengths.strip2 = _config.strip2.length;
            str_2 = lengths.strip2;
        }
    }
    if (_config.tstrip1) {
        if (_config.tstrip1.length) {
            lengths.tstrip1 = _config.tstrip1.length;
            tstr_1 = lengths.tstrip1;
        }
    }
    if (_config.tstrip2) {
        if (_config.tstrip2.length) {
            lengths.tstrip2 = _config.tstrip2.length;
            tstr_2 = lengths.tstrip2;
        }
    }

    console.log("--Config--");
    console.log("       maxrun:", lengths.maxrun);
    console.log("       strip1:", str_1);
    console.log("       circle:", str_c);
    console.log("circle offset:", str_co);
    console.log("       strip2:", str_2);
    console.log("      tstrip1:", tstr_1);
    console.log("      tstrip2:", tstr_2);
}

///---------------------------------------------------
//set up sockets
var io = require('socket.io/node_modules/socket.io-client');

//Connecto to the Conductor
var socket = io.connect('http://' + configs.conductor_url + ":" + configs.conductor_port + "/anim", {
    reconnect: true
});
socket.on('connect', function() {
    console.log('Connected to Conductor at : ' + configs.conductor_url + ":" + configs.conductor_port);
    socketerror = null; //remove error
});
socket.on('disconnect', function() {
    console.log('Conductor Disconnected');
    socketerror = "Conductor Dosconnected";
});
//on connect the server will pass back this animator's ip and hostname
socket.on('info', function(data) {
    //console.log("got info", data);
    myip = data.ip;
    myhostname = data.name;
    getConfig(myip);
    if (teensyport.isOpen) {
        socket.emit("ready");
    }

});
//get new animation commands from conductor
socket.on('animate', function(data) {
    animControl.onNewAnimation(data);
});
//clear all running animations
socket.on('clear', function(data) {
    animControl.onClear();
});

socket.on('weather', function(data) {
    weatherdata = data;
    console.log("New Weather Data :", data);
});

//handle http
//---------------------------------------------------

//handle requests and send response
function handleRequest(request, response) {
    var res = "<p>Animator Active</p>";
    res += "<p>version : " + configs.build_version + " </p>";

    if (teensyerror) {
        res += '<p style="color:red;">teensy error : ' + teensyerror + ' </p>';
    }
    if (socketerror) {
        res += '<p style="color:red;">scocket error : ' + socketerror + ' </p>';
    }

    res += "<p>       ip : " + myip + " </p>";
    res += "<p> hostname : " + myhostname + " </p>";

    if (config_error) {
        res += '<p style="color:red;">config error : ' + config_error + ' </p>';
    }

    if (lengths) {
        //--Strip 1
        if (lengths.strip1) {
            res += "<p> strip1 : " + lengths.strip1 + " </p>";
        }
        //--Circle
        if (lengths.circle) {
            res += "<p> circle : " + lengths.circle + " </p>";
        }
        //--Strip 2
        if (lengths.strip2) {
            res += "<p> strip2 : " + lengths.strip2 + " </p>";
        }
        //--Strip 3
        if (lengths.tstrip1) {
            res += "<p> tstrip1 : " + lengths.tstrip1 + " </p>";
        }
    }

    res += "<p> Current Weather</p>";
    var weather = "<table>";

    for (var w in weatherdata) {
        weather += "<tr><td>" + w + "</td><td>" + weatherdata[w] + "</td></tr>";
    }
    weather += "</table>";

    res += weather;

    //response.end('It Works!! Path Hit: ' + request.url);
    response.end(res);
}
var server = http.createServer(handleRequest);


//---------------------------------------------------
//Called if the Teensy is sucessfully connected to
function initAnimation() {
    if (lengths) { //configs have been parsed
        //initiate animation Controller with the lengths. 
        animControl.init(lengths);
        loop.setUpdate(update);
        loop.startLoop(frame_rate);
        socket.emit("ready");
    } else {
        waitForConfigs();
    }
}

function waitForConfigs() {
    //lets wait a sec to see if the conductor connects
    setTimeout(function() {
        if (lengths) { //configs have been parsed
            //initiate animation Controller with the lengths. 
            animControl.init(lengths);

            loop.setUpdate(update);
            loop.startLoop(frame_rate);
            socket.emit("ready");
        } else {
            waitForConfigs();
        }
    }, 1000);
}

//main update!
function update(_timedelta, _onDone) {
    animControl.update(_timedelta, weatherdata, function() {
        teensyport.writeColors(animControl.getHexBuffer(), function() {
            _onDone();
        });
    });
}

///---------------------------------------------------
//first set up the port to the teensy


teensyport.initPort(function(err) {
    if (err) {
        if (teensyerror != err) {
            teensyerror = err;
            console.log(teensyerror);
        }
    } else {
        //done setting up the port
        initAnimation();
    }
});




//start server
server.listen(PORT, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Animator Listening on: http://localhost:%s", PORT);
});