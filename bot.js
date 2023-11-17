const { Bot } = require("./handlers/Client");
const client = new Bot();

module.exports = client;
// Don't delete this token
client.login(process.env.DISCORD_TOKEN);