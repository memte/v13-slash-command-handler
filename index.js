const { Client, Collection, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.MESSAGE_CONTENT, Intents.FLAGS.GUILD_SCHEDULED_EVENTS, Intents.FLAGS.AUTO_MODERATION_CONFIGURATION, Intents.FLAGS.AUTO_MODERATION_EXECUTION],
  partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "GUILD_SCHEDULED_EVENT"],
  shards: "auto"
});
const config = require("./src/config.js");
const { readdirSync } = require("node:fs")
const moment = require("moment");

let token = config.token

client.commands = new Collection()
client.commandAliases = new Collection()
client.slashCommands = new Collection()
client.slashDatas = []

function log(message) {
  console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${message}`);
};
client.log = log
// Command Handler
readdirSync('./src/commands/prefix').forEach(async file => {
  const command = await require(`./src/commands/prefix/${file}`);
  if(command) {
    client.commands.set(command.name, command)
    if(command.aliases && Array.isArray(command.aliases)) {
       command.aliases.forEach(alias => {
        client.commandAliases.set(alias, command.name)  
})
}}})

// Slash Command Handler
const slashcommands = [];
readdirSync('./src/commands/slash').forEach(async file => {
  const command = await require(`./src/commands/slash/${file}`);
  client.slashDatas.push(command.data.toJSON());
  client.slashCommands.set(command.data.name, command);
})

// Event Handler
readdirSync('./src/events').forEach(async file => {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})

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
