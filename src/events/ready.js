export default {
	name: 'ready',
	once: true,
	execute(client) {
    let activities = [ `Developed by memte.`, `${client.user.username}` ], i = 0;
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, type: "LISTENING" }), 22000);
}};
