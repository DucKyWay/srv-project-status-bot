const { Message, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { Bot } = require("../../../handlers/Client");
const internal = require("stream");
const { embed } = require("../../../settings/config");

module.exports = {
  name: "ping",
  description: "Play Pingpong with bot.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Misc",
  cooldown: 5,
  /**
   *
   * @param {Bot} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    message.reply(`🏓 Pong : \`${client.ws.ping}\``)
  }
};