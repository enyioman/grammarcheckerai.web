const routeHandler = require("express").Router();
const { userHandler } = require("../routes/user.routes.js");
const { auth } = require("../routes/auth.routes");
const conversationRouter = require("./conversationRouter");
const testRoute = require("./testRoutes");
const quizRoute = require("./quizRoutes");
const contactRoute = require("./contactRoutes");
const verify = require("../middlewares/auth.middleware");
const quickTranscribe = require("./quickTranscribeRouter");
const newsletter = require("../routes/newsLetterRoute");
<<<<<<< HEAD
const newsletterSubscription = require("../routes/newsLetterSubscriptionRoute")
=======
const reviewRating = require('../routes/reviewRatingRoute')
const leaderBoardRouter = require("../routes/leaderboardrouter");
const paystackRouter = require("./paystackRouter");

>>>>>>> 303c9432093648c05d76f021345261b52f0254d3

routeHandler.use("/auth", auth);
routeHandler.use("/user", verify, userHandler);
routeHandler.use("/conversation", conversationRouter);
routeHandler.use("/test", testRoute);
routeHandler.use("/quiz", quizRoute);
routeHandler.use("/quickTranscribe", quickTranscribe);
routeHandler.use("/contact", contactRoute);
routeHandler.use("/newsletter", newsletter);
routeHandler.use("/subscribe", newsletterSubscription);

routeHandler.use("/rating", reviewRating)

routeHandler.use("/leaderboard", leaderBoardRouter);
routeHandler.use("/paystack", paystackRouter);


module.exports = { routeHandler };
