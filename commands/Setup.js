const { EmbedBuilder, PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { Database } = require("st.db");
const { AUTO_PLAY } = require("../settings/config.js");

module.exports = {
    name: ["station", "setup"],
    description: "Create a channel/voice for bot station",
    category: "General",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return interaction.editReply(`You don't have permission.`);

        const player = client.manager.get(interaction.guild.id);
        if (player) player.destroy();

        const community = interaction.guild.features;

        if (community.includes("COMMUNITY")) {
            await interaction.guild.channels.create({
                name: "space-station",
                type: 0,
                parent_id: interaction.channel.parentId,
                user_limit: 3,
                rate_limit_per_user: 3,
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone,
                        allow: ['ViewChannel', 'ReadMessageHistory'],
                        deny: ['SendMessages'],
                    }
                ]
            }).then(async (channel) => {
                await interaction.guild.channels.create({
                    name: "Space Station",
                    type: 13,
                    parent_id: interaction.channel.parentId,
                    user_limit: 3,
                    rate_limit_per_user: 3,
                }).then(async (voice) => {
                    const attachment = new AttachmentBuilder("./settings/images/banner.png", { name: "setup.png" });
        
                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setAuthor({ name: `No song playing currently.` })
                        .setImage(`https://images2.alphacoders.com/110/thumb-1920-1109233.jpg`)
                        .setDescription(`>>> [Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2184310032&scope=bot%20applications.commands) | [Support](https://discord.gg/SNG3dh3MbR) | [Website](https://adivise.github.io/Stylish/)`)
                        .setFooter({ text: `Prefix is: /` });
        
                        await channel.send({ files: [attachment] });
                        await channel.send({ embeds: [embed] }).then(async (message) => {
                        /// Create database
                        await client.createSetup(interaction, channel.id, message.id, voice.id);

                        const embed = new EmbedBuilder()
                            .setDescription(`*Succesfully Setup Station in* (Chat ${channel}) (Voice ${voice})`)
                            .setColor(client.color);

                        interaction.followUp({ embeds: [embed] });

                        await joinVoice(client, interaction.guild.id, voice.id, channel.id);
                    });
                })
            });
        } else {
            await interaction.guild.channels.create({
                name: "space-station",
                type: 0,
                parent_id: interaction.channel.parentId,
                user_limit: 3,
                rate_limit_per_user: 3,
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone,
                        allow: ['ViewChannel', 'ReadMessageHistory'],
                        deny: ['SendMessages'],
                    }
                ]
            }).then(async (channel) => {
                await interaction.guild.channels.create({
                    name: "Space Station",
                    type: 2,
                    parent_id: interaction.channel.parentId,
                    user_limit: 3,
                    rate_limit_per_user: 3,
                }).then(async (voice) => {
                    const attachment = new AttachmentBuilder("./settings/images/banner.png", { name: "setup.png" });
        
                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setAuthor({ name: `No song playing currently.` })
                        .setImage(`https://images2.alphacoders.com/110/thumb-1920-1109233.jpg`)
                        .setDescription(`>>> [Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2184310032&scope=bot%20applications.commands) | [Support](https://discord.gg/SNG3dh3MbR) | [Website](https://adivise.github.io/Stylish/)`)
                        .setFooter({ text: `Prefix is: /` });
        
                        await channel.send({ files: [attachment] });
                        await channel.send({ embeds: [embed] }).then(async (message) => {
                        /// Create database
                        await client.createSetup(interaction, channel.id, message.id, voice.id);
    
                        const embed = new EmbedBuilder()
                            .setDescription(`*Succesfully Setup Station in* (Chat ${channel}) (Voice ${voice})`)
                            .setColor(client.color);
    
                        interaction.followUp({ embeds: [embed] });
    
                        await joinVoice(client, interaction.guild.id, voice.id, channel.id);
                    });
                })
            });
        }
    }
}

async function joinVoice(client, guild, voice, channel) {
    const player = await client.manager.create({
        guild: guild,
        voiceChannel: voice,
        textChannel: channel,
        selfDeafen: true,
    });
    
    const state = player.state;
    if (state != "CONNECTED") await player.connect();

    const track = new Database("./settings/models/playlist.json", { databaseInObject: true });
    const amount = await track.get(guild);
    if (amount.length === 0) {
        const random_play = AUTO_PLAY[Math.floor(Math.random() * AUTO_PLAY.length)];

        let res = await client.manager.search(random_play, client.user);

        await track.push(guild, res.tracks[1]);
        await player.queue.add(res.tracks[1]);
        await trackPlay(client, player);
    } else {
        const playlist = new Database("./settings/models/playlist.json", { databaseInObject: true });
        const song = playlist.get(guild);
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
        await trackPlay(client, player);
    }
}

async function trackPlay(client, player) {
    await player.play();
}
