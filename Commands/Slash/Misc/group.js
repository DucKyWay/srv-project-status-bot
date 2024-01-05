const { ApplicationCommandType, ChannelType, PermissionFlagsBits, InteractionType, EmbedBuilder } = require("discord.js");
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
        {
            name: 'delete_group',
            description: 'delete your group name.',
            type: 5,
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

            const optionNames = ['create', 'adduser', 'rename', 'delete_group'];
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
                    
                    // Write data to json file.
                    await writeData(interaction, ['group', new_group_name.id], {});
                    await writeData(interaction , ['group',  new_group_name.id , 'roleId'] , new_role.id);
                    await writeData(interaction , ['group',  new_group_name.id , 'headId'] , interaction.user.id);

                    // `Channel <#${new_group_name.id}> and role <@&${new_role.id}> are created!`
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle('Create Success')
                                .setColor('Green')
                                .setFields(
                                    { name: 'Group Name', value: `<#${new_group_name.id}>`, inline: true },
                                    { name: 'Your Role Name', value: `<@&${new_role.id}> `, inline: true },
                                )
                        ]
                    });

                } catch (error) {
                    console.error(error);
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle('Failed to create channel and role.')
                                .setColor("Red")
                        ]
                    });
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
            } else if (chosenOption.name == 'delete_group') {
                const require = interaction.options.get('delete_group').value;
                if (require) {
                    
                }
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

const getData = (( i , path) => {
    fs.readFile('data/data.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        if (path) {
            const guildId = i.guild.id;

            const jsonData = JSON.parse(data);

            if (!jsonData[guildId]) {
                jsonData[guildId] = {};
            }

            const result = jsonData[guildId][path];
            return result;
        } else {
            return;
        }
    });
});

const writeData = async (interaction, path, data) => {
    try {
        const filePath = 'data/data.json';

        // Read the existing data from the file
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const parsedData = JSON.parse(jsonData);

        const guildId = interaction.guild.id;

        // Ensure the path exists in the JSON structure
        let currentLevel = parsedData[guildId];
        for (const level of path.slice(0, -1)) {
            if (!currentLevel[level]) {
                currentLevel[level] = {};
            }
            currentLevel = currentLevel[level];
        }

        // Set the data at the specified path
        currentLevel[path[path.length - 1]] = data;

        // Write the updated data back to the file
        fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), 'utf-8');

        console.log(`Data ${data} has been updated and written to data.json`);
        return true;
    } catch (error) {
        console.error('Error writing data.json:', error);
        return false;
    }
};