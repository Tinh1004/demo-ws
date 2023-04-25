const natural = require('natural');
const stopwords = require('stopword');
const Question = require("../models/Question.model");
const driveService = require('../services/drive.service');

async function processInput(input, params) {
  const tokenizer = new natural.WordTokenizer();
  const stemmedTokens = tokenizer.tokenize(input.toLowerCase()).map(token => natural.PorterStemmer.stem(token));
  const filteredTokens = stopwords.removeStopwords(stemmedTokens);
  const questions = await Question.find();

  if (params) {
    const { client, socket } = params
    for (const rule of questions) {
      const ruleTokens = tokenizer.tokenize(rule.question.toLowerCase()).map(token => natural.PorterStemmer.stem(token));
      const filteredRuleTokens = stopwords.removeStopwords(ruleTokens);
      const match = filteredRuleTokens.every(token => {
        return filteredTokens.includes(token)
      });

      if (match) {
        if (rule.answer === 'Oke tôi sẽ bật đèn cho bạn') {
          await driveService.updateStatusLight(1);
          client && socket.to(`${client.socketId}`).emit("testLight", 1);
        }
        return rule.answer;
      }
    }
    return 'I do not understand your question.';
  }
  return 'I do not understand your question.';
}

// Test
module.exports = processInput;
