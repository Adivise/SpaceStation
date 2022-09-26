const { Database } = require("st.db");

module.exports = async (client, player, oldChannel, newChannel) => {
        const guild = client.guilds.cache.get(player.guild)
        if(!guild) return;

        const channel = guild.channels.cache.get(player.textChannel);
        if (!channel) return;

       // console.log("playerMove");
        await player.destroy();

        await delay(2000);
        /// Reconnect to the voice channel
        await joinVoice(client, player);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function joinVoice(client, player) {

    const db = new Database("./settings/models/station.json", { databaseInObject: true });
        // get guild db all
        const station = await db.get(player.guild);
        // check each guild setup_enable = false = return;
        if (station.setup_enable === false) return;
        // Check pass = create manager and join voice!
        const manager = await client.manager.create({
            guild: player.guild,
            voiceChannel: station.setup_vc,
            textChannel: station.setup_ch,
            selfDeafen: true,
        });
        // join voice!
        await manager.connect();
        // get guild playlist
        const track = new Database("./settings/models/playlist.json", { databaseInObject: true });
        // check length amount of guild playlist
        const amount = await track.get(manager.guild);
        // check array length playlist when 0 = autoplay mode!
        if (amount.length === 0) {
          //  console.log("RUN AUTO PLAYER")

            /// random string in array
            const random_play = AUTO_PLAY[Math.floor(Math.random() * AUTO_PLAY.length)];
            /// search music string
            let res = await client.manager.search(random_play, client.user);
            /// and push track to guild playlist database
            await track.push(manager.guild, res.tracks[1]);
            /// add track to player
            await manager.queue.add(res.tracks[1]);
            // and play
            await trackPlay(client, manager);
        } else { /// check number than 1+ play song in guild playlist
          //  console.log("RUN PLAYER")
            const playlist = new Database("./settings/models/playlist.json", { databaseInObject: true });
            /// get guild playlist
            const song = playlist.get(manager.guild);
            /// search track from playlist
            var res = await client.manager.search(song[0].uri, client.user);

            if(res.loadType != "NO_MATCHES") {
                if(res.loadType == "TRACK_LOADED") {
                    manager.queue.add(res.tracks[0]);
                } else if(res.loadType == "PLAYLIST_LOADED") {
                    manager.queue.add(res.tracks)
                } else if(res.loadType == "SEARCH_RESULT") {
                    manager.queue.add(res.tracks[0]);
                } else if(res.loadType == "LOAD_FAILED") {
                    /// Load Failed
                }
            } else {
                /// Load No Matches
        }
        // not set 247 to true because this bot not auto left voice
        /// player.twentyFourSeven = true;

        await trackPlay(client, manager);
    }
}

async function trackPlay(client, manager) {
    await manager.play();
}