const client = require("../index")

client.on("ready", () => {
    client.user.setActivity('spicy news in the parliament', { type: 'LISTENING' });
    console.log(`${client.user.tag} is ready!`)
})