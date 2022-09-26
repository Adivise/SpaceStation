const { EmbedBuilder } = require("discord.js");
const formatDuration = require("../../structures/FormatDuration.js");
const { Database } = require("st.db");

const db = new Database("./settings/models/station.json", { databaseInObject: true });
  
module.exports = async (client) => {

    client.UpdateQueueMsg = async function (player) {
        const CheckDB = await db.has(player.guild);
        if(!CheckDB) return;

        const data = await db.get(player.guild);
        if (data.setup_enable === false) return;

        const channel = await client.channels.cache.get(data.setup_ch);
        if (!channel) return;

        const playMsg = await channel.messages.fetch(data.setup_msg, { cache: false, force: true });
        if (!playMsg) return;

        const cSong = player.queue.current;

        const played = player.playing ? `Starting playing...` : `Song pause...`;

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${played}`, iconURL: `https://cdn.discordapp.com/emojis/741605543046807626.gif` })
            .setDescription(`[${cSong.title}](${cSong.uri}) \`[${formatDuration(cSong.duration)}]\``) // [${cSong.title}](${cSong.uri}) \`[${formatDuration(cSong.duration)}]\` • ${cSong.requester}
            .setColor(client.color)
            .setImage(`https://img.youtube.com/vi/${cSong.identifier}/sddefault.jpg`)
            .setFooter({ text: `Volume • ${player.volume}%` }) //${player.queue.length} • Song's in Queue | Volume • ${player.volume}% | ${qDuration} • Total Duration

        return playMsg.edit({ embeds: [embed] });
    };

    client.UpdateMusic = async function (player) {
        const CheckDB = await db.has(player.guild);
        if(!CheckDB) return;

        const data = await db.get(player.guild);

        if (data.setup_enable === false) return;

        const channel = await client.channels.cache.get(data.setup_ch);
        if (!channel) return;

        const playMsg = await channel.messages.fetch(data.setup_msg, { cache: false, force: true });
        if (!playMsg) return;

        const embed = new EmbedBuilder()
          .setColor(client.color)
          .setAuthor({ name: `No song playing currently.` })
          .setImage(`https://images2.alphacoders.com/110/thumb-1920-1109233.jpg`)
          .setDescription(`>>> [Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2184310032&scope=bot%20applications.commands) | [Support](https://discord.gg/SNG3dh3MbR) | [Website](https://adivise.github.io/Stylish/)`)
          .setFooter({ text: `Prefix is: /` });

        return playMsg.edit({ embeds: [embed] });
    };
};