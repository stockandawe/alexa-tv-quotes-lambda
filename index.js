/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.f4425379-2585-48c3-8b62-c6564688f1ef"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var TV_QUOTES = [
    "Put some alcohol in your mouth. To block the words from coming out.",
    "Any dog under fifty pounds is a cat and cats are useless.",
    "I have never known what bangs are. And I don't intend to learn.",
    "Never half-ass two things. Whole-ass one thing.",
    "Do I have a history of mental illness in my family? I have an uncle who does yoga.",
    "You had me at meat tornado.",
    "Do I want salad? Since I am not a rabbit, no, I do not.",
    "Clear alcohols are for rich women on diets.",
    "There will be alcohol there, so I will go as well.",
    "There is only one thing I hate more than lying: skim milk. Which is water that's lying about being milk.",
    "The only permit I need is one that says I can do whatever I want.",
    "The less I know about other people's affairs, the happier I am.",
    "Dear frozen yogurt, you are the celery of desserts. Be ice cream, or be nothing.",
    "Strippers do nothing for me. But I will take a free breakfast buffet anytime, anyplace.",
    "Fishing relaxes me. It's like yoga, except I still get to kill something.",
    "I regret nothing. The end.",
    "I hate everything.",
    "I have never known what bangs are. And I don't intend to learn.",
    "Put some alcohol in your mouth. To block the words from coming out.",
    "Any dog under fifty pounds is a cat and cats are useless.",
    "You had me at meat tornado.",
    "Do I want salad? Since I am not a rabbit, no, I do not.",
    "Clear alcohols are for rich women on diets."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var SpaceGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
SpaceGeek.prototype = Object.create(AlexaSkill.prototype);
SpaceGeek.prototype.constructor = SpaceGeek;

SpaceGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("TV Wisdom onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

SpaceGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("TV Wisdom onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
SpaceGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("TV Wisdom onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

SpaceGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Television tell me a quote, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * TV_QUOTES.length);
    var fact = TV_QUOTES[factIndex];

    // Create speech output
    var speechOutput = "Ron Sawnson says: " + fact;

    response.tellWithCard(speechOutput, "Television", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var spaceGeek = new SpaceGeek();
    spaceGeek.execute(event, context);
};
