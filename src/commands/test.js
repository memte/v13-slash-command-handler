const { Discord, MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test!"),
    run: async (client, interaction) => {
      return interaction.reply(`Hello World!`)
    }
 };