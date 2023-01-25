 module.exports = {
	name: 'interactionCreate',
	execute: async(interaction) => {
         let client = interaction.client;
    	 if (!interaction.isCommand()) return;
   	 if(interaction.user.bot) return;
         const command = client.commands.get(interaction.commandName)
         command.run(client, interaction)
  }}
