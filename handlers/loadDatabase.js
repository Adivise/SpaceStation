const { Database } = require("st.db");

module.exports = async (client) => {
    console.log("[INFO] Databases are Loaded!");

    client.createExSetup = async function (interaction) {
        const db = new Database("./settings/models/station.json", { databaseInObject: true });
        const database = await db.has(interaction.guild.id);
        if (!database) {
            await db.set(interaction.guild.id, {
                setup_enable: false,
                setup_msg: "",
                setup_ch: "",
                setup_vc: ""
            });
        }
    };

    client.createSetup = async function (interaction, channel, message, voice) {
        const db = new Database("./settings/models/station.json", { databaseInObject: true });
        await db.set(interaction.guild.id, {
            setup_enable: true,
            setup_msg: message,
            setup_ch: channel,
            setup_vc: voice
        });
    };

    client.createAlreadySetup = async function (interaction) {
        const db = new Database("./settings/models/station.json", { databaseInObject: true });
        await db.set(interaction.guild.id, {
            setup_enable: false,
            setup_msg: "",
            setup_ch: "",
            setup_vc: ""
        });
    };

    client.createPlaylist = async function (interaction) {
        const db = new Database("./settings/models/playlist.json", { databaseInObject: true });
        const database = await db.has(interaction.guild.id);
        if (!database) {
            await db.set(interaction.guild.id, []);
        }
    };

    client.createDPlaylist = async function (guild) {
        const db = new Database("./settings/models/playlist.json", { databaseInObject: true });
        await db.set(guild, []);
    };

}