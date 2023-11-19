const connectDB = require('../../models/connect.js');

connectDB.findOne({ Guild: interaction.guild.id }, async (err, data) => {
    if (data) {
      respond({"content": `This server's special key is: ${data["SpecialKey"]}!`});
    } else {
      new connectDB ({
        Guild: interaction.guild.id,
        SpecialKey: "Examples ✨"
      }).save()
  
      respond({"content": `Woah! This server doesn't have a key yet 👀 I've just set yours to the default key instead!`});
    }
});