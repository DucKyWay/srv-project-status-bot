const { ActivityType, ApplicationCommandType, ChannelType, PermissionFlagsBits, InteractionType, ButtonStyle, Colors, EmbedBuilder } = require("discord.js");
const { Bot } = require("../../../handlers/Client");
const client = require("../index");

client.on("ready", () => {
  console.log(`bot is ready for work !!`);
  client.user.setActivity({
    name: `Coded By TNN Group 🪦`,
    type: ActivityType.Watching,
  });
  client.user.setStatus({
    name: `PROJECT STATUS TRACKING AND MANAGEMENT SYSTEM VIA DISCORD\nMade By Thailand student in Sarawittaya school.`
  });
});

client.on('interactionCreate', (interaction)=> {
  console.log(interaction.user.username , interaction.user.id ,'Use interaction >',interaction.commandName ? interaction.commandName : interaction.customId, '<' );
  status_channel_id = client.get_channel(1175461374000889976);
  status_channel_id.sendEmbed(message, interaction.user.username , interaction.user.id ,'Use interaction >',interaction.commandName ? interaction.commandName : interaction.customId, " Bot is now updated.");
});
