const { ApplicationCommandType, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { Bot } = require("../../../handlers/Client");

module.exports = {
    name: "limf_x",
    description: `limit f(x)`,
    userPermissions: PermissionFlagsBits.SendMessages,
    botPermissions: PermissionFlagsBits.SendMessages,
    category: "Misc",
    type: ApplicationCommandType.ChatInput,
    /**
     *
     * @param {Bot} client
     * @param {CommandInteraction} interaction
     */

    run: async (client , interaction) => {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle('Your Limit is Error')
                .setDescription('Please try again 3,000 year later')
                .setTimestamp()
            ],
            ephemeral: true
        })
    }
}