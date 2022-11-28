const { Router } = require("express");
const { updateIsSubscribed } = require("../controller/newsLetterController");
const newsletterRouter = Router();

newsletterRouter.put('/newsletter/confirm?', updateIsSubscribed)

module.exports = newsletterRouter;