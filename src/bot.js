const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
	partials: ["MESSAGE", "REACTION", "USER"],
});
const { token } = require("../config.json");

const snipes = {};
const editSnipes = {};
const reactionSnipes = {};
const imageSnipes = {};

const formatEmoji = (emoji) => {
	return !emoji.id || emoji.available
		? emoji.toString() // bot has access or unicode emoji
		: `[:${emoji.name}:](${emoji.url})`; // bot cannot use the emoji
};

client.on("ready", () => {
	console.log(`[sniper] :: Logged in as ${client.user.tag}.`);
	client.user.setActivity('sniper help', { type: 'LISTENING' });
});

client.on("messageDelete", async (message) => {
	if (message.partial) return; // content is null
	if(message.author.bot) return;

	snipes[message.channel.id] = {
		author: message.author,
		content: message.content,
		createdAt: message.createdTimestamp,
	};
	
	var Attachment = Array.from(message.attachments);
	let messageAttachment = message.attachments.size > 0 ? Attachment[0][1].url : null
	
	if (messageAttachment){
	if(message.content==null){
		imageSnipes[message.channel.id] = {
		author: message.author,
		img: messageAttachment,
		createdAt: message.createdTimestamp,
		content: "ㅤ"
	};}
	else{
		imageSnipes[message.channel.id] = {
			author: message.author,
			img: messageAttachment,
			createdAt: message.createdTimestamp,
			content: message.content,
		};
	}
  }
});

client.on("message", (message) => {

	if(message.author.bot) return;

	if(message.content.toLowerCase() === "sniper help") {
		if(message.author.bot) return;
		message.channel.send({
					embeds: [
						new MessageEmbed()
							.setDescription("```fix\nBot Commands:\n```")
							.setAuthor("Sniper Bot Help",message.author.avatarURL())
							.addFields(
								{"name": "Snipe",
								"value": "<:replycont:895591087945711638>Displays contents of the most recent deleted message```pls snipe```",
								},
								{"name": "Edit Snipe",
								"value": "<:replycont:895591087945711638>Displays the contents of most recent edited message```pls esnipe / pls editsnipe```",
								},
								{"name": "Image Snipe",
								"value": "<:replycont:895591087945711638>Displays the contents of most recently deleted image```pls imgsnipe / pls imagesnipe```",
								},
								{"name": "Reaction Snipe",
								"value": "<:reply:894213507451617290>Displays the most recent removed reaction's emoji```pls rsnipe / pls reactsnipe```"
								}
							)
							.setColor('#8aca85')
							.setFooter("u kinda smell, like a baka, eren yeagaa~~","https://media.discordapp.net/attachments/877954155786936340/890876219845935164/image0.gif")
					],
			  });
}

	if(message.content.toLowerCase() === "pls snipe") {
		const snipe = snipes[message.channel.id];
		if(message.author.bot) return;
		message.channel.send(snipe
			? {
					embeds: [
						new MessageEmbed()
							.setDescription("<:replycont:895591087945711638>Deleted a message <a:sussy:895613835149451274>")
							.addFields(
				
								{"name": "Deleted Message:",
								"value": "<:reply:894213507451617290> "+snipe.content,
								}
							)
							.setAuthor(snipe.author.tag,snipe.author.avatarURL())
							.setFooter(message.author.tag,message.author.avatarURL())
							.setTimestamp(snipe.createdAt)
							.setColor('#8aca85'),
					],
			  }
			: "There's nothing to snipe!");
}

	if(message.content.toLowerCase() === "pls esnipe" || message.content.toLowerCase() === "pls editsnipe") {
		const snipe = editSnipes[message.channel.id];
		if(message.author.bot) return;
		message.channel.send(
			snipe
				? {
						embeds: [
							new MessageEmbed()
								.setDescription("<:replycont:895591087945711638>Edited **[this message]("+snipe.link+")** <a:sussy:895613835149451274>")
								.addFields(
				
									{"name": "Old Message:",
									"value": "<:replycont:895591087945711638> "+snipe.content,
									},
									{"name": "New Message:",
									"value": "<:reply:894213507451617290> "+snipe.econtent,
									}
								)
								.setAuthor(snipe.author.tag,snipe.author.avatarURL())
								.setFooter(message.author.tag,message.author.avatarURL())
								.setTimestamp(snipe.createdAt)
								.setColor('#8aca85'),
						],
					}
				: "There's nothing to snipe!"
		);
}

	if(message.content.toLowerCase() === "pls rsnipe" || message.content.toLowerCase() === "pls reactsnipe") {
		const snipe = reactionSnipes[message.channel.id];
		message.channel.send(
			snipe
				? {
						embeds: [
							new MessageEmbed()
								.setDescription("<:replycont:895591087945711638>Reaction removed on **[this message]("+snipe.messageURL+")** <a:sussy:895613835149451274>")
								.addFields(
									{"name": "Reaction Emoji:",
									"value": "<:reply:894213507451617290> "+formatEmoji(snipe.emoji),
									}
								)
								.setAuthor(snipe.user.tag,snipe.user.avatarURL())
								.setFooter(message.author.tag,message.author.avatarURL())
								.setTimestamp(snipe.createdAt)
								.setColor('#8aca85'),
						],
				  }
				: "There's nothing to snipe!"
		);
	}

	if(message.content.toLowerCase() === "pls imgsnipe" || message.content.toLowerCase() === "pls imagesnipe") {
		const snipe = imageSnipes[message.channel.id];
		if(message.author.bot) return;
		if(snipe=={}) 
		var imgcontent = snipe.content == "ㅤ" ? "<:replycont:895591087945711638>Deleted an image <a:sussy:895613835149451274>" : "<:replycont:895591087945711638>Deleted an image <a:sussy:895613835149451274>\n\n<:reply:894213507451617290>"+snipe.content

		message.channel.send(snipe
			? {
					embeds: [
						new MessageEmbed()
							.setDescription(imgcontent)
							.setImage(snipe.img)
							.setAuthor(snipe.author.tag,snipe.author.avatarURL())
							.setFooter(message.author.tag,message.author.avatarURL())
							.setTimestamp(snipe.createdAt)
							.setColor('#8aca85'),
					],
			  }
			: "There's nothing to snipe!");
	}

	if(message.content.toLowerCase().startsWith("pls timestamp")) {
		cmd = message.content
		seconds = cmd[(cmd.indexOf("s",12)-1)] === undefined ? 0 : parseInt(cmd[(cmd.indexOf("s",12)-1)])
		minutes = cmd[(cmd.indexOf("m",12)-1)] === undefined ? 0 : parseInt(cmd[(cmd.indexOf("m",12)-1)])
		hours = cmd[(cmd.indexOf("h",12)-1)] === undefined ? 0 : parseInt(cmd[(cmd.indexOf("h",12)-1)])
		days = cmd[(cmd.indexOf("d",12)-1)] === undefined ? 0 : parseInt(cmd[(cmd.indexOf("d",12)-1)])

		date=timestamp(seconds,minutes,hours,days)
		tstamp=("<t:"+String(date)+">")
		message.reply(tstamp+" (`"+tstamp+"`)")

 }

});  

client.on("messageUpdate", async (oldMessage, newMessage) => {
	if (oldMessage.partial) return; // content is null
	if(oldMessage.author.bot) return;

	editSnipes[oldMessage.channel.id] = {
		author: oldMessage.author,
		content: oldMessage.content,
		econtent: newMessage.content,
		link: oldMessage.url,
		createdAt: newMessage.editedTimestamp,
	};
});

client.on("messageReactionRemove", async (reaction, user) => {
	if (reaction.partial) reaction = await reaction.fetch();

	reactionSnipes[reaction.message.channel.id] = {
		user: user,
		emoji: reaction.emoji,
		messageURL: reaction.message.url,
		createdAt: Date.now(),
	};
});

function timestamp(seconds,minutes,hours,days){
	var d = new Date()
	var year = d.getUTCFullYear()
	var month = d.getUTCMonth()
	var day = d.getUTCDate()
	var hour = d.getUTCHours()
	var minute = d.getUTCMinutes()
	var second = d.getUTCSeconds()
	var datum = new Date(Date.UTC(year, month, day + days, hour + hours, minute + minutes, second + seconds))
	return datum.getTime()/1000
	}

client.login(token);
