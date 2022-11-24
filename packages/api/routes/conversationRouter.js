const express = require('express');
const conversationRouter = express.Router();
const getBotResponse = require('../controller/sendAudioController.js');
const endConversation = require('../controller/endConversationController');
const startConversation = require('../controller/startConversationController');
const uploadFile = require('../middlewares/audio.middleware.js');
const {
  userConversationAccess,
} = require('../middlewares/UserRestriction/userAccessControl');

conversationRouter.get('/start', userConversationAccess, startConversation);
conversationRouter.get('/end', endConversation);
conversationRouter.post('/sendAudio', uploadFile, getBotResponse);

module.exports = conversationRouter;
