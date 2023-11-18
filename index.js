const { Bot } = require("./handlers/Client");
const { TOKEN } = require("./settings/config");
const client = new Bot();

client.connectToDatabase(); // Add this line

module.exports = client;
client.build(TOKEN);