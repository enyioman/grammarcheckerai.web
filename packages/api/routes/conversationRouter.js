const express = require("express");
const conversationRouter = express.Router();
const getBotResponse = require("../controller/sendAudioController.js");
const endConversation = require("../controller/endConversationController");
const startConversation = require("../controller/startConversationController");
const uploadFile = require("../middlewares/audio.middleware.js");
const create = require("../middlewares/s3.js");
const uploadAudio = require("../middlewares/s3Bucket.js");
const saveAudio = require("../controller/uploadAudioController.js");

conversationRouter.post("/createBucket", create);
conversationRouter.post("/uploadAudio", uploadAudio.single("file"), saveAudio);
conversationRouter.get("/start", startConversation);
conversationRouter.get("/end", endConversation);
conversationRouter.post("/sendAudio", uploadFile, getBotResponse);

module.exports = conversationRouter;
