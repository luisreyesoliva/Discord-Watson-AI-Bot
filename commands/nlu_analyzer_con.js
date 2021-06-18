module.exports = {
    name : 'Natural Language Understanding Concepts',
    desc : 'Analyze various features of text content at scale!',
    execute(msg, args)
    {
      const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
      const { IamAuthenticator } = require('ibm-watson/auth');

      const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-04-26',
        authenticator: new IamAuthenticator({
          apikey: process.env.APIKEY_NLU,
        }),
        serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/bdcde66d-27e7-413a-baf4-3a239b9b398c',
      });

      //TOPICS -> concepts
      //related ->  categories
      const retrive_url = args;
      const analyzeParams = {
      'url': retrive_url,
      'features': {
          'concepts': {
          'limit': 3
          }
        }
      };

      naturalLanguageUnderstanding.analyze(analyzeParams)
      .then(analysisResults => {
        const response = JSON.stringify(analysisResults, null, 2);
        const answer = JSON.parse(response);
        const result = Array.from(answer.result.concepts);
        //console.log(answer)
        if (!result.length) { return msg.reply(`No results found for **${args.join(' ')}**.`); }
        
        for (let topic of result) { msg.channel.send(topic.text) };
        
      })
      .catch(err => {
        console.log('error:', err);
      });
    }
}