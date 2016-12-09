/**
 * Created by bcuser on 12/5/16.
 */
var servers = ['http://127.0.0.1:5984',
    'http://192.168.2.19:5984',
    'http://168.156.47.55:5984'
];
var serverIndex = 0;
var serverUrl = servers[serverIndex];
console.log('Middleware attaching to database on: ', serverUrl);

module.exports.serverUrl = serverUrl;
