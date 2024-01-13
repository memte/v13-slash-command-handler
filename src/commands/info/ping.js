const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const prefix = {
  name: "ping",
  aliases: ["pong"],
  cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
  run: async (client, message, args) => {
      message.reply(`Pong 🏓`)
    }
 }; 

const slash = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),
    // komutu geliştirmek istersen guide: https://v13.discordjs.guide/interactions/slash-commands.html#options
    run: async (client, interaction) => {
      interaction.reply(`Pong 🏓`)
    }
 };
module.exports = { prefix, slash }