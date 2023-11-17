const { Colors } = require("discord.js");
require('dotenv').config();

module.exports = {
  TOKEN: process.env.DISCORD_TOKEN || "",
  PREFIX: process.env.PREFIX || "",
  Slash: {
    Global: false,
    GuildID: process.env.GuildID || "",
  },
  embed: {
    color: Colors.Blurple,
    wrongColor: Colors.Red,
  },

  emoji: {
    success: "✅",
    error: "❌",
  },
};
