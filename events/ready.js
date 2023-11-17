const { ActivityType } = require("discord.js");
const client = require("../bot");

client.on("ready", () => {
  console.log(`bot is ready for work !!`);
  client.user.setActivity({
    name: `Coded By TNN Group 🪦`,
    type: ActivityType.Watching,
  });
});