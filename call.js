
//Get API creds from .env file
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioClient = require('twilio')(accountSid, authToken);

//cli flags set
const program = require('commander');                                               //node module
program.option('-n, --number <2223334444>', 'Number to call');                      //phone number to call
program.option('-r, --repeat, <int>', 'number of times to call', 1);    //default number of calls to 1

//spin up response server
const app = require('./app');

//parse flags
program.parse(process.argv);

//init start time
var startTime = new Date().getTime();
console.log('Start Time: %s', startTime);

//make n twilio calls to program.number 
var calls_made = 0;
var calls_completed = 0;

//make first call
makeCall(program);

//when a call is completed, make another call  (or end program)
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
        app.exit(0);
        process.exit(0);
    }
})

function makeCall(program){
   //make call (see Twilio documentation)
    twilioClient.calls
      .create({
         url: 'http://ce432121.ngrok.io/callscript',
         to: '+1' + program.number,
         from: '+18628002438',
         statusCallback: 'http://ce432121.ngrok.io/callback',
         statusCallbackMethod: 'POST',
         statusCallbackEvent: ['completed']
       })
      .then((call) => {
        console.log('Calling %s, Call ID: %s', program.number, call.sid);
        calls_made++;
       }, (err) =>{
            console.log('Error requesting call: ', err); 
            app.exit(1);
            process.exit(1);  
       });
}  
