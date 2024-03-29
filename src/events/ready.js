const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = {
 name: 'ready',
 once: true,
 execute: async(client) => {
  const rest = new REST({ version: '9' }).setToken(client.token);
  const activities = [ `Developed by memte.`, `${client.user.username}` ]
  let nowActivity = 0;
  function botPresence() {
  client.user.presence.set({ activities: [{ name: `${activities[nowActivity++ % activities.length]}`, type: "LISTENING" }]})
  setTimeout(botPresence, 300000)
  }
  botPresence()
  client.log(`${client.user.username} Aktif Edildi!`)
  //
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: client.slashDatas },
            );
        } catch (error) {
            console.error(error);
        }
 }};
