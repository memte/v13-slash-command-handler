module.exports = {
 name: 'interactionCreate',
 execute: async(interaction) => {
  let client = interaction.client;
  if (!interaction.isCommand()) return;
  if(interaction.user.bot) return;
  try {
  const command = client.slashCommands.get(interaction.commandName)
  command.run(client, interaction)
  } catch (e) {
  console.error(e)
  interaction.reply({content: "Komut çalıştırılırken bir sorunla karşılaşıldı! Lütfen tekrar deneyin.", ephemeral: true})
}
  }}
