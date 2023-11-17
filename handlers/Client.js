const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  EmbedBuilder,
} = require("discord.js");
const { title } = require("process");

class Bot extends Client {
  constructor() {
    super({
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
      ],
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
      shards: "auto",
      failIfNotExists: false,
      allowedMentions: {
        parse: ["everyone", "roles", "users"],
        users: [],
        roles: [],
        repliedUser: false,
      },
    });

    // global variables
    this.config = require("../settings/config");
    this.scommands = new Collection();
    this.mcommands = new Collection();
    this.cooldowns = new Collection();
    this.events = 0;
  }

  async build(token) {
    await loadHandlers(this);
    this.login(token);
  }

  sendEmbed(interaction, data) {
    if (interaction.deferred) {
      interaction
        .followUp({
          embeds: [
            new EmbedBuilder()
              .setColor(this.config.embed.color)
              .setDescription(`${data.substring(0, 3000)}`),
          ],
        })
        .catch((e) => { });
    } else {
      const embedBuilder = new EmbedBuilder()
        .setColor(`${data['color'] ? data['color'] : this.config.embed.color}`)
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.avatarURL({ extension: 'jpg' }),
        })
        .setTitle(`${data['title'] ? data['title'].substring(0, 3000) : data}`)
        .setDescription(`${data['description'] ? data['description'].substring(0, 3000) : ''}`);

      // Check if data['URL'] is not null before setting it
      if (data['URL'] !== null) {
        embedBuilder.setURL(data['URL']);
      }
      if (data['Thumbnail'] !== null) {
        embedBuilder.setThumbnail(data['Thumbnail']);
      }

      interaction
        .reply({
          embeds: [embedBuilder],
        })
        .catch((e) => { });
    }
  }


  getFooter(user) {
    return {
      text: `Requested By ${user.username}`,
      iconURL: user.displayAvatarURL(),
    };
  }
}

module.exports = { Bot };

function loadHandlers(client) {
  ["handler"].forEach((file) => {
    require(`./${file}`)(client);
  });
}
