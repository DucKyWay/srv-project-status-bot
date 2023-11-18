const { ApplicationCommandType, ChannelType, PermissionFlagsBits, InteractionType, ButtonStyle, Colors, EmbedBuilder } = require("discord.js");
const { Bot } = require("../../../handlers/Client");
const client = require("../../..");
const internal = require("stream");
const { log } = require("console");
const fs = require('fs');

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
            type: 7,
            required: false,
        },
        {
            name: 'setteacherrole',
            description: 'set your teacher role for bot contact us!',
            type: 8,
            required: false,
        },
        {
            name: 'setstudentrole',
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
        const optionNames = ['setcategory', 'setteacherrole', 'setstudentrole', 'testerror'];
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

            fs.readFile('./data/data.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading data.json:', err);
                    return;
                }

                const guildId = interaction.guild.id;
                const categoryId = interaction.options.get('setcategory').value;

                // Parse JSON data
                const jsonData = JSON.parse(data);

                // Update the teacher role for the corresponding guild
                if (!jsonData[guildId]) {
                    jsonData[guildId] = {};
                }

                jsonData[guildId].categoryId = categoryId;

                // Convert the updated data to JSON string
                const updatedData = JSON.stringify(jsonData, null, 2);

                // Write the updated data back to data.json
                fs.writeFile('./data/data.json', updatedData, 'utf8', (writeErr) => {
                    if (writeErr) {
                        console.error('Error writing data.json:', writeErr);
                        return;
                    }
                    console.log(`categoryId [${categoryId}] has been updated and written to data.json`);
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setTitle(`categoryId [${categoryId}] has been updated`)
                            .setColor('Yellow')
                        ],
                        ephemeral: true,
                    })
                });
            });
        } else if (chosenOption.name == 'setstudentrole') {

            fs.readFile('./data/data.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading data.json:', err);
                    return;
                }

                const guildId = interaction.guild.id;
                const studentRoleId = interaction.options.get('setstudentrole').value;

                // Parse JSON data
                const jsonData = JSON.parse(data);

                // Update the teacher role for the corresponding guild
                if (!jsonData[guildId]) {
                    jsonData[guildId] = {};
                }

                jsonData[guildId].studentRole = studentRoleId;

                // Convert the updated data to JSON string
                const updatedData = JSON.stringify(jsonData, null, 2);

                // Write the updated data back to data.json
                fs.writeFile('./data/data.json', updatedData, 'utf8', (writeErr) => {
                    if (writeErr) {
                        console.error('Error writing data.json:', writeErr);
                        return;
                    }
                    console.log(`studentRoleId [${studentRoleId}] has been updated and written to data.json`);
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setTitle(`studentRoleId [${studentRoleId}] has been updated`)
                            .setColor('Yellow')
                        ],
                        ephemeral: true,
                    })
                });
            });

        } else if (chosenOption.name == 'setteacherrole') {
            // อ่านไฟล์ data.json
            fs.readFile('./data/data.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading data.json:', err);
                    return;
                }

                const guildId = interaction.guild.id;
                const teacherRoleId = interaction.options.get('setteacherrole').value;

                // Parse JSON data
                const jsonData = JSON.parse(data);

                // Update the teacher role for the corresponding guild
                if (!jsonData[guildId]) {
                    jsonData[guildId] = {};
                }

                jsonData[guildId].teacherRole = teacherRoleId;

                // Convert the updated data to JSON string
                const updatedData = JSON.stringify(jsonData, null, 2);

                // Write the updated data back to data.json
                fs.writeFile('./data/data.json', updatedData, 'utf8', (writeErr) => {
                    if (writeErr) {
                        console.error('Error writing data.json:', writeErr);
                        return;
                    }
                    console.log(`teacherRoleId [${teacherRoleId}] has been updated and written to data.json`);
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setTitle(`teacherRoleId [${teacherRoleId}] has been updated`)
                            .setColor('Yellow')
                        ],
                        ephemeral: true,
                    })
                });
            });

        } else {

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

client.on('interactionCreate', interaction => {
    if (interaction.type == InteractionType.MessageComponent && interaction.isButton()) {
        const customId = interaction.customId;
        if (customId) {
            if (customId == 'callcenter') {
                // อ่านไฟล์ data.json

                fs.readFile('./data/data.json', 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading data.json:', err);
                        return;
                    }

                    // Parse JSON data
                    const jsonData = JSON.parse(data);

                    // เลือก guildId ที่ต้องการ
                    const guildId = interaction.guild.id; // แทนด้วย guildId ที่คุณต้องการ

                    // ตรวจสอบว่ามีข้อมูลของ guild นี้หรือไม่
                    if (jsonData[guildId]) {
                        const teacherRoleId = jsonData[guildId].teacherRole;

                        // ดึงข้อมูลจาก guild นี้
                        const guild = client.guilds.cache.get(guildId);
                        if (guild) {

                            // ดึงข้อมูลสมาชิกที่มี role ID เป็น teacherRoleId
                            const membersWithRole = guild.members.cache.filter(member => member.roles.cache.has(teacherRoleId));

                            // พิมพ์ข้อมูลสมาชิกที่มี role ที่ต้องการ
                            if (membersWithRole.size == 0) {
                                console.log(`No Teacher`)
                                interaction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setTitle('No Teacher Please Try Again Later!!')
                                    ]
                                })
                            } else {

                                const teachers = membersWithRole.map(member => {
                                    console.log(`Member ID: ${member.id}, Username: ${member.user.username}`);
                                    return { name: member.user.username, value: `<@${member.id}>` };
                                });
                                interaction.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setTitle('Contact Teacher')
                                            .setDescription('Click on the teacher\'s name to initiate a direct message.')
                                            .addFields(teachers.filter(teacher => teacher.name && teacher.value))
                                    ],
                                    ephemeral: true,
                                })
                            }
                        } else {
                            console.error(`Guild with ID ${guildId} not found.`);
                        }
                    } else {
                        console.error(`No data found for guild with ID ${guildId}.`);
                    }
                });
            }
        }
    }
});