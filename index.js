const { Bot } = require("./handlers/Client");
const { TOKEN } = require("./settings/config");
const client = new Bot();

module.exports = client;
// Don't delete this token
client.build(TOKEN);