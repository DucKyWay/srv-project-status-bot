const { ApplicationCommandType, ChannelType, PermissionFlagsBits, InteractionType, ButtonStyle, Colors } = require("discord.js");
const { Bot } = require("../../../handlers/Client");
const client = require("../../..");
const internal = require("stream");
const { log } = require("console");

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
            name: 'set-role-teacher',
            description: 'set your teacher role for bot contact us!',
            type: 8,
            required: false,
        },
        {
            name: 'testerror',
            description: 'test',
            type: 3,
            required: false,
        }
    ],

    run: async (client, interaction, guild) => {
        const optionNames = ['setcategory','set-role-teacher', 'testerror'];
        let chosenOption = null;
        
        for (const optionName of optionNames) {
            const currentOption = interaction.options.get(optionName);
            if (currentOption) {
                chosenOption = currentOption;
                break;
            }
        }

        if (!chosenOption) {

        }



        if (chosenOption.name == 'setcategory') {

        }else if (chosenOption.name == 'set-role-teacher') {

            

        }else {

            return client.sendEmbed(interaction, {
                title: 'Error 404',
                description: 'please contact your teacher for fix it!',
                color: '#ED4245',
                buttons: [{
                    label: 'Call Teacher',
                    style: ButtonStyle.Danger,
                    customId: 'callcenter'
                }]
            }

            );
        }
    },    
};

client.on('interactionCreate', (interaction) => {
    if (interaction.type == InteractionType.MessageComponent && interaction.isButton()) {
        const customId = interaction.customId;
        if (customId) {
          if (customId == 'callcenter') {
            
          }
        }
    }
});