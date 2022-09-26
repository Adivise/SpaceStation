require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // your bot token
    EMBED_COLOR: process.env.EMBED_COLOR || "#000001", //<= default is "#000001"
    OWNER_ID: process.env.OWNER_ID || "YOUR_CLIENT_ID", //your owner discord id example: "515490955801919488"
    DEV_ID: [], // if you want to use command bot only, you can put your id here example: ["123456789", "123456789"]


    AUTO_PLAY: ["lo fi", "bassboost", "chilling", "anime song opening", "gurenge", "post malone", "jvke", "justin bieber", "ariana grande", "stephanie poetri"],

    NODES: [
        { 
            host: process.env.NODE_HOST || "localhost",
            port: parseInt(process.env.NODE_PORT || "5556"),
            password: process.env.NODE_PASSWORD || "123456",
        } 
    ],
}