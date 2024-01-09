const { ApplicationCommandType, ChannelType, PermissionFlagsBits, InteractionType, EmbedBuilder } = require("discord.js");
const { Bot } = require("../../../handlers/Client");
const { Server } = require('http');
const { connectDB, connectDBS } = require("../../../models/connect");
let sendCount = 0;

module.exports = {
    name: "send",
    description: 'send project to teacher.',
    userPermissions: PermissionFlagsBits.SendMessages,
    botPermissions: PermissionFlagsBits.Administrator,
    category: "Misc",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'comment',
            description: 'comment to teacher.',
            type: 3,
            require: true,
        },
        {
            name: 'file',
            description: 'your file require (.pdf .zip and onther compress file.)',
            type: 11,
            required: false,
        },
        {
            name: 'link',
            description: 'add your work link to this',
            type: 3,
            require: false,
        }
    ],

    run: async (client, interaction, guild) => {

        if (interaction) {
            // Assuming the file path is in interaction.options.getString('file')
            const filePath = interaction.options.get('file');
            const link = interaction.options.get('link');
            const comment = interaction.options.get('comment').value;
            const data = filePath ? filePath.attachment.attachment : link.value

            console.log(data)

            const nameFile = filePath ? filePath.attachment.name : link.name;

            (await connectDBS()).insertOne({ channelId: interaction.guild.id, userId: interaction.user.id, sendData: { fileName: nameFile, file: data, comment: comment }, timestamp: Date.now() }).then((data) => {
                console.log('Data add to database now!')
            
                client.sendEmbed(interaction, `ID: ${data.insertedId}`);
                sendCount++;
            })
        }
    }
}