const { InteractionType, PermissionsBitField, underscore, Colors } = require("discord.js");
const client = require("../index");
const { log } = require("console");
const { config } = require("dotenv");

client.on("interactionCreate", async (interaction) => {
  // code
  if (interaction.user.bot || !interaction.guild) return;
  if (interaction.type == InteractionType.ApplicationCommand) {
    const command = client.scommands.get(interaction.commandName);
    if (!command) {
      return interaction.reply({
        content: `\`${interaction.commandName}\` is not valid command !!`,
        ephemeral: true,
      });
    } else {
      if (
        command.userPermissions &&
        !interaction.member.permissions.has(
          PermissionsBitField.resolve(command.userPermissions)
        )
      ) {
        return client.sendEmbed(
          interaction,
          `You don't have enough Permissions !!`
        );
      } else if (
        command.botPermissions &&
        !interaction.guild.members.me.permissions.has(
          PermissionsBitField.resolve(command.botPermissions)
        )
      ) {
        return client.sendEmbed(
          interaction,
          `I don't have enough Permissions !!`
        );
      } else {
        command.run(client, interaction);
      }
    }
  }
});
