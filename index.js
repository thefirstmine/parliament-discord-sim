const { Client, Collection } = require("discord.js");
require("dotenv").config()

const client = new Client({
    intents: ['GUILDS' , 'GUILD_MESSAGES'],
})
module.exports = client;

// Globals variables
client.commands = new Collection()
client.config = require("./config.json")

// Handler
require("./handler")(client)

client.login(process.env.TOKEN)