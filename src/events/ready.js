import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

export default {
 name: 'ready',
 once: true,
 execute(client) {
  const rest = new REST({ version: '9' }).setToken(client.token);
  let activities = [ `Developed by memte.`, `${client.user.username}` ], i = 0;
  function botPresence() {
  client.user.presence.set({ activities: [{ name: `${activities[i++ % activities.length]}`, type: "LISTENING" }]})
  setInterval(botPresence, 120000)
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
