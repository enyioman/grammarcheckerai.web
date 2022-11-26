const {
  uploadFileForURL,
  uploadFileUrlToInitiateTranscription,
  getTranscriptionFromAssembly,
} = require('../scripts/assemblyAi');
const grammarCheckHandler = require('../scripts/grammarCheck');

const quickTranscribe = async (req, res) => {
  try {
    const audioFile = req.file; // retrieves file buffer and metadata set by multer
    const dummyAudioUrl = req.file.originalname; // TODO: use aws s3 bucket file upload url

    console.log(audioFile);
    // checks if file is available
    if (!audioFile) {
      return res.status(400).send({
        success: false,
        message: 'Attach an audio file',
      });
    }

    // Send audio to Assembly AI to get audio transcription
    const assemblyAIAudioUrl = await uploadFileForURL(audioFile.buffer); // upload file and get url
    const getTranscriptionId = await uploadFileUrlToInitiateTranscription(
      assemblyAIAudioUrl
    ); // upload url and get transcription ID
    const transcribedAudioText = await getTranscriptionFromAssembly(
      getTranscriptionId
    ); // process and download transcript

    if (!transcribedAudioText) {
      return res.status(400).send({
        success: false,
        message: 'Assembly AI: Unknown error',
      });
    }

    // Send transcript to OPenAI Grammar Correction to get corrected text
    let grammarCheckResponse = await grammarCheckHandler(
      transcribedAudioText,
      'English'
    );

    // Handling OpenAI Grammar Correction Error
    if (!grammarCheckResponse) {
      return res.status(500).send({
        success: false,
        message: 'OpenAI internal error',
      });
    }

    const { correctUserResponseInTxt } = grammarCheckResponse;

    res.status(200).json({
      success: true,
      message: 'Message exchange successfully completed between user and bot',
      data: {
        userAudio: dummyAudioUrl,
        originalText: transcribedAudioText,
        correctedText: correctUserResponseInTxt,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

module.exports = quickTranscribe;
