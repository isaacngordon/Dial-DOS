const querystring = require('querystring');
const EventEmitter = require('events')
const express = require('express');

var router = express.Router();
var app = express();
var call = new EventEmitter();

//route for Twilio StatusEventCallback
router.post('/callback', function(req, res){
    var d = '';
    req.on('data', function (chunk) {d += chunk;})
    req.on('end', () => {
        let da = querystring.parse(d);

        //if the call was completed then let call.js know
        if(da.CallStatus == 'completed') {
            call.emit('completed', da.CallSid);
        }
    })
});

//route for Twilio TwiML call 
router.post('/callscript', function(req, res){
    try {
        //send TwiML file
        res.sendFile('/Users/isaacgordon/Documents/the-fuckery/dialdos/script.xml')
    } catch (e) {
        console.log('ERROR: ', e);
    }
});

app.use('/', router);
app.listen(80);

module.exports = {
    rooster: call,
    exit: (int) => process.exit(int)
}