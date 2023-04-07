const config = require("./config.json");
const Discord = require('discord.js');
const client = new Discord.Client({ intents: [ "MessageContent", "GuildMessages", "Guilds" ] });
const colors = require("colors");
// data = { guildID: { userID: { last: "Last Message", count: MessageRepeats } } }
var data = { 0: { 0: { last: "Hello World", count: 0 } } }
client.on('ready', () => {
	console.log(`${colors.cyan("[INFO]")} ${colors.green("Logged in as " + client.user.tag)}`);
});

client.on('messageCreate', message => {
	if (message.author.bot) return;
	if (data[message.guild.id] == null) data[message.guild.id] = {};
	if (data[message.guild.id][message.author.id] == null) data[message.guild.id][message.author.id] = { last: message.content, count: 1 }; // Starting with 1 to make config easier to understand
	if (message.content !== data[message.guild.id][message.author.id].last) {
		data[message.guild.id][message.author.id].last = message.content;
		data[message.guild.id][message.author.id].count = 1;
	}
	if (message.content == data[message.guild.id][message.author.id].last) data[message.guild.id][message.author.id].count++;
	if (data[message.guild.id][message.author.id].count > config.max + 1) message.delete();
});

client.login(config.token);