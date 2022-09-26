const { PermissionsBitField } = require("discord.js");

module.exports = async (client, oldState, newState) => {

	/// Need delay for play smooth song
	await delay(5000);

	if (newState.channelId && newState.channel.type == 13 && newState.guild.members.me.voice.suppress) {
		if (newState.guild.members.me.permissions.has(PermissionsBitField.Flags.Speak) || (newState.channel && newState.channel.permissionsFor(nS.guild.members.me).has(PermissionsBitField.Flags.Speak))) {
			await newState.guild.members.me.voice.setSuppressed(false);
		}
	}
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
