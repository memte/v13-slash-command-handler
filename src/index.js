import { Client, Collection, Intents } from "discord.js";
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILD_SCHEDULED_EVENTS], partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "GUILD_SCHEDULED_EVENT"] });
import config from "./src/config.js";
import { readdirSync } from "fs";
import moment from "moment";
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

let token = config.token

client.commands = new Collection()

const rest = new REST({ version: '9' }).setToken(token);

const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };

//command-handler
const commands = [];
readdirSync('./src/commands').forEach(async file => {
  const command = await import(`./src/commands/${file}`).then(x => x.default)
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
})

client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    log(`${client.user.username} Aktif Edildi!`);
})

//event-handler
readdirSync('./src/events').forEach(async file => {
	const event = await import(`./src/events/${file}`).then(x => x.default)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})
//

client.login(token)
