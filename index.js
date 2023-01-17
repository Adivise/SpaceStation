const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { Manager } = require("erela.js");

const client = new Client({
    shards: "auto",
    allowedMentions: { parse: ["users", "roles"] },
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ],
});

client.config = require('./settings/config.js');
client.owner = client.config.OWNER_ID;
client.dev = client.config.DEV_ID;
client.color = client.config.EMBED_COLOR;
if(!client.token) client.token = client.config.TOKEN;

process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

client.manager = new Manager({
    nodes: client.config.NODES,
    autoPlay: true,
    plugins: [],
    send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
});

["slash"].forEach(x => client[x] = new Collection());
["loadCommand", "loadEvent", "loadDatabase", "loadPlayer"].forEach(x => require(`./handlers/${x}`)(client));

client.login(client.token);