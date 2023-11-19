const { ApplicationCommandType, PermissionFlagsBits, InteractionType, ButtonStyle, EmbedBuilder, ButtonBuilder, ActionRowBuilder, RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require("discord.js");
const client = require("../../..");
const fs = require('fs');
const { emoji } = require("../../../settings/config");

module.exports = {
    name: "set",
    description: 'set Category Channel or set Verify channels in your server discord.',
    userPermissions: PermissionFlagsBits.Administrator,
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
        // ////////////////////////////////////////////////////////////////////////
        // //////////////////////////// /set only  ////////////////////////////////
        // ////////////////////////////////////////////////////////////////////////   
        if (!chosenOption) {
            fs.readFile('./data/data.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading data.json:', err);
                    return;
                }

                const guildId = interaction.guild.id;

                // Parse JSON data
                const jsonData = JSON.parse(data);

                // Update the teacher role for the corresponding guild
                if (!jsonData[guildId]) {
                    jsonData[guildId] = {};
                }

                try {
                    var studentRole = jsonData[guildId].studentRole;
                    var teacherRole = jsonData[guildId].teacherRole;
                    var category = jsonData[guildId].categoryId;
                } catch {
                    var studentRole = undefined;
                    var teacherRole = undefined;
                    var category = undefined;
                }

                if (studentRole) {
                    studentRole = `<@&${studentRole}>`
                } else {
                    studentRole = '`No Role`'
                }
                if (teacherRole) {
                    teacherRole = `<@&${teacherRole}>`
                } else {
                    teacherRole = '`No Role`'
                }
                if (category) {
                    category = `<#${category}>`
                } else {
                    category = '`No Role`'
                }

                const embedbuilder = new EmbedBuilder()
                    .setTitle('Setting Bot')
                    .setColor('Gold')
                    .setThumbnail('https://i.pinimg.com/236x/3d/1f/0d/3d1f0d9c7a02cf3ac22b47a99b29aa99.jpg')
                    .setDescription('setting your bot for student create group and make onther this with bot.')
                    .setFields(
                        { name: 'Role Student', value: `${studentRole}`, inline: true },
                        { name: 'Role Teacher', value: `${teacherRole}`, inline: true },
                        { name: 'Category Select', value: `${category}`, inline: true },
                    )
                    .setTimestamp()

                const selectMenu = new ChannelSelectMenuBuilder()
                    .setCustomId('selectcategory')
                    .setPlaceholder('Select Your Category.')
                    .setChannelTypes(4)
                    .setMaxValues(1)

                const selectMenu2 = new RoleSelectMenuBuilder()
                    .setCustomId('selectTeacherRole')
                    .setPlaceholder('Select Your Teacher Role.')
                    .setMaxValues(1)

                const selectMenu3 = new RoleSelectMenuBuilder()
                    .setCustomId('selectStudentRole')
                    .setPlaceholder('Select Your StudentRole.')
                    .setMaxValues(1)

                const buttons = new ButtonBuilder()
                    .setLabel('Confirm!')
                    .setStyle(3)
                    .setCustomId('confirm')
                    .setEmoji(emoji.success)

                // Action row with both button and select menu components
                const rowButton = new ActionRowBuilder().addComponents(buttons);
                const rowSelectMenu = new ActionRowBuilder().addComponents(selectMenu);
                const rowSelectMenu2 = new ActionRowBuilder().addComponents(selectMenu2);
                const rowSelectMenu3 = new ActionRowBuilder().addComponents(selectMenu3);

                interaction.reply({
                    embeds: [embedbuilder],
                    components: [rowSelectMenu, rowSelectMenu2, rowSelectMenu3, rowButton],
                    // ephemeral: true
                })
            })
            // ////////////////////////////////////////////////////////////////////////
            // //////////////////// chosenOption Name Check ///////////////////////////
            // ////////////////////////////////////////////////////////////////////////   
        } else {
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
                                    .setTitle(`category Id has been updated`)
                                    .setColor('Yellow')
                                    .setFields(
                                        {name: 'Category', value: `<#${categoryId}>` , inline: true}
                                        ) 
                            ],
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
                                    .setTitle(`student Role Id  has been updated`)
                                    .setColor('Yellow')
                                    .setFields(
                                        {name: 'Student Role', value: `<@&${studentRoleId}>` , inline: true},
                                        ) 
                            ],

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
                                    .setTitle(`teacher Role Id has been updated`)
                                    .setColor('Yellow')
                                    .setFields(
                                        {name: 'Teacher Role', value: `<@&${teacherRoleId}>` , inline: true},
                                        ) 
                            ],
                        })
                    });
                });
                // ////////////////////////////////////////////////////////////////////////
                // //////////////////// Else print Error Contact ///////////////////////////
                // ////////////////////////////////////////////////////////////////////////   
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
        }
    },
};

// ////////////////////////////////////////////////////////////////////////
// ///////// interaction Detect buttons and select menu //////////////////
// ////////////////////////////////////////////////////////////////////////   

var categoryId
var studentRoleId
var teacherRoleId
let lastReplyId = null;

client.on('interactionCreate', async interaction => {
    const collectorFilter = i => i.user.id === interaction.user.id;
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
                                    ],

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

                                })
                            }
                        } else {
                            console.error(`Guild with ID ${guildId} not found.`);
                        }
                    } else {
                        console.error(`No data found for guild with ID ${guildId}.`);
                    }
                });
                // selectStudentRole selectTeacherRole selectcategory
            } else if (customId == 'confirm') {
                interaction.deferUpdate().then(() => {
                    fs.readFile('./data/data.json', 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading data.json:', err);
                            return;
                        }

                        const guildId = interaction.guild.id;

                        // Parse JSON data
                        const jsonData = JSON.parse(data);

                        // Update the teacher role for the corresponding guild
                        if (!jsonData[guildId]) {
                            jsonData[guildId] = {};
                        }

                        jsonData[guildId].studentRole = studentRoleId;
                        jsonData[guildId].teacherRole = teacherRoleId;
                        jsonData[guildId].categoryId = categoryId;

                        // Convert the updated data to JSON string
                        const updatedData = JSON.stringify(jsonData, null, 2);

                        // Write the updated data back to data.json
                        fs.writeFile('./data/data.json', updatedData, 'utf8', (writeErr) => {
                            if (writeErr) {
                                console.error('Error writing data.json:', writeErr);
                                return;
                            }
                            console.log(`studentRoleId [${studentRoleId} ${teacherRoleId} ${categoryId}] has been updated and written to data.json`);

                            // ใช้ interaction.followUp สำหรับการส่งข้อความใหม่
                            interaction.editReply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setTitle(`ALL Role And Id has been Update!!`)
                                        .setColor('Yellow')
                                        .setFields(
                                            {name: 'Student Role', value: `<@&${studentRoleId}>` , inline: true},
                                            {name: 'Teacher Role', value: `<@&${teacherRoleId}>` , inline: true},
                                            {name: 'Category', value: `<#${categoryId}>` , inline: true}
                                            ) 
                                ],
                                components: [],
                            }).then((reply) => {
                                // Delete the last interaction message if there was a previous reply
                                if (lastReplyId) {
                                    interaction.channel.messages.fetch(lastReplyId).then((msg) => msg.delete());
                                }
                                // Store the ID of the current reply for future deletion
                                lastReplyId = reply.id;
                            });
                        });
                    });
                });
            }
        }

    } if (interaction.isAnySelectMenu()) {
        try {
            const customId = interaction.customId;

            const selectedValues = interaction.values;
            const selectId = selectedValues[0];
            await interaction.deferUpdate();
            console.log("Selected Role ID:", selectId);

            if (customId == "selectcategory") {
                categoryId = selectId
            }
            if (customId == "selectTeacherRole") {
                teacherRoleId = selectId
            }
            if (customId == "selectStudentRole") {
                studentRoleId = selectId
            }

        } catch (e) {
            console.log(e)
        }
    }
});