const { environment } = require('../config/environment');
const { userCollection } = require('../database/models/userSchema');
const emailService = require('../services/email.service');
const cron = require('node-cron');
/*
write a function that gets all user that is_suscribe col is set to null
send an email asking them to suscribe.

create a file called cronjob

have an option to suscribe or reject
provide a url for the front
*/
exports.get_user = async (req, res) => {
  const user = await userCollection.findOne({ is_suscribed: null })

}


exports.suscribe_email = async (req, res) => {
  const { email } = req.body

  const user = await userCollection.findOne({ email })

  if (!user) {
    user.firstName = 'Dear User'
  }

  const confNum = randNum();
  const params = new URLSearchParams({
    conf_num: confNum,
    email: req.body.email,
  });

  const confirmationURL = `${BASE_URL}/v1/confirm? ${params}`;
  // const msg = {
  //   to: req.body.email, // Change to your recipient
  //   from: 'akan.otong@pmt.ng', // Change to your verified sender
  //   subject: `Confirm your subscription to our newsletter`,
  //   html: `Hello ${req.body.email},<br>Thank you for subscribing to our newsletter. Please complete and confirm your subscription by <a href="${confirmationURL}"> clicking here</a>.`
  // }

  await emailService({
    to: email,
    from: 'SENDER_EMAIL', // Change to your verified sender
    subject: "Confirm your subscription to our newsletter",
    templateId: NEWSLETTER_TEMPLATE_ID,
    data: {
      name: user.firstName,
      action_url: reset_password_url,
    },
  });

  cron.schedule('* * * * *', function () {
    // await addContact(req.body.email, confNum);
    // await sgMail.send(emailService);
    return res
      .status(200)
      .json({ message: 'Thank you for signing up for our newsletter! Please complete the process by confirming the subscription in your email inbox.' });
  });
};
