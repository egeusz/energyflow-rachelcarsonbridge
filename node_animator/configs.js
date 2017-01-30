exports.configs = {
    conductor_url: "10.35.16.5",
    conductor_port: "80",

    build_version: "0.0.9",

    frame_rate: 60,

    max_run_length: 130,

    list: [{
            ips: ['10.35.16.110', '10.35.16.130', '10.35.16.210', '10.35.16.230'],

            strip1: {
                length: 0,
                circle_length: 9,
            }

        }, {
            //a111 and a161 are the same pi. a11 had to be moved to 161 because of ssh key issues
            ips: ['10.35.16.111', '10.35.16.161', '10.35.16.131', '10.35.16.231'],

            strip1: {
                length: 14,
                circle_length: 9,
            }

        }, {
            //b211 Has special offset betwwen circle and strip 1 because it has extra lights
            ips: ['10.35.16.211'],


            strip1: {
                length: 14,
                circle_length: 9,
                circle_offset: 7,
            }


        }, {
            ips: ['10.35.16.112', '10.35.16.132', '10.35.16.212', '10.35.16.232'],

            strip1: {
                length: 30,
                circle_length: 9,
            }

        }, {
            ips: ['10.35.16.113', '10.35.16.133', '10.35.16.213', '10.35.16.233'],

            strip1: {
                length: 50,
                circle_length: 9,
            }

        }, {
            ips: ['10.35.16.114', '10.35.16.134', '10.35.16.214', '10.35.16.234'],

            strip1: {
                length: 72,
                circle_length: 9,
            }
        }, {
            ips: ['10.35.16.115', '10.35.16.135', '10.35.16.215', '10.35.16.235', '10.35.16.109'],

            strip1: {
                length: 96,
                circle_length: 9,
            },
            tstrip1: {
                length: 10,
            },
            tstrip2: {
                length: 10,
            }
        }, {
            ips: ['10.35.16.116', '10.35.16.136', '10.35.16.216', '10.35.16.236'],

            strip1: {
                length: 121,
                circle_length: 9,
            },
            strip2: {
                length: 121,
            }
        }, {
            ips: ['10.35.16.117', '10.35.16.137', '10.35.16.217', '10.35.16.237'],

            strip1: {
                length: 121,
                circle_length: 9,
            },
            strip2: {
                length: 121,
            }
        }, {
            ips: ['10.35.16.118', '10.35.16.138', '10.35.16.218', '10.35.16.238'],

            strip1: {
                length: 93,
                circle_length: 9,
            },
            tstrip1: {
                length: 10,
            },
            tstrip2: {
                length: 10,
            }
        }, {
            ips: ['10.35.16.119', '10.35.16.139', '10.35.16.219', '10.35.16.239'],

            strip1: {
                length: 66,
                circle_length: 9,
            }
        }, {
            ips: ['10.35.16.120', '10.35.16.140', '10.35.16.220', '10.35.16.240'],

            strip1: {
                length: 42,
                circle_length: 9,
            }
        }, {
            ips: ['10.35.16.121', '10.35.16.141', '10.35.16.221', '10.35.16.241'],

            strip1: {
                length: 21,
                circle_length: 9,
            }
        }, {
            ips: ['10.35.16.122', '10.35.16.142', '10.35.16.222', '10.35.16.242'],

            strip1: {
                length: 0,
                circle_length: 9,
            }
        },

    ]
}