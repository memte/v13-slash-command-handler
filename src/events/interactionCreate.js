import { Permissions, MessageEmbed } from "discord.js";
import { readdirSync } from "fs";

 export default {
	name: 'interactionCreate',
	execute: async(interaction) => {
      let client = interaction.client;
      if (!interaction.isCommand()) return;
      if(interaction.member.bot) return;

      readdirSync('./src/commands').forEach(async file => {
        const command = await import(`../../src/commands/${file}`).then(x => x.default)
        if(interaction.commandName.toLowerCase() === command.data.name.toLowerCase()) {
        command.run(client, interaction)
    }
	})
  }}
