var http = require('http')
const EventEmitter = require('events')
const express = require('express');
var router = express.Router();
var app = express();

//route for Twilio xml call object
router.post('/callback', function(req, res){
    if(req.body.CallStatus == 'completed') 
        call.emit('completed', req.body.CallSid);
});

//route for Twilio StatusEventCallback
router.post('/callscript', function(req, res){
    res.sendFile('./script.xml')
});

app.use('/', router);
app.listen(3031);

/*
var xml =  `<Response>
                <Say voice="alice">Thanks for trying our documentation. Enjoy!</Say>
                <Play>http://demo.twilio.com/docs/classic.mp3</Play>
            </Response>`
*/
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
