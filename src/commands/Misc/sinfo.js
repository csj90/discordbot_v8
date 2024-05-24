// Dependencies
const	Command = require('../../structures/Command.js');
const { Embed } = require('../../utils');
const os = require('os');
// const si = require('systeminformation');
/**
 * CustomCommand command
 * @extends {Command}
*/
class sinfo extends Command {
	/**
 	 * @param {Client} client The instantiating client
 	 * @param {CommandData} data The data for the command
	*/
	constructor(bot) {
		// MORE COMMAND SETTINGS CAN BE FOUND IN src/structures/Command
		super(bot, {
			name: 'sinfo',
			guildOnly: true,
			dirname: __dirname,
			aliases: ['sysinfo', 'sinfo'],
			description: 'Displays System Information.',
			usage: 'sinfo',
			cooldown: 2000,
			examples: ['sinfo'],
			slash: true,
			// The options for slash command https://discord.js.org/#/docs/discord.js/main/typedef/ApplicationCommandOption
			options: [],
		});
	}

	/**
 	 * Function for receiving message.
 	 * @param {bot} bot The instantiating client
 	 * @param {message} message The message that ran the command
	 * @param {settings} settings The settings of the channel the command ran in
 	 * @readonly
	*/
	async run(bot, message) {
		function prettyBytes(bytes) {
			const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			if (bytes === 0) return 'n/a';
			const by = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
			if (by === 0) return `${bytes} ${sizes[by]}`;
			return `${(bytes / Math.pow(1024, by)).toFixed(1)} ${sizes[by]}`;
		}
		const totalram = prettyBytes(os.totalmem());
		const freeram = prettyBytes(os.freemem());
		const usedram = prettyBytes(os.totalmem() - os.freemem());
		const prctfreeram = (((os.freemem() * 100) / os.totalmem + ' ').split('.')[0]);

		let seconds = Math.floor(os.uptime);
		let minutes = Math.floor(seconds / 60); seconds %= 60;
		let hours = Math.floor(minutes / 60); minutes %= 60;
		const days = Math.floor(hours / 24); hours %= 24;
		const embed = new Embed(bot, message.guild)
			.setTitle('Statistics')
			.setDescription('Stats of the System')
			.addFields(
				{ name: 'Server Name', value: os.hostname(), inline: true },
				{ name: 'Memory (RAM)', value: `Total Memory: ${totalram}\nUsed Memory: ${usedram}\nFree Memory: ${freeram}\nPercentage Of Free Memory: ${prctfreeram}%`, inline: true },
				{ name: 'CPU', value: os.cpus()[0].model, inline: true },
				// { name: 'Distro', value: si.osInfo(), inline: true },
				{ name: 'OS', value: os.version(), inline: true },
				{ name: 'OS Release', value: os.release(), inline: true },
				{ name: 'Uptime', value: `${days} days | ${hours} hours | ${minutes} minutes| ${seconds} seconds`, inline: true },
				{ name: 'CPU Load', value: os.loadavg().map(i => `${i}`).join(','), inline: true },
			);


		message.channel.send({ embeds: [embed] });
	}


	/**
	 * Function for receiving interaction.
	 * @param {bot} bot The instantiating client
	 * @param {interaction} interaction The interaction that ran the command
	 * @param {guild} guild The guild the interaction ran in
	 * @readonly
	*/
	async callback(bot, interaction, guild) {

		function prettyBytes(bytes) {
			const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			if (bytes === 0) return 'n/a';
			const by = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
			if (by === 0) return `${bytes} ${sizes[by]}`;
			return `${(bytes / Math.pow(1024, by)).toFixed(1)} ${sizes[by]}`;
		}
		const totalram = prettyBytes(os.totalmem());
		const freeram = prettyBytes(os.freemem());
		const usedram = prettyBytes(os.totalmem() - os.freemem());
		const prctfreeram = (((os.freemem() * 100) / os.totalmem + ' ').split('.')[0]);

		let seconds = Math.floor(os.uptime);
		let minutes = Math.floor(seconds / 60); seconds %= 60;
		let hours = Math.floor(minutes / 60); minutes %= 60;
		const days = Math.floor(hours / 24); hours %= 24;
		const embed = new Embed(bot, guild)
			.setTitle('Statistics')
			.setDescription('Stats of the System')
			.addFields(
				{ name: 'Server Name', value: os.hostname(), inline: true },
				{ name: 'Memory (RAM)', value: `Total Memory: ${totalram}\nUsed Memory: ${usedram}\nFree Memory: ${freeram}\nPercentage Of Free Memory: ${prctfreeram}%`, inline: true },
				{ name: 'CPU', value: os.cpus()[0].model, inline: true },
				// { name: 'Distro', value: si.osInfo(), inline: true },
				{ name: 'OS', value: os.version(), inline: true },
				{ name: 'OS Release', value: os.release(), inline: true },
				{ name: 'Uptime', value: `${days} days | ${hours} hours | ${minutes} minutes| ${seconds} seconds`, inline: true },
				{ name: 'CPU Load', value: os.loadavg().map(i => `${i}`).join(','), inline: true },
			);


		return interaction.reply({ embeds: [embed] });
	}

}
module.exports = sinfo;
