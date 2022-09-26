const { Database } = require("st.db");
const { AUTO_PLAY } = require("../../settings/config.js");

module.exports = async (client) => {

    console.log("[INFO] AUTO RECONNECT TO ALL GUILD [VOICE CHANNEL] IN (5 SECONDS)");
    await delay(5000);

    /// Join voice
    await joinVoice(client);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function joinVoice(client) {
    /// Get database stations
    const db = new Database("./settings/models/station.json", { databaseInObject: true });
        for (let i = 0; i < db.keysAll().length; i++) {
        // get guild db all
        const station = await db.get(db.keysAll()[i]);
        // check each guild setup_enable = false = return;
        if (station.setup_enable === false) return;
        // Check pass = create manager and join voice!
        const player = await client.manager.create({
            guild: db.keysAll()[i],
            voiceChannel: station.setup_vc,
            textChannel: station.setup_ch,
            selfDeafen: true,
        });
        // join voice!
        const state = player.state;
        if (state != "CONNECTED") await player.connect();
        // get guild playlist
        const track = new Database("./settings/models/playlist.json", { databaseInObject: true });
        // check length amount of guild playlist
        const amount = await track.get(track.keysAll()[i]);
        // check array length playlist when 0 = autoplay mode!
        if (amount.length === 0) {
         //   console.log("RUN AUTO PLAYER")

            /// random string in array
            const random_play = AUTO_PLAY[Math.floor(Math.random() * AUTO_PLAY.length)];
            /// search music string
            let res = await client.manager.search(random_play, client.user);
            /// and push track to guild playlist database
            await track.push(track.keysAll()[i], res.tracks[1]);
            /// add track to player
            await player.queue.add(res.tracks[1]);
            // and play
            await trackPlay(client, player);
        } else { /// check number than 1+ play song in guild playlist
          //  console.log("RUN PLAYER")
            const playlist = new Database("./settings/models/playlist.json", { databaseInObject: true });
            /// print playlist all guild
                /// get guild playlist
            const song = playlist.get(playlist.keysAll()[i]);
            /// search track from playlist
            var res = await client.manager.search(song[0].uri, client.user);

            if(res.loadType != "NO_MATCHES") {
                if(res.loadType == "TRACK_LOADED") {
                    player.queue.add(res.tracks[0]);
                } else if(res.loadType == "PLAYLIST_LOADED") {
                    player.queue.add(res.tracks)
                } else if(res.loadType == "SEARCH_RESULT") {
                    player.queue.add(res.tracks[0]);
                } else if(res.loadType == "LOAD_FAILED") {
                    /// Load Failed
                }
            } else {
                /// Load No Matches
            }
            // not set 247 to true because this bot not auto left voice
            /// player.twentyFourSeven = true;

            await trackPlay(client, player);
        }

    }
}

async function trackPlay(client, player) {
    await player.play();
}