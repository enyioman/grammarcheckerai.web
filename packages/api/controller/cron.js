const Cron = require('node-cron');
const { userCollection } = require('../database/models/userSchema');
const emailService = require('../services/email.service');
const { environment } = require('../config/environment');

class CronJobs {
	constructor() {

		let subscribe_news_letter = Cron.schedule("* * * * *", () => {
			this.subscribeNewsLetter();
		})

		subscribe_news_letter.start();
	}

	async subcribeNewsLetter() {
		try {
			const unsubscribed_users = await userCollection.findAll({
				where: { is_subscribed: null }
			})

			if(unsubscribed_users.length < 1) {
				return true
			}
			
			for (let i = 0; i < unsubscribed_users.length; i++) {
				const confirmation_url = `${BASE_URL}/v1/newsletter/confirm?is_subscribed=${params}&email=${unsubscribed_users[i].email}`;
				await emailService({
					to: unsubscribed_users[i].email,
					subject: "Subscribe to our newsletter",
					templateId: SUBSCRIBE_TEMPLATE_ID,
					data: {
						name: unsubscribed_user[i].firstName || 'DEAR ESTEEMED CUSTOMER',
						action_url: confirmation_url,
					},
				});
			}
		} catch (err) {
			console.log(err)
		}
	}

	async sendNewsLetter() {
		try {
			const subscribed_users = await userCollection.findAll({
				where: { is_subscribed: true }
			})
			if(subscribed_users.length < 1) {
				return true
			}
			
			for (let i = 0; i < unsubscribed_users.length; i++) {
				await emailService({
					to: subscribed_users[i].email,
					subject: "Newsletter",
					templateId: NEWSLETTER_TEMPLATE_ID,
					data: {
						name: subscribed_user[i].firstName || 'DEAR ESTEEMED CUSTOMER'
					},
				});
			}

		} catch(err) {
			console.log(err)
		}
	}
}

module.exports = CronJobs;