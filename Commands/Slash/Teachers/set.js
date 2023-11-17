const { ApplicationCommandType, ChannelType, PermissionFlagsBits,InteractionType } = require("discord.js");
const { Bot } = require("../../../handlers/Client");

module.exports = {
    name: "set",
    description: 'set Category Channel or set Verify channels in your server discord.',
    userPermissions: PermissionFlagsBits.SendMessages,
    botPermissions: PermissionFlagsBits.Administrator,
    category: "Misc",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'setcategory',
            description: 'set category channel in server for student create channel teammate group.',
            type: 3,
            required: true,
        },
        {
            name: 'addcatoegory',
            description: 'add category channel in server for student create channel teammate group.',
            type: 3,
            required: true,
        },
        {
            name: 'changecatoegoryname',
            description: 'change category name channel in server for student create channel teammate group.',
            type: 3,
            required: true,
        }
    ],

    run: async (client, interaction,guild) => {
        
    },
    
};
