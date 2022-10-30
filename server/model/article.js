const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Article = mongoose.model('Article', schema, 'Takoyaki-Article');

module.exports = Article;