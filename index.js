const { Bot } = require("./handlers/Client");
const { TOKEN } = require("./settings/config");
const { connectP } = require('./models/connect.js');

const client = new Bot();

async function initialize() {
    try {
        const dbClient = await connectP();

        // Now you can run MongoDB commands
        await dbClient.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Now you can continue with other initialization tasks or start the bot
        client.build(TOKEN);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Call the initialize function to start the process
initialize();

module.exports = client;