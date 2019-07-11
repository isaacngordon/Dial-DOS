const querystring = require('querystring');
const EventEmitter = require('events')
const express = require('express');

var router = express.Router();
var app = express();
var call = new EventEmitter();
var obj = { say: 'This is dull'};

//route for Twilio StatusEventCallback
router.post('/callback', function(req, res){
    var d = '';
    req.on('data', function (chunk) {d += chunk;})
    req.on('end', () => {
        let da = querystring.parse(d);
        //console.log('New Callback Data: ', da);
        if(da.CallStatus == 'completed') {
            call.emit('completed', da.CallSid);
        }
    })
});

//route for Twilio TwiML call 
router.post('/callscript', function(req, res){
    try {
        res.sendFile('/Users/isaacgordon/Documents/the-fuckery/dialdos/script.xml')

    } catch (e) {
        console.log('ERROR: ', e);
    }
});

app.use('/', router);
app.listen(80);

module.exports = {
    setSay: (str) => obj.say = str,
    setPlay: (path) => obj.play = path,
    rooster: call
}