const Discord = require('discord.js'); 
const client = new Discord.Client(); 



const AssistantV2 = require('ibm-watson/assistant/v2'); //watson assistant
const { IamAuthenticator } = require('ibm-watson/auth'); //watson Oauth

const ASSISTANT_ID = '24bd2059-5227-483a-9cdb-cebd1c239083'; //from UI
const ASSISTANT_URL = 'https://api.eu-de.assistant.watson.cloud.ibm.com/instances/1ce96bd4-c65a-4d03-979d-f6e3ce40b16d'; //service-credentials-blog
const ASSISTANT_APIKEY = '_ZAMOGZYp8i61Gsb7gIVH8Ia08CQN8DOJVUbyvK4kSwZ'; //service-credentials-blog
const ASST_API_VERSION = '2021-06-14'
const TOKEN = 'OTAwMzE1Mzg1NjE2ODE0MTYw.YW_iCg.qfB7vI0n1N8TgQ82MUCuEHwYLqE';  


const assistant = new AssistantV2({
  version: ASST_API_VERSION,
  authenticator: new IamAuthenticator({
    apikey: ASSISTANT_APIKEY,
  }),
  serviceUrl: ASSISTANT_URL,
});

 
//let text = ''; // the response text from Watson Assistant

async function callAssistant(msg) {
  assistant.messageStateless(
    {
      assistantId: ASSISTANT_ID,
      input: { 
        message_type: 'text',
        text: msg.content.substring(3)},
    })
    .then(response => {
      console.log("successful call");
      console.log("text0: " + JSON.stringify(response.result.output, null, 2)); //an entire response from the service
      const text = JSON.stringify(response.result.output.generic[0].text, null, 2); //pass the value to the global variable
      return msg.reply(text);
    })
    .catch(err => {
      console.log("unsuccessful call");
      console.log(err);
      return error.stringify;
    });
}

client.on('ready', () => {
  console.log(`💯 Wat-bot is online! Logged in as ${client.user.tag}!`);
});

const regexPrefix = new RegExp('!wa*');

client.on('message', msg => {
  //regexp for a key word '!wa*'
  if (regexPrefix.test(msg.content)) {
    //connecting to Watson Assistant here
    callAssistant(msg);
    //callAssistant(msg.content.substring(3));
    //msg.reply(text);
  }
});

client.login(TOKEN);
