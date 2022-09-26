const { Database } = require("st.db");

const db = new Database("./settings/models/playlist.json", { databaseInObject: true });

module.exports = async (client, player, track, playload) => {
    const channel = client.channels.cache.get(player.textChannel);
    if (!channel) return;

    //console.log("trackEnd");
}