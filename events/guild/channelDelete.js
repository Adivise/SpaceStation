const { Database } = require("st.db");

const station = new Database("./settings/models/station.json", { databaseInObject: true });

module.exports = async (client, channel) => {
    if (channel.type == 2) {
        const db = await station.get(channel.guild.id);
        if (db.setup_vc == channel.id) {
            const player = client.manager.players.get(channel.guild.id);
            if (!player) return;
            await player.destroy();
            await client.createAlreadySetup(channel); // Can find on handlers/loadDatabase.js
            await client.createDPlaylist(channel.guild.id);
        }
    }

    if (channel.type == 13) {
        const db = await station.get(channel.guild.id);
        if (db.setup_vc == channel.id) {
            const player = client.manager.players.get(channel.guild.id);
            if (!player) return;
            await player.destroy();
            await client.createAlreadySetup(channel); // Can find on handlers/loadDatabase.js
            await client.createDPlaylist(channel.guild.id);
        }
    }

    if (channel.type == 0) {
        const db = await station.get(channel.guild.id);
        if (db.setup_ch == channel.id) {
            const player = client.manager.players.get(channel.guild.id);
            if (!player) return;
            await player.destroy();
            await client.createAlreadySetup(channel); // Can find on handlers/loadDatabase.js
            await client.createDPlaylist(channel.guild.id);
        }
    }
    
};