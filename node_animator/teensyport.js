var SerialPort = require('serialport');


var port;
var isWaitingOnDraw = false;
exports.isOpen = false;
exports.initPort = function(_onDone) {

    function onOpen() {
        console.log("Connected to Teensy at : " + port.path);
        exports.isOpen = true;
    }

    function onClose() {
        //console.log("port Closed");
        exports.isOpen = false;
    }

    //------------
    //In order to prevent the serial port from interuppting the fastLED from writeing output to the LEDs we
    //we have to wait until the teensy has completed writing before we start filling the buffer again. 
    function onData(data) {
        if (data == "x") { //teensy is done pushing the pixels
            //console.log("data", data);
            isWaitingOnDraw = false;
        }
    }

    function onError(error) {
        console.log(error);

    }

    function onDisconnect(error) {
        console.log(error);
        exports.isOpen = false;
        findTeensy();

    }

    function makePort(_name) {
        return new SerialPort(_name, {
            baudRate: 9600,
            parser: SerialPort.parsers.readline("\r\n"),
        });
    }

    function findTeensy() {
        SerialPort.list(function(err, ports) {

            for (i in ports) {
                var _port = ports[i];
                //console.log(_port);

                //On Linux look for manufacturer
                if (_port.manufacturer == 'Teensyduino') {
                    console.log("Found Teensy on: ", _port.comName);
                    port = makePort(_port.comName);
                    break;
                }
                //Windows Port selection
                else if (_port.comName.match(/COM[0-9]/)) {
                    console.log("Found Teensy on: ", _port.comName);
                    port = makePort(_port.comName);
                    break;
                }
            }

            if (port) {
                //link up event handelers
                port.on('open', onOpen);
                port.on('data', onData);
                port.on('error', onData);
                port.on('disconnect', onDisconnect);

                _onDone();
            } else { //error we could not connect to port
                var err = "No Teensy could be found.";
                _onDone(err);
                //try and find teensy again
                setTimeout(function() {
                    findTeensy();
                }, 1000);
            }
        });
    }

    findTeensy();
};

var tries = 0;

function writeColorsToSerialPort(_colors, _onWriteDone) {
    tries++;
    if (!isWaitingOnDraw) { //we are not still waiting for the teensy to complete the last draw

        _colors.write("***", 0, 3, "ascii"); //write the start code into the front of the buffer
        //console.log(_colors[0], _colors[1], _colors[2], _colors[3], _colors[4], _colors[5]);
        port.write(_colors, function() {
            _onWriteDone();
        });
    } else {
        if (tries <= 10) { //10 tries is 20ms if it takes this long something is wrong with the teensy
            //try again in 3ms
            setTimeout(function() {
                writeColorsToSerialPort(_colors, _onWriteDone);
            }, 2);
        } else {
            //call done and hopefully the teensy will be ready by next frame
            _onWriteDone();
        }
    }
}

exports.writeColors = function(_colors, _onWriteDone) {

    if (port) {
        if (!port.paused && !port.opening && !port.closing) {
            tries = 0;
            writeColorsToSerialPort(_colors, _onWriteDone);
        } else {
            console.log("waiting on port");
        }
    }
}

/*
var serialPort = require('serialPort');

portname = "COM3";

var port = new serialPort(portname,{
	baudRate:9600,
	parser:serialPort.parsers.readline("\r\n"),
});




*/