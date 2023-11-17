const {Client, Intents} = require("discord.js");
const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES 
    ]
});
client.on("ready", () =>{
    console.log("The AI bot is online");
});
client.login(process.env.DISCORD_TOKEN);