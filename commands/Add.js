const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const { Database } = require("st.db");

const playlist = new Database("./settings/models/playlist.json", { databaseInObject: true });
const station = new Database("./settings/models/station.json", { databaseInObject: true });

const TrackAdd = [];

module.exports = {
    name: ["station", "add"],
    description: "Queue song in radio station!",
    category: "General",
    options: [
        {
            name: "song",
            description: "The song to add",
            required: true,
            type: ApplicationCommandOptionType.String,
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return interaction.editReply(`You don't have permission.`);

        const database = await station.get(interaction.guild.id);
        if (database.setup_enable === false) return interaction.editReply(`Please setup station first!`);

        const search = interaction.options.getString("song");

        const res = await client.manager.search(search, interaction.user);
        if(res.loadType != "NO_MATCHES") {
            if(res.loadType == "TRACK_LOADED") {
                TrackAdd.push(res.tracks[0])
            } else if(res.loadType == "PLAYLIST_LOADED") {
                for (let i = 0; i < res.tracks.length; i++) {
                    TrackAdd.push(res.tracks[i]);
                }
            } else if(res.loadType == "SEARCH_RESULT") {
                TrackAdd.push(res.tracks[0]);
            } else if (res.loadType == "LOAD_FAILED") { //Error loading playlist.
                ///
            }
        } else { //The playlist link is invalid.
            ///
        }

        for (let i = 0; i < TrackAdd.length; i++) {
            await playlist.push(interaction.guild.id, TrackAdd[i]);
        }

        interaction.editReply("Success add song to radio station.");

        TrackAdd.length = 0;
    }
}
