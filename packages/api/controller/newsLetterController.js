const { userCollection } = require('../database/models/userSchema');
const { response } = require("../utilities/response");

exports.updateIsSubscribed = async (req, res) => {
	const { is_subscribed, email } = req.query;

	try {
		const user = await userCollection.findOne({ 
			where: { email }
		})

		if(!user) {
			return true;
		}

		await user.updateOne({
			is_subscribed: is_subscribed
		})

		return true;
	} catch(err) {
		console.log(err)
		return res.status(500).json(
      response({
        message: "Something went wrong wile processing this request",
        success: false,
      })
    );
	}
}