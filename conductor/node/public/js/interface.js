console.log("HI");
var socket;

var e_modes_dd;
var e_current_mode;

function init() {
    console.log("INIT");
    //conect to interface socket
    socket = io('/int');

    e_modes_dd = $('#modes');
    e_current_mode = $('#mode');
    getModes();
}


function getModes() {
    socket.emit('get_modes', {}, function(res) {
        e_current_mode.text(res.mode);
        var modes = res.modes;
        console.log(modes);
        for (var m in modes) {
            e_modes_dd.append('<option value="' + m + '">' + m + '</option>');
        }
    });
}

function setMode() {
    console.log("setting mode " + e_modes_dd.val());
    var params = {
        mode: e_modes_dd.val(),
    }
    socket.emit('set_mode', params, function(res) {
        if (res) {
            console.log(res.mode + " set");
            e_current_mode.text(res.mode);
        }
    });
}

function playAnim() {
    var who = $("#animator_who").val();
    var name = $("#animator_name").val();
    var strips = [];
    if ($("#strip1").prop('checked')) {
        strips.push("STRIP1");
    }
    if ($("#strip2").prop('checked')) {
        strips.push("STRIP2");
    }
    if ($("#tstrip1").prop('checked')) {
        strips.push("TSTRIP1");
    }
    if ($("#tstrip2").prop('checked')) {
        strips.push("TSTRIP2");
    }
    if ($("#circle").prop('checked')) {
        strips.push("CIRCLE");
    }

    console.log("Playing Animation ", who, name, strips);
    var params = {
        who: who,
        name: name,
        strips: strips,
    }
    socket.emit('play_animation', params, function(res) {

    });
}