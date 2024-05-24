// Dependencies
const express = require('express'),
	router = express.Router();

module.exports = (bot) => {
	// statistics page
	router.get('/', async (req, res) => {

		// check for ID query
		if (req.query.ID && req.query.guilds) {
			const guilds = req.query.guilds.split(',');
			await Promise.all(guilds.map(async g => {
				const gs = await bot.guilds.cache.get(g)?.members.fetch(req.query.ID);
				if (!gs) guilds.splice(guilds.indexOf(g), 1);
			}));
			res.status(200).json({ guilds });
		}

		if (req.query.ID && !req.query.guilds) {
			let user;
			try {
				user = await bot.users.fetch(req.query.ID);
			} catch (err) {
				console.log('Not a valid user ID')
			}
			if (!user) return res.status(200).json({ error: 'Invalid user ID' });;

			res.status(200).json({ user });
		}
	});

	return router;
};
