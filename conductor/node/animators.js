///---------------------------------------------------
var layout = require("./layout.js");

///---------------------------------------------------
//list of connected animator sockets
// var animatorlist_a_nw = []; //110-122
// var animatorlist_a_sw = []; //130-142
// var animatorlist_b_ne = []; //210-222
// var animatorlist_b_se = []; //230-242

var choreographer;

var animatorlist = [];

function getAnimatorSocketByIp(_ip) {
    return animatorlist[_ip];
    // var socket = animatorlist_a_nw[_ip];
    // if (!socket) {
    //     socket = animatorlist_a_sw[_ip];
    //     if (!socket) {
    //         socket = animatorlist_b_ne[_ip];
    //         if (!socket) {
    //             socket = animatorlist_b_se[_ip];
    //         }
    //     }
    // }
    // return socket;

}

function addAnimatorScoketByIP(_ip, socket) {
    animatorlist[_ip] = socket;
    return null;

    // var number = parseInt(_ip.split(".")[3]);
    // //sort into index
    // if (110 <= number && number <= 122) {
    //     animatorlist_a_nw[_ip] = socket;
    // } else if (130 <= number && number <= 142) {
    //     animatorlist_a_sw[_ip] = socket;
    // } else if (210 <= number && number <= 222) {
    //     animatorlist_a_ne[_ip] = socket;
    // } else if (230 <= number && number <= 242) {
    //     animatorlist_a_se[_ip] = socket;
    // } else {

    //     return "Connected Device is not an Animator.";
    // }
    // return "";
}

function removeAnimatorScoketByIP(_ip) {
    animatorlist[_ip] = null;
    // animatorlist_a_nw[_ip] = null; //110-122
    // animatorlist_a_sw[_ip] = null; //130-142
    // animatorlist_b_ne[_ip] = null; //210-222
    // animatorlist_b_se[_ip] = null; //230-242
}


///---------------------------------------------------
function init(io, _choreographer) {
    choreographer = _choreographer;
    var io_anim = io.of('/anim');
    //Animator Connected!
    io_anim.on('connection', function(socket) {
        var socketId = socket.id;
        var clientIpV6 = socket.request.connection.remoteAddress;
        //::ffff:10.35.16.112
        var clientIp = clientIpV6.split(":")[3];
        //10.35.16.112
        var number = clientIp.split(".")[3];
        //112

        //generate name
        var name;
        if (number < 200) {
            name = "a" + number;
        } else {
            name = "b" + number;
        }
        socket.name = name;

        //add socket to animators
        err = addAnimatorScoketByIP(clientIp, socket);
        if (err) {
            console.log(err, ":", socket.name, clientIp);
        }

        //listen for disconnect event and remove it from the connected animators
        socket.on('disconnect', function() {
            removeAnimatorScoketByIP(clientIp);
            console.log("< >", socket.name, clientIp);
        });

        console.log("---", socket.name, clientIp);

        socket.on('ready', function() {
            console.log("===", name);
            choreographer.onNewConnection(clientIp, name);
        });

        //return info back to the animator
        socket.emit('info', {
            ip: clientIp,
            name: name,
        });


    });
}

function writeToAnimators(_anim_address, _command, _message) {
    if (_anim_address.length > 10) {
        //assume ip address 
        //10.35.16.110
        var socket = getAnimatorSocketByIp(_anim_address)
        if (socket) {
            socket.emit(_command, _message);
        } else {
            //no active socket at that address
            //fail silently

            // if (/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/.test(_anim_address)) {
            //     //this was an ip, assume device was not connected and fail silently 
            // } else {
            //     console.error("Address ", _anim_address, " is not a valid ip address");
            // }
        }
    } else {
        //assume grouping 
        //R5
        var group = layout.groups[_anim_address];
        if (group) {
            //loop through the group and find each socket by ID
            for (var i = 0; i < group.length; i++) {
                var socket = getAnimatorSocketByIp(group[i]);
                if (socket) {
                    socket.emit(_command, _message);
                } else {
                    //no active socket at that address
                    //fail silently
                }
            }
        } else {
            //no group with that name
            //fail silently?
        }
    }
}

//if an animator connected after commands wer sent it might need to get them resent
function catchUpAnimator(_address, _anim_address, _command, _message) {
    //if the _address is directly the same as the anim address
    if (_address == _anim_address) {
        var socket = getAnimatorSocketByIp(_anim_address)
        if (socket) {
            socket.emit(_command, _message);
        } else {
            //no active socket at that address
            //fail silently
        }
    } else {
        //assume grouping 
        //R5
        var group = layout.groups[_anim_address];
        if (group) {
            //loop through the group and find each socket by ID
            for (var i = 0; i < group.length; i++) {
                //the address is contained with in the _anim_address group
                if (_address == group[i]) {
                    var socket = getAnimatorSocketByIp(group[i]);
                    if (socket) {
                        //console.log("SENDING CATCHUP !!", _address)
                        socket.emit(_command, _message);
                    } else {
                        //no active socket at that address
                        //fail silently
                    }
                    break;
                }

            }
        } else {
            //no group with that name
            //fail silently?
        }

    }
}

module.exports = {
    init: init,
    writeToAnimators: writeToAnimators,
    catchUpAnimator: catchUpAnimator,
}