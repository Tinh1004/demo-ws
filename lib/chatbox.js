const natural = require('natural');
const stopwords = require('stopword');
const Question = require("../models/Question.model");
const driveService = require('../services/drive.service');

async function processInput(input) {
  const tokenizer = new natural.WordTokenizer();
  const stemmedTokens = tokenizer.tokenize(input.toLowerCase()).map(token => natural.PorterStemmer.stem(token));
  const filteredTokens = stopwords.removeStopwords(stemmedTokens);
  const questions = await Question.find();

  for (const rule of questions) {
    const ruleTokens = tokenizer.tokenize(rule.question.toLowerCase()).map(token => natural.PorterStemmer.stem(token));
    const filteredRuleTokens = stopwords.removeStopwords(ruleTokens);
    const match = filteredRuleTokens.every(token => {
      return filteredTokens.includes(token)
    });

    if (match) {
      return rule.answer;
    }
  }

  return 'I do not understand your question.';
}


// Test
module.exports = processInput;
