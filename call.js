// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = '';
const authToken = '';
const twilioClient = require('twilio')(accountSid, authToken);
const program = require('commander');

program.option('-n, --number <1232343432>', 'Number to call');
program.parse(process.argv);
console.log('Number to call: %s', program.number);

var startTime = new Date().getTime();

for(let i = 0; i < 3; i++){
	call(program.number);
}

var endTime = (new Date().getTime()) - startTime;
console.log('Total runtime: %s', endTime);


function call(number){
  twilioClient.calls
      .create({
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: '+1' + number,
         from: '+18628002438'
       })
      .then((call) => {
	 console.log('Calling %s, Call ID: %s', number, call.sid);
	 sleep(10000);
       });

}

function sleep(time) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
}
