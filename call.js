
//api creds from enviornment varibles and set twilio api client
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioClient = require('twilio')(accountSid, authToken);

//cli flags set
const program = require('commander');                                               //node module
program.option('-n, --number <2223334444>', 'Number to call');                      //phone number to call
program.option('-r, --repeat, <int>', 'number of times to call', 1);    //default number of calls to 1

//spin up server
const app = require('./app');
//app.init();
app.setSay('Hello you fool. What a pleasent day to be coding a piece of shit application.')

//parse flags
program.parse(process.argv);

//init start time
var startTime = new Date().getTime();
console.log('Start Time: %s', startTime);

//make n twilio calls to program.number 
var calls_made = 0;
var calls_completed = 0;

makeCall(program);

app.rooster.on('completed', (sid) => {
    calls_completed++;
    console.log('Call Complete. SID: %s', sid)
    if(program.repeat != calls_made) {
        makeCall(program);
    } else{
        //log end times
        var endTime = new Date().getTime();
        console.log('Total runtime: %s seconds', endTime - startTime);
        console.log('Calls Made: %s, Calls Completed: %s', calls_made, calls_completed);
    }
})

function makeCall(program){
   //make call
    twilioClient.calls
      .create({
         url: 'http://28082ef6.ngrok.io/callscript',
         to: '+1' + program.number,
         from: '+18628002438',
         statusCallback: 'http://28082ef6.ngrok.io/callback',
         statusCallbackMethod: 'POST',
         statusCallbackEvent: ['completed']
       })
      .then((call) => {
        console.log('Calling %s, Call ID: %s', program.number, call.sid);
        calls_made++;
       }, (err) =>{
            console.log('Error requesting call: ', err);    
       });
}  
