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
            const group_name = interaction.options.get('create').value;
            const role_name = interaction.options.get('create').value;
            const role_color = '#ffeb00';
            const member = interaction.member;

            try {
                const new_group_name = await interaction.guild.channels.create({
                    name: group_name,
                    parent: "1174916854553260082",
                    type: ChannelType.GuildText,
                });

                const new_role = await interaction.guild.roles.create({
                    name: role_name,
                    color: role_color
                });

                await member.roles.add(interaction.guild.roles.cache.find(r => r.name === role_name));
                await interaction.reply(`Channel <#${new_group_name.id}> and role <@&${new_role.id}> are created!`);
            } catch (error) {
                console.error(error);
                await interaction.reply('Failed to create channel and role.');
            }
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
