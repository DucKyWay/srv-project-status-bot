const { ApplicationCommandType, PermissionFlagsBits, InteractionType, ButtonStyle, EmbedBuilder, ButtonBuilder, ActionRowBuilder, RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require("discord.js");
const client = require("../../..");
const fs = require('fs');
const { emoji } = require("../../../settings/config");
const { connectDB } = require('../../../models/connect')

module.exports = {
    name: "set",
    description: 'set Category Channel or set Verify channels in your server discord.',
    userPermissions: PermissionFlagsBits.Administrator,
    botPermissions: PermissionFlagsBits.Administrator,
    category: "Misc",
    type: ApplicationCommandType.ChatInput,

    run: async (client, interaction, guild) => {
        let chosenOption = null;

        // ////////////////////////////////////////////////////////////////////////
        // //////////////////////////// /set only  ////////////////////////////////
        // ////////////////////////////////////////////////////////////////////////   
        if (!chosenOption) {
            const result = await (await connectDB()).findOne({ channelId: interaction.guild.id})

            var studentRole = undefined;
            var teacherRole = undefined;
            var category = undefined;

            if (! result) {
                (await connectDB()).updateOne({ channelId: interaction.guild.id }, {
                    $set: {
                        studentRoleId: {},
                        teacherRoleId: {},
                        categoryId: {}
                    }
                })
                console.log('add Role on database')
            } else {
                studentRole = result.studentRoleId;
                teacherRole = result.teacherRoleId;
                category = result.categoryId;
                console.log('add Role to display')
            }

            if (await studentRole) {
                studentRole = `<@&${await studentRole}>`
            } else {
                studentRole = '`No Role`'
            }
            if (await teacherRole) {
                teacherRole = `<@&${await teacherRole}>`
            } else {
                teacherRole = '`No Role`'
            }
            if (await category) {
                category = `<#${await category}>`
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
        }
    }
};

// ////////////////////////////////////////////////////////////////////////
// ///////// interaction Detect buttons and select menu //////////////////
// ////////////////////////////////////////////////////////////////////////   

var categoryId
var studentRoleId
var teacherRoleId
let lastReplyId = null;

client.on('interactionCreate', async interaction => {
    if (interaction.type == InteractionType.MessageComponent && interaction.isButton()) {
        const customId = interaction.customId;
        if (customId == 'confirm') {
            interaction.deferUpdate().then(async () => {
                (await connectDB()).updateOne({ channelId: interaction.guild.id }, {
                    $set: {
                        studentRoleId: studentRoleId,
                        teacherRoleId: teacherRoleId,
                        categoryId: categoryId
                    }
                })
                console.log(`studentRoleId [${studentRoleId} ${teacherRoleId} ${categoryId}] has been updated and written to database`);

                // ใช้ interaction.followUp สำหรับการส่งข้อความใหม่
                interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`ALL Role And Id has been Update!!`)
                            .setColor('Yellow')
                            .setFields(
                                { name: 'Student Role', value: `<@&${studentRoleId}>`, inline: true },
                                { name: 'Teacher Role', value: `<@&${teacherRoleId}>`, inline: true },
                                { name: 'Category', value: `<#${categoryId}>`, inline: true }
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
        }
    }
    if (interaction.isAnySelectMenu()) {
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