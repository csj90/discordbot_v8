/* eslint-disable no-undef */
// Dependencies
const Command = require('../../structures/Command.js');
const { Embed } = require('../../utils');
const { ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');

/**
/**
 * CustomCommand command
 * @extends {Command}
*/
class wave extends Command {
	/**
      * @param {Client} client The instantiating client
      * @param {CommandData} data The data for the command
    */
	constructor(bot) {
		// MORE COMMAND SETTINGS CAN BE FOUND IN src/structures/Command
		super(bot, { name: 'wave',
			guildOnly: true,
			dirname: __dirname,
			aliases: ['wave','waves'],
			description: 'Sends a waves to user .',
			usage: 'waves mention user',
			cooldown: 2000,
			examples: ['waves'],
			// set to false if u don't want it a slash command VV
			slash: true,
			// The options for slash command https://discord.js.org/#/docs/discord.js/main/typedef/ApplicationCommandOption
			options: [{
				name: 'user',
				description: 'Sends a wave to user ',
				type: ApplicationCommandOptionType.User,
				required: true,
			}],
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
		const hug_url = 'https://waifu.pics/api/sfw/wave';


		try {
			const { data: { url } } = await axios.get(hug_url);
			const embed = new Embed(bot, message.guild)
				.setTitle(`@${message.author.username} waves @${message.mentions.users.first().username || message.mentions.members.first()}`)
				.setImage(url);

			message.channel.send({ embeds: [embed] });
		} catch (e) {
			console.log(e);
			return message.channel.send('An error occured!');

		}
	}
	/**
     * Function for receiving interaction.
     * @param {bot} bot The instantiating client
     * @param {interaction} interaction The interaction that ran the command
     * @param {guild} guild The guild the interaction ran in
     * @readonly
    */
	async callback(bot, interaction, guild) {
		const hug_url = 'https://waifu.pics/api/sfw/wave';


		try {
			const { data: { url } } = await axios.get(hug_url);
			const mentioned = interaction.options.getUser('user');
			const embed = new Embed(bot, guild)
				.setDescription(`<@${interaction.user.id}> wave <@${mentioned.id}>`)
				.setImage(url);

			return interaction.reply({ embeds: [embed] });
		} catch (e) {
			console.log(e);
			return interaction.reply('An error occured!');
		}
	}
}
module.exports = wave;
