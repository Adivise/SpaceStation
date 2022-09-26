const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Database } = require("st.db");

const station = new Database("./settings/models/station.json", { databaseInObject: true });
const playlist = new Database("./settings/models/playlist.json", { databaseInObject: true });

module.exports = {
    name: ["station", "skip"],
    description: "Skips the song currently playing in station.",
    category: "Music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return interaction.editReply(`You don't have permission.`);

        const database = await station.get(interaction.guild.id);
        if (database.setup_enable === false) return interaction.editReply(`Please setup station first!`);

        const player = client.manager.get(interaction.guild.id);
        if (!player) return interaction.editReply(`No player playing in this guilds.`);

        const amount = await playlist.get(interaction.guild.id);

        if (amount.length === 1) {

            const embed = new EmbedBuilder()
                .setDescription(`\`🚨\` | *There are no* \`Songs\` *in queue*`)
                .setColor(client.color);
    
            interaction.editReply({ embeds: [embed] });
        } else {
            await player.stop();

            const embed = new EmbedBuilder()
                .setDescription(`\`⏭\` | *Song has been:* \`Skipped\``)
                .setColor(client.color);
    
            interaction.editReply({  embeds: [embed] });
        }
    }
}