import { MessageEmbed, Permissions } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

const prefix = {
  name: "ping",
  aliases: ["pong"],
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

 export { prefix, slash };