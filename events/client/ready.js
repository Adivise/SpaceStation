module.exports = async (client) => {
    await client.manager.init(client.user.id);

    console.log(`[INFO] ${client.user.tag} (${client.user.id}) is Ready!`);

    let guilds = client.guilds.cache.size;
    let members = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
    let channels = client.channels.cache.size;

    const activities = [
        `/station setup | ${guilds} servers`,
        `/station add <song> | ${members} users`,
        `/station skip | ${channels} channels`,
    ]

    setInterval(() => {
        client.user.setPresence({ 
            activities: [{ name: `${activities[Math.floor(Math.random() * activities.length)]}`, type: 2 }], 
            status: 'online', 
        });
    }, 15000);
};
