const { Client, Intents, Partials } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.MESSAGE_CONTENT, Intents.FLAGS.GUILD_SCHEDULED_EVENTS, Intents.FLAGS.AUTO_MODERATION_CONFIGURATION, Intents.FLAGS.AUTO_MODERATION_EXECUTION],
  partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "GUILD_SCHEDULED_EVENT"],
  shards: "auto"
});
const config = require("./src/config.js");
const { readdirSync } = require("node:fs")

let token = config.token

readdirSync("./src/utils").map(async (file) => {
  const util = await require(`./src/utils/${file}`);
  util.execute(client);
});

client.login(token)
