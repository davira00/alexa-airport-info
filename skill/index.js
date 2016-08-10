'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('airportreport');
var FAADataHelper = require('./faa_data_helper');

app.launch(function(req, res) {
    var prompt = 'Welcome to AirportReport. You can use AirportReport to find delay status on any airport with an FAA code<break time="1s"/>'+
        'You can say: Alexa, ask AirportReport about SFO<break time="1s"/>'+
        'You can also say: Alexa, ask AirportReport about delays for SFO';

    var reprompt = 'For which airport will you like delay information.';

    res.say(prompt).reprompt(reprompt).shouldEndSession(false);
    return true;
});

app.intent('airportreport', {
  'slots': {
    'AIRPORTCODE': 'FAACODES'
  },
  'utterances': ['{|flight|airport} {|delay|status} {|info} {|for} {-|AIRPORTCODE}']
},
  function(req, res) {
    //get the slot
    var airportCode = req.slot('AIRPORTCODE');
    var reprompt = 'Tell me an airport code to get delay information.';
if (_.isEmpty(airportCode)) {
      var prompt = 'I didn\'t hear an airport code. Please tell me an airport code.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      var faaHelper = new FAADataHelper();

faaHelper.requestAirportStatus(airportCode).then(function(airportStatus) {
        console.log(airportStatus);
        res.say(faaHelper.formatAirportStatus(airportStatus)).shouldEndSession(true).send();
      }).catch(function(err) {
        console.log(err.statusCode);
        var prompt = 'I didn\'t have data for an airport code of ' + airportCode;
        res.say(prompt).reprompt(reprompt).shouldEndSession(true).send();
      });
      return false;
    }
  }
);

app.intent("AMAZON.HelpIntent", 
  function(req, res) {
    //get the slot
	
  var prompt = 'You can use AirportReport to find delay status on any airport with an FAA code<break time="1s"/>'+
	  'You can say: Alexa, ask AirportReport about SFO<break time="1s"/>'+
	  'You can also say: Alexa, ask AirportReport about delays for SFO';
	  
	  var reprompt = 'For which airport will you like delay information.';

      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    }
);

app.intent("AMAZON.StopIntent", 
  function(req, res) {
	  var prompt = 'Goodbye.';
      res.say(prompt).shouldEndSession(true);
      return true;
    }
);

app.intent("AMAZON.CancelIntent", 
  function(req, res) {
	  var prompt = 'Goodbye.';
      res.say(prompt).shouldEndSession(true);
      return true;
    }
);
//amazon default intents
/*

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
*/


//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;	