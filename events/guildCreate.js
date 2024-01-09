const { InteractionType, PermissionsBitField, underscore, Colors } = require("discord.js");
const client = require("../index");
const { connectDB } = require("../models/connect");

client.on('guildCreate' , async (guild) => {
    try {
         const datafind = await(connectDB().findOne({channelId : guild.id}))
        console.log(await datafind)
        if (await datafind == null) {
            (await connectDB()).insertOne({channelId : guild.id , admin: guild.ownerId})
            console.log('add guild ID to database!')
        }
    } catch (err) {
        console.log(err)
    }
});