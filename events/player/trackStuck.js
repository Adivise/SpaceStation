module.exports = async (client, player, track, payload) => {
    const channel = client.channels.cache.get(player.textChannel);
    if (!channel) return;

    await player.destroy();
}