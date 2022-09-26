module.exports = async (client) => {
    require("./loadPlayer/loadJoinVoice.js")(client);
    require("./loadPlayer/loadPlayer.js")(client);
    require("./loadPlayer/loadUpdate.js")(client);
    console.log("[INFO] Players are Loaded!");
};
