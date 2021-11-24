import { Client, Intents, MessageEmbed } from "discord.js";
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
	partials: ["MESSAGE", "REACTION", "USER"],
});

import { token } from "../config.mjs";
import {
	snipeEmbed,
	helpEmbed,
	bannedwords,
	timestampEmbed,
	censortext,
	inviteEmbed,
	prefix
} from "../data.mjs";

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
	client.user.setActivity(
		`s help in ${client.guilds.cache.size}/75 servers`,
		{ type: "LISTENING" }
	);
});

client.on("messageDelete", async (message) => {
	if (message.partial) return; // content is null
	if (message.author.bot) return;

	snipes[message.channel.id] = {
		author: message.author,
		content: message.content,
		createdAt: message.createdTimestamp,
	};

	var Attachment = Array.from(message.attachments);
	let messageAttachment =
		message.attachments.size > 0 ? Attachment[0][1].url : null;

	if (messageAttachment) {
		if (message.content == null) {
			imageSnipes[message.channel.id] = {
				author: message.author,
				img: messageAttachment,
				createdAt: message.createdTimestamp,
				content: "ㅤ",
			};
		} else {
			imageSnipes[message.channel.id] = {
				author: message.author,
				img: messageAttachment,
				createdAt: message.createdTimestamp,
				content: message.content,
			};
		}
	} else {
		imageSnipes[message.channel.id] = {
			content: "?NOCONTENT?",
		};
	}
});

client.on("messageCreate", (message) => {
	if (message.author.bot) return;
	if(!message.content.startsWith(prefix)) return;

	if (message.content.toLowerCase() === `${prefix}help`) {
		message.channel
			.send({
				embeds: [
					new MessageEmbed()
						.setDescription(helpEmbed.description)
						.setAuthor(helpEmbed.author, message.author.avatarURL())
						.addFields(
							helpEmbed.fields.snipe,
							helpEmbed.fields.esnipe,
							helpEmbed.fields.imgsnipe,
							helpEmbed.fields.rsnipe,
							helpEmbed.fields.tstamp
						)
						.setColor(helpEmbed.color)
						.setFooter(
							helpEmbed.footer.text,
							helpEmbed.footer.image
						),
				],
			})
			.catch((error) => {
				if (error.code == 50013) {
					message.react("907668248374435912");
					message.author.send(
						`<a:NOPERMS:907668248374435912> No permission to send messages in <#${message.channelId}> <a:NOPERMS:907668248374435912>`
					);
				}
			});
	}

	if (message.content.toLowerCase() === "s snipe") {
		const snipe = snipes[message.channel.id];
		message.channel
			.send(
				snipe
					? {
							embeds: [
								new MessageEmbed()
									.setDescription(snipeEmbed.description)
									.addFields({
										name: "Deleted Message:",
										value:
											"<:reply:894213507451617290> " +
											censor(snipe.content),
									})
									.setAuthor(
										snipe.author.tag,
										snipe.author.avatarURL()
									)
									.setFooter(
										message.author.tag,
										message.author.avatarURL()
									)
									.setTimestamp(snipe.createdAt)
									.setColor(snipeEmbed.color),
							],
					  }
					: "There's nothing to snipe!"
			)
			.catch((error) => {
				if (error.code == 50013) {
					message.react("907668248374435912");
					message.author.send(
						`<a:NOPERMS:907668248374435912> No permission to send messages in <#${message.channelId}> <a:NOPERMS:907668248374435912>`
					);
				}
			});
	}

	if (message.content.toLowerCase() === "s esnipe") {
		const snipe = editSnipes[message.channel.id];
		if (message.author.bot) return;
		message.channel
			.send(
				snipe
					? {
							embeds: [
								new MessageEmbed()
									.setDescription(
										"<:replycont:895591087945711638>Edited **[this message](" +
											snipe.link +
											")** <a:sussy:895613835149451274>"
									)
									.addFields(
										{
											name: "Old Message:",
											value:
												"<:replycont:895591087945711638> " +
												snipe.content,
										},
										{
											name: "New Message:",
											value:
												"<:reply:894213507451617290> " +
												snipe.econtent,
										}
									)
									.setAuthor(
										snipe.author.tag,
										snipe.author.avatarURL()
									)
									.setFooter(
										message.author.tag,
										message.author.avatarURL()
									)
									.setTimestamp(snipe.createdAt)
									.setColor(snipeEmbed.color),
							],
					  }
					: "There's nothing to snipe!"
			)
			.catch((error) => {
				if (error.code == 50013) {
					message.react("907668248374435912");
					message.author.send(
						`<a:NOPERMS:907668248374435912> No permission to send messages in <#${message.channelId}> <a:NOPERMS:907668248374435912>`
					);
				}
			});
	}

	if (message.content.toLowerCase() === "s rsnipe") {
		const snipe = reactionSnipes[message.channel.id];
		message.channel
			.send(
				snipe
					? {
							embeds: [
								new MessageEmbed()
									.setDescription(
										"<:replycont:895591087945711638>Reaction removed on **[this message](" +
											snipe.messageURL +
											")** <a:sussy:895613835149451274>"
									)
									.addFields({
										name: "Reaction Emoji:",
										value:
											"<:reply:894213507451617290> " +
											formatEmoji(snipe.emoji),
									})
									.setAuthor(
										snipe.user.tag,
										snipe.user.avatarURL()
									)
									.setFooter(
										message.author.tag,
										message.author.avatarURL()
									)
									.setTimestamp(snipe.createdAt)
									.setColor(snipeEmbed.color),
							],
					  }
					: "There's nothing to snipe!"
			)
			.catch((error) => {
				if (error.code == 50013) {
					message.react("907668248374435912");
					message.author.send(
						`<a:NOPERMS:907668248374435912> No permission to send messages in <#${message.channelId}> <a:NOPERMS:907668248374435912>`
					);
				}
			});
	}

	if (message.content.toLowerCase() === "s imgsnipe") {
		const snipe = imageSnipes[message.channel.id];
		var imgcontent;
		if (snipe != undefined) {
			if (snipe.content == "") {
				imgcontent =
					"<:replycont:895591087945711638>Deleted an image <a:sussy:895613835149451274>";
			} else {
				imgcontent =
					"<:replycont:895591087945711638>Deleted an image <a:sussy:895613835149451274>\n\n<:reply:894213507451617290>" +
					snipe.content;
			}
		}
		if (!snipe) {
			message.channel.send("There's nothing to snipe!").catch((error) => {
				if (error.code == 50013) {
					message.react("907668248374435912");
					message.author.send(
						`<a:NOPERMS:907668248374435912> No permission to send messages in <#${message.channelId}> <a:NOPERMS:907668248374435912>`
					);
				}
			});
		}
		message.channel
			.send(
				snipe.content != "?NOCONTENT?"
					? {
							embeds: [
								new MessageEmbed()
									.setDescription(imgcontent)
									.setImage(snipe.img)
									.setAuthor(
										snipe.author.tag,
										snipe.author.avatarURL()
									)
									.setFooter(
										message.author.tag,
										message.author.avatarURL()
									)
									.setTimestamp(snipe.createdAt)
									.setColor(snipeEmbed.color),
							],
					  }
					: "There's nothing to snipe!"
			)
			.catch((error) => {
				if (error.code == 50013) {
					message.react("907668248374435912");
					message.author.send(
						`<a:NOPERMS:907668248374435912> No permission to send messages in <#${message.channelId}> <a:NOPERMS:907668248374435912>`
					);
				}
			});
	}

	if (message.content.toLowerCase().startsWith("s timestamp")) {
		var cmd = message.content.toLowerCase();

		var args = cmd.substr(14).split(" ");
		const values = { hours: 0, minutes: 0, days: 0 };

		for (let i = 0; i < args.length; i++) {
			var value = args[i];

			if (value.endsWith("d")) {
				values.days = parseInt(value.slice(0, -1));
			} else if (value.endsWith("m")) {
				values.minutes = parseInt(value.slice(0, -1));
			} else if (value.endsWith("h")) {
				values.hours = parseInt(value.slice(0, -1));
			}
		}

		var date = timestamp(values.minutes, values.hours, values.days);
		var tstamp = `<t:${String(date)}>`;
		message.channel
			.send(
				cmd === "s tstamp"
					? {
							embeds: [
								new MessageEmbed()
									.setDescription(timestampEmbed.description)
									.setAuthor(
										message.author.tag,
										message.author.avatarURL()
									)
									.setTimestamp(message.createdAt)
									.setColor(timestampEmbed.color),
							],
					  }
					: tstamp + ` (\`${timestamp}\`)`
			)
			.catch((error) => {
				if (error.code == 50013) {
					try{message.react("907668248374435912");}finally{
					message.author.send(
						`<a:NOPERMS:907668248374435912> No permission to send messages in <#${message.channelId}> <a:NOPERMS:907668248374435912>`
					);}
				}
			});
	}
	if (message.content.toLowerCase() == "s invite") {
		message.channel
			.send({
				embeds: [
					new MessageEmbed()
						.setDescription(
							`<:replycont:895591087945711638> Due to Discord's API limitation, the bot can be in max 75 servers\n<:replycont:895591087945711638> ${client.user.username} is in \`${client.guilds.cache.size}/75\` servers. \n<:reply:894213507451617290>**[Invite me](https://discord.com/api/oauth2/authorize?client_id=893840496424792105&permissions=274878237760&scope=bot)**`
						)
						.setAuthor(
							message.author.tag,
							message.author.avatarURL()
						)
						.setTimestamp(message.createdAt)
						.setColor(inviteEmbed.color),
				],
			})
			.catch((error) => {
				if (error.code == 50013) {
					message.react("907668248374435912");
					message.author.send(
						`<a:NOPERMS:907668248374435912> No permission to send messages in <#${message.channelId}> <a:NOPERMS:907668248374435912>`
					);
				}
			});
	}

	if (message.content.toLowerCase() == "s ping") {
		message.channel
			.send("<a:tiredcat:797095624255209513>")
			.then((m) => {
				m.edit(
					`🏓Pong: \`${(m.createdTimestamp - message.createdTimestamp)}\`ms\nAPI Latency: \`${Math.round(client.ws.ping)}\`ms`
				);
			})
			.catch((error) => {
				if (error.code == 50013) {
					message.react("907668248374435912");
					message.author.send(
						`<a:NOPERMS:907668248374435912> No permission to send messages in <#${message.channelId}> <a:NOPERMS:907668248374435912>`
					);
				}
			});
	}
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
	if (oldMessage.partial) return; // content is null
	if (oldMessage.author.bot) return;

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

function timestamp(minutes, hours, days) {
	var d = new Date();
	var year = d.getUTCFullYear();
	var month = d.getUTCMonth();
	var day = d.getUTCDate();
	var hour = d.getUTCHours();
	var minute = d.getUTCMinutes();
	var second = d.getUTCSeconds();
	var datum = new Date(
		Date.UTC(
			year,
			month,
			day + days,
			hour + hours,
			minute + minutes,
			second
		)
	);
	return datum.getTime() / 1000;
}

function censor(string) {
	const array = string.split(" ");
	var final = "";
	for (var x = 0; x < array.length; x++) {
		let value = array[x];
		var found = false;
		var tex = "";

		for (var i = 0; i < bannedwords.length; i++) {
			if (value.toLowerCase() == bannedwords[i]) {
				found = true;
				break;
			}
		}

		if (found) {
			tex = censortext;
		} else {
			tex = value;
		}
		final += tex + " ";
	}
	return final;
}

client.login(token);
