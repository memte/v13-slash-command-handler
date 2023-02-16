const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),
    // komutu geliştirmek istersen guide: https://v13.discordjs.guide/interactions/slash-commands.html#options
    run: async (client, interaction) => {
      interaction.reply(`Pong 🏓`)
    }
 };
