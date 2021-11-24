var accent = "#8aca85";
const prefix = "s "

var helpEmbed = {
	author: "Snipey Help",
	description: "```fix\nBot Commands:\n```",
	color: accent,
	fields: {
		snipe: {
			name: "Snipe",
			value: `<:replycont:911519857332326410>Displays contents of the most recent deleted message\`\`\`${prefix}snipe\`\`\``,
		},
		esnipe: {
			name: "Edit Snipe",
			value: `<:replycont:911519857332326410>Displays the contents of most recent edited message\`\`\`${prefix}editsnipe / ${prefix}esnipe\`\`\``,
		},
		imgsnipe: {
			name: "Image Snipe",
			value: `<:replycont:911519857332326410>Displays the contents of most recently deleted image\`\`\`${prefix}imagesnipe / ${prefix}imgsnipe\`\`\``,
		},
		rsnipe: {
			name: "Reaction Snipe",
			value: `<:replycont:911519857332326410>Displays the most recent removed reaction's emoji\`\`\`${prefix}reactsnipe / ${prefix}rsnipe\`\`\``,
		},
		tstamp: {
			name: "Timestamp",
			value: `<:reply:911519785236447242>Gives a timestamp for the given time\`\`\`${prefix}timestamp / ${prefix}tstamp\`\`\``,
		},
	},
	footer: {
		text: "Snipey by sadtzy#6666",
		image: "https://cdn.discordapp.com/emojis/815111678772772904.gif?size=256",
	},
};

var snipeEmbed = {
	author: {
		text: "",
		image: "",
	},
	description:
		"<:replycont:911519857332326410>Deleted a message <a:sussy:895613835149451274>",
		color: accent,
		fields: {},
		footer: {
			text: "",
			image: "",
		},
	};
	
	const timestampEmbed = {
		description:
		"```md\n< h.timestamp [ 1d 6h 30m ] >``````md\n# Description\nCreates a timestamp that automatically converts to the user's timezone.\n# Example Commands:\nh.timestamp 1d 3h 30m ,\nh.timestamp 30m,\nh.timestamp -5m```",
		color: accent,
	};
	
	const inviteEmbed = {
		description:
		"<:replycont:895591087945711638>Click here to add me to your server:\n<:reply:894213507451617290>**[Invite me](https://discord.com/api/oauth2/authorize?client_id=893840496424792105&permissions=274878237760&scope=bot)**",
		color: accent,
	};
	const NOPERMS = "`<a:NOPERMS:907668248374435912> No permission to send messages in the channel <a:NOPERMS:907668248374435912>`"
	const censortext = "`😐`";
	const bannedwords = [
	"coon",
	"cock",
	"nigger",
	"cunt",
	"cnut",
	"faggot",
	"fag",
	"queer",
	"chink",
	"beaner",
	"bimbos",
	"carpet muncher",
	"carpetmuncher",
	"darkie",
	"jigaboo",
	"jiggaboo",
	"jiggerboo",
	"kike",
	"mong",
	"nig nog",
	"paki",
	"dick",
	"penis",
	"pussy",
	"dyke",
	"ballsack",
	"anus",
	"anal",
	"vagina",
	"jizz",
	"scrotum",
	"clitoris",
	"clit",
	"titties",
	"tiddies",
	"Cock",
	"tit",
	"titty",
	"tits",
	"boobs",
	"boob",
	"ho",
	"hoes",
	"tittys",
	"puss",
	"cum",
	"cumming",
	"f@g",
	"retard",
	"retarded",
	"semen",
	"seman",
	"whore",
	"kontol",
	"tiddy",
	"Dik",
	"Dic",
	"peni$",
	"niga",
	"cockslap",
	"cok",
	"dicc",
	"Peen",
	"ccok",
	"ddic",
	"ching chong",
	"pusy",
	"nig",
	"slut",
	"raytard",
	"tard",
	"dicks",
	"whor3",
	"cunts",
	"chutiya",
	"chutiye",
	"bsdk",
	"bhosadike",
	"chut",
	"bhosdike",
	"gandu",
	"gaandu",
	"dlck",
	"n!igga",
	"n!gga",
	"betichod",
	"pussys",
	"pussies",
	"d!ck",
	"wh0re",
	"fags",
	"pu$$y",
	"H0E",
	"faggotx",
	"whores",
	"memek",
	"cocks",
	"cummy",
	"dickhea",
	"dickhead",
	"niglet",
	"nigha",
	"welcum",
	"cocksucker",
	"cawk",
	"kawk",
	"cums",
	"rape",
	"hoeless",
	"randi",
	"bhenchod",
	"behenchod",
	"niggas",
];

export {
	helpEmbed,
	snipeEmbed,
	timestampEmbed,
	bannedwords,
	censortext,
	inviteEmbed,
	NOPERMS,
	prefix
};

/*
var Embed ={
    "author": {
        "text":"",
        "image":""
    },
    "description": "",
    "color":accent,
    "fields":{},
    "footer":{
        "text": "",
        "image": "",
    }
}
*/