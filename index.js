const { Bot } = require("./handlers/Client");
const { TOKEN } = require("./settings/config");
require("dotenv").config();
const client = new Bot();

module.exports = client;
// Don't delete this token
client.login(TOKEN);