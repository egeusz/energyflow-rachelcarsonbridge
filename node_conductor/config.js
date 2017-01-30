module.exports = {

    weather_url_host: "www.weatherlink.com",
    weather_url_path: "/user/rachelcarson",

    //the time we wait for animators to reconnect on boot before starting the show
    bootwait: 7000,

    scores: {
        "BLACK": "./scores/score_black.js",
        "SHOW": "./scores/score_show.js",
        "AMB": "./scores/score_ambient.js",
        "WATERFALL": "./scores/score_waterfall.js",
        "CHASERRUN": "./scores/score_chaserrun.js",
        "WIPE": "./scores/score_wipe.js",
        "WIPE2": "./scores/score_wipe2.js",
        "RAINBOW": "./scores/score_rainbow.js",
        "SPARKLE": "./scores/score_sparkle.js",
        "BOUNCE": "./scores/score_bounce.js",
        "BOUNCERUN": "./scores/score_bouncerun.js",
        "WHITE": "./scores/score_white.js",
        "OFF": "./scores/score_off.js",

    },

    show_wait: 5 * 60 * 1000, //play once every 5 minutes

    startmode: "AUTO",
    //startmode: "TIMING",
    //startmode: "WIPE",
}