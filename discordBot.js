const fs = require('fs');
require('dotenv').config();

const {Client, Intents} = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
const prefix = "!";
client.on('message', async (message) => {
   if (message.content === 'u gay') {
        message.reply('no u');
    }


    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const MAX_REACTIONS = 5;

    if (command === 'raffle') {
        try {
            // send a message and wait for it to be sent
            const sentMessage = await message.channel.send('React to this message to be entered into the raffle!');

            // react to the sent message
            await sentMessage.react('👍');

            // set up a filter to only collect reactions with the 👍 emoji
            // and don't count the bot's reaction
            //const filter = (reaction, user) => reaction.emoji.name === '👍' && !user.bot;
            const filter = (reaction, user) => reaction.emoji.name === '👍';
            // set up the collecrtor with the MAX_REACTIONS
            const collector = sentMessage.createReactionCollector({
                filter,
                max: MAX_REACTIONS,
            });
            var uSet = [];
            collector.on('collect', (reaction,user) => {
                // in case you want to do something when someone reacts with 👍
                //console.log(`Collected a new ${reaction.emoji.name} reaction`);
                //console.log(` ${message.reactions.client.user.username} reacted`);
                var usNM = user.tag;
                //console.log(`${user.tag} reacted with ${reaction.emoji.name}.`);
                uSet.push(usNM);
                console.log(uSet);

            });


            // fires when the time limit or the max is reached
            collector.on('end', (collected, reason) => {
                // reactions are no longer collected
                // if the 👍 emoji is clicked the MAX_REACTIONS times
                if (reason === 'limit')
                    return message.channel.send(`We've just reached the maximum of ${MAX_REACTIONS} reactions.`);
            });
        } catch (error) {
            // "handle" errors
            console.log(error);
        }
    }

});



client.login("OTk3MTg4MDU5OTIzNzU1MDA4.G7W9mU.qux9XyQ2KcCBBk_aCBqmF64ZATynrjeLT4fTwY");