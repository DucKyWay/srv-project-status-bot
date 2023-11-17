const { ApplicationCommandType, ChannelType, PermissionFlagsBits, InteractionType } = require("discord.js");
const { Bot } = require("../../../handlers/Client");

module.exports = {
    name: "create",
    description: 'Create your group',
    userPermissions: PermissionFlagsBits.SendMessages,
    botPermissions: PermissionFlagsBits.Administrator,
    category: "Misc",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'groupname',
            description: 'Name for the new channel',
            type: 3,
            required: true,
        },
    ],

    run: async (client, interaction,guild) => {
        // Retrieve the group name from the interaction options
        const groupName = interaction.options.getString('groupname');
    
        // Check if groupName is undefined or an empty string
        if (!groupName || groupName.trim() === '') {
            return await interaction.reply('Please provide a valid group name.');
        }

        try {
            // Check if the channel name is valid
            if (/[^a-zA-Z0-9-_]/.test(groupName)) {
                return await interaction.reply('Invalid characters in the group name. Please use only letters, numbers, hyphens, and underscores.');
            }

            // Create a new text channel in the same category as the command was invoked
            const newChannel = await interaction.guild.channels.create({
                name: groupName,
                type: ChannelType.GuildText,
            });

            // Send a confirmation message
            await interaction.reply(`Channel "${groupName}" created successfully!`);
            // You can do more things here, such as setting permissions for the new channel, etc.
        } catch (error) {
            console.error(`Error creating channel: ${error.message}`);
        }
    },
    
};