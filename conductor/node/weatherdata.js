//Libraries
var http = require('http');
var cheerio = require('cheerio');


var wdata = {};
var url_host = "www.weatherlink.com";
var url_path = "/user/windstaxpittohio/index.php?view=main&headers=1";

var wait = 60 * 1000; //update once a minute

var onDataUpdate_callback = null;

// var url_host = "www.google.com";
// var url_path = "";

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
    'Content-Type': 'application/x-www-form-urlencoded'
};


function init(_url_host, _url_path) {

    url_host = _url_host;
    url_path = _url_path;


    function loop() {
        getData();
        setTimeout(function() {
            loop()
        }, wait);
    }
    loop();
}


function getData() {

    var options = {
        host: url_host,
        port: 80,
        path: url_path
    };

    http.get(options, function(res) {
        console.log("Got Weather Data: " + res.statusCode);
        var str = '';
        res.on("data", function(chunk) {
            str += chunk;
        });
        res.on('end', function() {
            parseHtml(str);
        });
    }).on('error', function(e) {
        console.log("Error Getting Weather Data: " + e.message);
    });
}

function parseHtml(html) {
    let $ = cheerio.load(html);

    var temp_str = stripChars($($(".glamor_temp")[0]).text());
    var vals = $(".glamor_datatemp");

    var temp_high_str = stripChars($(vals[0]).text());
    var temp_low_str = stripChars($(vals[1]).text());
    var wind_str = stripChars($(vals[2]).text());
    var humidity_str = stripChars($(vals[3]).text());
    var rain_str = stripChars($(vals[4]).text());
    var barometer_str = stripChars($(vals[5]).text());

    // for (var i = 0; i < vals.length; i++) {
    //     console.log($(vals[i]).text());
    // }

    wdata = {
        temp: parseFloat(temp_str),
        temp_high: parseFloat(temp_high_str),
        temp_low: parseFloat(temp_low_str),
        wind: parseFloat(wind_str),
        humidity: parseFloat(humidity_str),
        rain: parseFloat(rain_str),
        barometer: parseFloat(barometer_str),
    }

    console.log(wdata);

    if (onDataUpdate_callback) {
        onDataUpdate_callback(wdata);
    }
}

function stripChars(str) {
    var num_str = str.replace(/[^0-9.-]/g, "");
    if (num_str == "") {
        num_str = '0';
    }
    return num_str;
}

function getLatestData() {
    return wdata;
}

function onDataUpdate(_callback) {
    onDataUpdate_callback = _callback;
}

module.exports = {
    getLatestData: getLatestData,
    init: init,
    onDataUpdate: onDataUpdate,
}