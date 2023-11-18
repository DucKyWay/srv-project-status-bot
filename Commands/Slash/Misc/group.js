const { ApplicationCommandType, ChannelType, PermissionFlagsBits,InteractionType } = require("discord.js");
const { Bot } = require("../../../handlers/Client");

module.exports = {
    name: "group",
    description: 'Group management.',
    userPermissions: PermissionFlagsBits.SendMessages,
    botPermissions: PermissionFlagsBits.Administrator,
    category: "Misc",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'create',
            description: 'create new group.',
            type: 3,
            required: false,
        },
        {
            name: 'adduser',
            description: 'add user to your group.',
            type: 3,
            required: false,
        },
        {
            name: 'rename',
            description: 'rename your group name.',
            type: 3,
            required: false,
        },
    ],

    run: async (client, interaction,guild) => {
        const optionNames = ['create', 'adduser', 'rename'];
        let chosenOption = null;
    
        for (const optionName of optionNames) {
            const currentOption = interaction.options.get(optionName);
            if (currentOption) {
                chosenOption = currentOption;
                break;
            }
        }
    
        if (!chosenOption) {
            return interaction.reply('Please choose an option.');
        }

        if (chosenOption.name == 'create') {
            const namechannel = interaction.options.get('create').value;
            console.log(namechannel);
            const newChannel = await interaction.guild.channels.create({
                name: namechannel,
                type:  ChannelType.GuildText,
              });
        }
        else if (chosenOption.name == 'adduser') {
            return "Add user to group."
        }
        else if (chosenOption.name == 'rename') {
            return "Rename your group."
        } else {
            return client.sendEmbed(interaction,{
                title: 'Error 404',
                description: 'please contact your teacher for fix it!',
                color: '#ED4245',
            });
        }
    },
    
};
