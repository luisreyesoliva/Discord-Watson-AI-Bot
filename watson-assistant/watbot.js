const Discord = require('discord.js'); 
const client = new Discord.Client(); 



const AssistantV2 = require('ibm-watson/assistant/v2'); //watson assistant
const { IamAuthenticator } = require('ibm-watson/auth'); //watson Oauth

const ASSISTANT_ID = process.env.ASSISTANT_ID; //from UI
const ASSISTANT_URL = process.env.ASSISTANT_URL; //service-credentials-blog
const ASSISTANT_APIKEY = process.env.ASSISTANT_APIKEY; //service-credentials-blog
const ASST_API_VERSION = '2021-06-14'
const TOKEN = process.env.DISCORD_TOKEN;  


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
