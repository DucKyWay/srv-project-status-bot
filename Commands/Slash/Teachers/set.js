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
            required: false,
        },
        {
            name: 'addcatoegory',
            description: 'add category channel in server for student create channel teammate group.',
            type: 3,
            required: false,
        },
        {
            name: 'changecatoegoryname',
            description: 'change category name channel in server for student create channel teammate group.',
            type: 3,
            required: false,
        },
        {
            name: 'testerror',
            description: 'test',
            type: 3,
            required: false,
        }
    ],

    run: async (client, interaction,guild) => {
        const optionNames = ['setcategory', 'addcategory', 'changecategoryname','testerror'];
        let chosenOption = null;
    
        for (const optionName of optionNames) {
            const currentOption = interaction.options.get(optionName);
            if (currentOption) {
                chosenOption = currentOption;
                break;
            }
        }
    
        if (!chosenOption) {
            // No option was chosen
            return interaction.reply('Please choose an option.');
        }

        if (chosenOption.name == 'setcategory') {
            
        }
        else if (chosenOption.name == 'addcategory') {

        }
        else if (chosenOption.name == 'changecategoryname') {

        }else {
            return client.sendEmbed(interaction,{
                title: 'Error 404',
                description: 'please contact your teacher for fix it!',
                color: '#ED4245',
            });
        }
    },
    
};
