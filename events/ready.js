const { ActivityType } = require("discord.js");
const client = require("../index");

client.on("ready", () => {
  console.log(`bot is ready for work !!`);
  client.user.setActivity({
    name: `Coded By TNN Group 🪦`,
    type: ActivityType.Watching,
  });
  client.user.setStatus({
    name: `PROJECT STATUS TRACKING AND MANAGEMENT SYSTEM VIA DISCORD\nMade By Thailand student in Sarawittaya school.\nLast Updated: `
  });
});
