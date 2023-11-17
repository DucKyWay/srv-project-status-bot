const { Bot } = require("./handlers/Client");
require("dotenv").config();
const client = new Bot();

module.exports = client;
// Don't delete this token
client.build(process.env.DISCORD_TOKEN);