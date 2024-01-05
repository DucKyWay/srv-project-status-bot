const { ApplicationCommandType, ChannelType, PermissionFlagsBits, InteractionType, EmbedBuilder } = require("discord.js");
const { Bot } = require("../../../handlers/Client");
const { Server } = require('http');
const fs = require('fs');

const httpServer = new Server();
const io = require('socket.io')(httpServer);
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
            name: 'file',
            description: 'your file require (.pdf .zip and onther compress file.)',
            type: 11,
            required: true,
        }
    ],

    run: async (client, interaction, guild) => {

        if (interaction) {
            // Assuming the file path is in interaction.options.getString('file')
            const filePath = interaction.options.get('file');
            console.log(filePath.attachment.attachment)

            const savePath = 'data/sendData/' + filePath.attachment.name;
            if (!fs.existsSync('data/sendData/')) {
                fs.mkdirSync('data/sendData/');
            }

            const fileBuffer = Buffer.from(filePath.attachment.attachment, 'binary');
            fs.writeFileSync(savePath, fileBuffer, 'binary');

            interaction.reply(`File saved to ${savePath}`);
            sendCount++;

            // ส่งข้อมูลไปยัง WebSocket เมื่อมีการใช้คำสั่ง "send"
            io.emit('updateSendCount', { sendCount });
        }
    }
}