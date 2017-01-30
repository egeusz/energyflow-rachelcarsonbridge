var wait = 1000 / 60; //in milisec, default at 60fps
var time_startedLastUpdate = Date.now();
var adjusted_wait = wait;
var total_time = 0;
var process_time = 1000 / wait;

var fps_samplerate = 1000 * 1; //every two seconds


function loop() {
    setTimeout(function() {
        //call main update
        //update(adjusted_wait, function() { //call next loop
        update(wait, function() { //call next loop

            //calc the time diff so the loop can get back in sync
            total_time = Date.now() - time_startedLastUpdate;
            process_time = total_time - wait;
            adjusted_wait = wait - process_time;
            //console.log(wait, total_time, process_time, adjusted_wait);
            if (adjusted_wait < 0) {
                adjusted_wait = 0;
                //console.log(Math.floor(1000 / process_time), "fps, slow framerate");
            }


            time_startedLastUpdate = Date.now();
            loop();
        });


    }, wait); //}, adjusted_wait);
}

function update(_timedelta, _onDone) {
    //default noop
    //use setUpdate to replace with custom update
    _onDone();
}

exports.setUpdate = function(_update_function) {

    update = _update_function;
}

exports.startLoop = function(_frames_per_sec) {
    if (_frames_per_sec) { //_frames_per_sec is not null
        wait = 1000 / _frames_per_sec;
    }
    //start the loop!
    time_startedLastUpdate = Date.now();
    loop();

    //sample the framerate and print it
    setInterval(function() {
        //console.log(Math.floor(1000 / adjusted_wait), "fps");
    }, fps_samplerate);
}