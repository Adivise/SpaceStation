const { Database } = require("st.db");

const db = new Database("./settings/models/playlist.json", { databaseInObject: true });

module.exports = async (client, player, track, payload) => {

    /// when track start update song request channel
    await client.UpdateQueueMsg(player);
    //console.log("trackStart")
}