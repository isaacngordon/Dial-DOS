const querystring = require('querystring');
const EventEmitter = require('events')
const express = require('express');
var router = express.Router();
var app = express();

//route for Twilio xml call object
router.post('/callback', function(req, res){
    var d = '';
    req.on('data', function (chunk) {d += chunk;})
    req.on('end', () => {
        let da = querystring.parse(d);
        console.log('New Request Data: ', da);
        if(da.CallStatus == 'completed') {
            call.emit('completed', da.CallSid);
            //res.send('<p>Completed was emitted</p>');
        }
        //else res.send('<p> Different status event reciveved by callback</p>')
    })
});

//route for Twilio StatusEventCallback
router.post('/callscript', function(req, res){
    try {
        res.sendFile('/Users/isaacgordon/Documents/the-fuckery/dialdos/script.xml')

    } catch (e) {
        console.log('ERROR: ', e);
    }
});

app.use('/', router);
app.listen(80);

var call = new EventEmitter();
var obj = { say: 'This is dull'};

module.exports = {
    setSay: (str) => obj.say = str,
    setPlay: (path) => obj.play = path,
    rooster: call
}

function compileXML(){
    return `<?xml version = "1.0" encoding = "utf-8">
            <Response>
                <Say voice="alice">${obj.say}</Say>
                <Play>http://demo.twilio.com/docs/classic.mp3</Play>
            </Response>`
}
