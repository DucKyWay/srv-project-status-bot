const { Bot } = require("./handlers/Client");
const { TOKEN } = require("./settings/config");
const client = new Bot();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log('Connected to Mongodb.')).catch((e)=> {console.log(e)});

module.exports = client;
client.build(TOKEN);