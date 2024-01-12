const { ApplicationCommandType, ChannelType, PermissionFlagsBits, InteractionType, EmbedBuilder } = require("discord.js");
const { Bot } = require("../../../handlers/Client");
const { connectDBS } = require("../../../models/connect");
const { description, run } = require("./set");

module.exports = {
    name: "find_send",
    description: "fetch all data your student sended!",
    userPermissions: PermissionFlagsBits.Administrator,
    botPermissions: PermissionFlagsBits.Administrator,
    category: "Misc",
    type: ApplicationCommandType.ChatInput,

    run: async (client, interaction, guild) => {
        try {
            const resultCursor = await (await connectDBS()).find({ channelId: interaction.guild.id });
            const result = await resultCursor.toArray();

            const embedFields = result.map(data => ({
                name: `User ID: ${client.users.cache.get(data.userId).username.toString() || data.userId}`,
                value: `**File Name:** ${data.sendData.fileName}\n**File:** [Link](${data.sendData.file})\n**Comment:** ${data.sendData.comment}\n**Timestamp:** <t:${Math.floor(data.timestamp / 1000)}:f>`
            }));

            interaction.reply({
                content: "Fetched all data in the database:",
                embeds: [{
                    title: "Data Details",
                    fields: embedFields,  // Use the prepared array here
                }],
            });
        } catch (err) {
            console.error("Error fetching data:", err);
            client.sendEmbed(interaction,"Failed to fetch data from the database.");
        }
    }
}