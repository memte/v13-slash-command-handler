import { MessageEmbed, Permissions } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),
    run: async (client, interaction) => {
      interaction.reply(`Pong 🏓`)
      // komuta seçenekler eklemek istersen guide: https://v13.discordjs.guide/interactions/slash-commands.html#options
    }
 };
