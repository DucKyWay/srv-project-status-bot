const { ApplicationCommandType, ChannelType, PermissionFlagsBits, InteractionType } = require("discord.js");
const { Bot } = require("../../../handlers/Client");
const fs = require('fs');
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

    run: async (client, interaction, guild) => {
        fs.readFile('./data/data.json', 'utf8', async (err, data) => {
            if (err) {
                console.error('Error reading data.json:', err);
                return;
            }

            const guildId = interaction.guild.id;

            const jsonData = JSON.parse(data);

            if (!jsonData[guildId]) {
                jsonData[guildId] = {};
            }

            const categoryId = jsonData[guildId].categoryId

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
                        parent: categoryId.toString(),
                        type: ChannelType.GuildText,
                    });

                    const new_role = await interaction.guild.roles.create({
                        name: role_name,
                        color: role_color,
                    });

                    await member.roles.add(interaction.guild.roles.cache.find(r => r.name === role_name));

                    await interaction.reply(`Channel <#${new_group_name.id}> and role <@&${new_role.id}> are created!`);
                } catch (error) {
                    console.error(error);
                    await interaction.reply('Failed to create channel and role.');
                }
            }
            else if (chosenOption.name == 'adduser') {
                // const user_tagged = interaction.options.getUser('adduser');
                // const add_role = interaction.options.getString('some role'); 

                // if (!user_tagged || !add_role) {
                //     return interaction.reply({ content: "Please specify a user and a role.", ephemeral: true });
                // }
                // const role = interaction.guild.roles.cache.find(r => r.name === add_role);

                // if (!role) {
                //     return interaction.reply({ content: "Role not found.", ephemeral: true });
                // }
                // const member = interaction.guild.members.cache.get(user_tagged.id);

                // if (!member) {
                //     return interaction.reply({ content: "Member not found.", ephemeral: true });
                // }

                // try {
                //     await member.roles.add(role);
                //     await interaction.reply({ content: `Role ${role.name} added to ${member.displayName}.`, ephemeral: true });
                // } catch (error) {
                //     console.error(error);
                //     await interaction.reply({ content: "Failed to add role.", ephemeral: true });
                // }
                // return "Add user to your group."
            }
            else if (chosenOption.name == 'rename') {
                return "Rename your group."
            } else {
                return client.sendEmbed(interaction, {
                    title: 'Error 404',
                    description: 'please contact your teacher for fix it!',
                    color: '#ED4245',
                });
            }
        })
    }
};
