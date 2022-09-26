const { Database } = require("st.db");
const { AUTO_PLAY } = require("../../settings/config.js")

const db = new Database("./settings/models/playlist.json", { databaseInObject: true });

module.exports = async (client, player) => {

	//console.log("queueEnd");

	/// get guild database
	const amount = await db.get(player.guild);
	//console.log("Song Old: " + amount.length);

	/// amount = 1 = auto play mode
	if (amount.length === 1) {
		/// search music string from array
		let res = await client.manager.search(randomTrack(), client.user);
		/// remove first track
		await db.shift(player.guild);
		// push track to guild playlist
		await db.push(player.guild, res.tracks[1]);
		/// add track to player
		await player.queue.add(res.tracks[1]);
		/// and play
		await trackPlay(client, player);
	} else { /// amount than 2+ = play track in guild playlist
		/// remove first track
		await db.shift(player.guild);
		// and run function trackStart
		await trackStart(client, player);
	}
}

async function trackStart(client, player) {
	/// get guild database
	const playlist = await db.get(player.guild);
	/// and play first track guild playlist
	const res = await client.manager.search(playlist[0].uri, client.user.id);
	/// add track to player
	await player.queue.add(res.tracks[0]);
	/// and play
	await trackPlay(client, player);
}

async function trackPlay(client, player) {
    await player.play();
}

function randomTrack() {
	return AUTO_PLAY[Math.floor(Math.random() * AUTO_PLAY.length)];
}