const { ActivityType } = require("discord.js");
const client = require("../index");

var currentdate = new Date();
var datetime = " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

client.on("ready", () => {
  console.log(datetime + `: bot is ready for work !!`);
  client.user.setActivity({
    name: `Coded By TNN Group 🪦`,
    type: ActivityType.Watching,
  });
  client.user.setStatus({
    name: `PROJECT STATUS TRACKING AND MANAGEMENT SYSTEM VIA DISCORD\nMade By Thailand student in Sarawittaya school.\nLast Updated: ` + datetime
  });
});
