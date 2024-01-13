import { Client, Collection, Intents } from "discord.js";
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.MESSAGE_CONTENT, Intents.FLAGS.GUILD_SCHEDULED_EVENTS, Intents.FLAGS.AUTO_MODERATION_CONFIGURATION, Intents.FLAGS.AUTO_MODERATION_EXECUTION],
  partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "GUILD_SCHEDULED_EVENT"],
  shards: "auto"
});
import config from "./src/config.js";
import { readdirSync } from "node:fs";
import moment from "moment";

let token = config.token

client.commands = new Collection()
client.commandAliases = new Collection()
client.slashCommands = new Collection()
client.slashDatas = []

const rest = new REST({ version: '9' }).setToken(token);

function log(message) {
  console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${message}`);
};
client.log = log

// Command Handler
const commandFolders = readdirSync("./src/commands");

Promise.all(commandFolders.map(async (category) => {
  const commandFiles = await readdirSync(`./src/commands/${category}`);

  await Promise.all(commandFiles.map(async (file) => {
    const commands = await import(`./src/commands/${category}/${file}`);

    if (commands) {
      if (commands.prefix) {
        // Prefix Command
        const prefixCommand = commands.prefix;
        client.commands.set(prefixCommand.name, prefixCommand);

        if (prefixCommand.aliases && Array.isArray(prefixCommand.aliases)) {
          prefixCommand.aliases.forEach(alias => {
            client.commandAliases.set(alias, prefixCommand.name);
          });
        }
      }

      if (commands.slash) {
        // Slash Command
        const slashCommand = commands.slash;
        client.slashDatas.push(slashCommand.data.toJSON());
        client.slashCommands.set(slashCommand.data.name, slashCommand);
      }
    }
  }));
}));

// Event Handler
const eventFiles = readdirSync("./src/events");

Promise.all(eventFiles.map(async (file) => {
const event = await import(`./src/events/${file}`).then(x => x.default);

if (event.once) {
  client.once(event.name, (...args) => event.execute(...args));
} else {
  client.on(event.name, (...args) => event.execute(...args));
}
}));

// Process Listeners
process.on("unhandledRejection", e => { 
   console.log(e)
 }) 
process.on("uncaughtException", e => { 
   console.log(e)
 })  
process.on("uncaughtExceptionMonitor", e => { 
   console.log(e)
 })
//

client.login(token)
