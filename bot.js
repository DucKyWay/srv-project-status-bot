const {Client, Intents} = require("discord.js");
const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES 
    ]
});
client.on("ready", () =>{
    console.log(`Logged in ${client.user.tag}!`);
});

// Don't delete this token
client.login(process.env.DISCORD_TOKEN);