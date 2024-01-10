const { ApplicationCommandType, ChannelType, PermissionFlagsBits, InteractionType, EmbedBuilder } = require("discord.js");
const { Bot } = require("../../../handlers/Client");
const { connectDB } = require("../../../models/connect");

module.exports = {
    name: "group",
    description: 'Group management.',
    userPermissions: PermissionFlagsBits.SendMessages,
    botPermissions: PermissionFlagsBits.Administrator,
    category: "Misc",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'groupname',
            description: 'your group name please enther this if u use adduser.',
            type: 3,
            required: true,
        },
        {
            name: 'create',
            description: 'create new group.',
            type: 3,
            required: false,
        },
        {
            type: 6,
            name: 'adduser',
            description: 'add user to your group.',
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


        const optionNames = ['create', 'adduser', 'rename', 'delete_group'];
        console.log(interaction.options);
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
            var categoryId;

            const result = await (await connectDB()).findOne({ channelId: interaction.guild.id })
            if (!await result.categoryId) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('Teacher not set somting Role.')
                            .setColor("Red")
                    ]
                });
                return
            } else {
                categoryId = result.categoryId;
            }

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

                // `Channel <#${new_group_name.id}> and role <@&${new_role.id}> are created!`
                const result = await (await connectDB()).findOne({ channelId: interaction.guild.id })
                if (result) {
                    await (await connectDB()).updateOne({ channelId: interaction.guild.id }, {
                        $set: {
                            [group_name]:
                            {
                                userId: { head: interaction.user.id }
                            }
                        }
                    });
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
                } else {
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle('Create Fail')
                                .setColor('#FF0000')
                        ]
                    });
                }
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
            const userOption = await interaction.options.getUser('adduser');
            const user = userOption;
            const result = await (await connectDB()).findOne({ channelId: interaction.guild.id });
            const groupName = interaction.options.get('groupname').value;
            if (!groupName) {
                interaction.reply("Please Enther Group Name!!")
                return
            }
            const roleData = await result[groupName]

            if (userOption.id && roleData) {
                const role = interaction.guild.roles.cache.find(role => role.name === groupName);
                try {
                    await interaction.guild.members.fetch(user.id).then(member => {
                        member.roles.add(role);
                        client.sendEmbed(interaction, `Added role ${role.name} to user ${user.tag}`);
                    });
                } catch (err) {
                    client.sendEmbed(interaction, `Fail: ${err}`);
                    return
                }
            } else {
                client.sendEmbed(interaction, "Role Name Not Found!!")
                return
            }
        }
        else if (chosenOption.name == 'rename') {
            const groupName = interaction.options.get('groupname').value;
            const changeName = interaction.options.get('rename').value;

            try {
                const db = await connectDB();
                const result = await db.findOne({ channelId: interaction.guild.id });
                if (result[groupName]) {
                    result[changeName] = result[groupName];
                    delete result[groupName];
                    await db.updateOne({ channelId: interaction.guild.id }, { $set: result });

                    const group = await interaction.guild.channels.cache.find(ch => ch.name === groupName);
                    if (group) {
                        group.setName(changeName).then(updatedChannel => {
                            client.sendEmbed(interaction, `Changed channel **${groupName}** to **${updatedChannel.name}** successfully!`);
                        }).catch(err => {
                            client.sendEmbed(interaction, `Fail to change channel: ${err}`);
                        });
                    } else {
                        client.sendEmbed(interaction, `Channel **${groupName}** not found!`);
                    }

                    const role = await interaction.guild.roles.cache.find(groupName);
                    if (role) {
                        role.setName(changeName).then(updatedRole => {
                            client.sendEmbed(interaction, `Changed role **${groupName}** to **${updatedRole.name}** successfully!`);
                        }).catch(err => {
                            client.sendEmbed(interaction, `Fail to change role: ${err}`);
                        });
                    } else {
                        client.sendEmbed(interaction, `Role **${groupName}** not found!`);
                    }
                  
                } else {
                    client.sendEmbed(interaction, `1Fail Change ${err}`);
                    return
                }
            } catch (err) {
                client.sendEmbed(interaction, `2Fail Change ${err}`);
                return
            }

        } else if (chosenOption.name == 'delete_group') {
            const require = interaction.options.get('delete_group').value;
            const name = interaction.options.get('groupname').value;
            if (require) {
                try {
                    const result = (await connectDB()).findOne({channelId: interaction.guild.id})
                    delete result[name]
                    client.sendEmbed(interaction , "Sussecc Remove out database!")
                }catch (e) {
                    client.sendEmbed(interaction , "Some Thing Wrong!!")
                }
            }
        } else {
            return client.sendEmbed(interaction, {
                title: 'Error 404',
                description: 'please contact your teacher for fix it!',
                color: '#ED4245',
            });
        }
    }
};