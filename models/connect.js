const mongo = require('mongoose');

const connectDB = new mongo.Schema({
  Guild: Number,
  SpecialKey: String
});

module.exports = mongo.model('srv_projectstatus', connectDB);