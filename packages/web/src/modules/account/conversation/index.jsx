import React, { useEffect, useRef } from 'react';
import useTheme from '../../../hooks/useTheme';
import styles from './index.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ChatContainer from './chat-container';
import SeletedLanguage from '../../../components/SelectedLanguage';
import RiveBot from '../../../components/RiveBot';
import micImg from '../../../assets/images/mic.svg';
import trashImg from '../../../assets/images/trash.svg';
import sendImg from '../../../assets/images/send.svg';
import pauseImg from '../../../assets/images/pause.svg';
import { convertSecToMin } from '../../../lib/utils';
import useSendAudioFile from '../../../hooks/account/useSendAudio';
import useMediaRecorder from '@wmik/use-media-recorder';
import Loader from '../../../components/Loader';
import toast, { Toaster } from 'react-hot-toast';

function Conversation() {
  const navigate = useNavigate();
  const sendAudio = useSendAudioFile();
  let {
    status,
    mediaBlob: audioResult,
    stopRecording,
    pauseRecording,
    startRecording,
    resumeRecording,
    clearMediaBlob,
  } = useMediaRecorder({
    recordScreen: false,
    blobOptions: { type: 'audio/wav' },
    mediaStreamConstraints: { audio: true, video: false },
  });
  const [language, setLanguage] = React.useState('English');
  const error = (message) => toast.error(message);

  const [chats, setChats] = React.useState([]);
  const context = useTheme();
  const chatRef = useRef(null);

  useEffect(() => {
    handleScroll();
  }, [chats]);

  const handleScroll = () => {
    setTimeout(() => {
      chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  };

  const submitAudioHandler = async () => {
    stopRecording();

    const soln = new FormData();
    soln.append('file', audioResult);
    soln.append('language', language);

    sendAudio
      .mutateAsync(soln)
      .then((res) => {
        const { botReply, correctedText, createdAt, transcribedAudioText, updatedAt, language } =
          res.data.data.botResponse;
        setChats((prevState) => [
          ...prevState,
          {
            botReply,
            correctedText,
            createdAt,
            language,
            transcribedAudioText,
            updatedAt,
          },
        ]);
      })
      .catch((err) => {
        error(err?.response?.data?.message);
      });

    clearMediaBlob();
  };

  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen space-y-6 flex flex-col ${styles._convo} ${
        context.theme === 'dark' ? styles.convo_theme : null
      } `}
    >
      {sendAudio.isLoading && <Loader />}
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col justify-center px-4 pt-10">
        <div className="text-center space-y-14">
          {chats.length === 0 ? (
            <>
              <div className="mx-auto w-36 flex items-center justify-center">
                <RiveBot size="large" />
              </div>
              <div className="space-y-4">
                <h2
                  className={`text-lg ${
                    context.theme === 'dark' ? 'text-[#ffffff]' : 'text-[#262626]'
                  }  leading-relaxed sm:text-3xl`}
                >
                  What would you like to say today?
                </h2>
                <p
                  className={` ${
                    context.theme === 'dark' ? 'text-[#ffffff]' : 'text-slate-600'
                  } text-md sm:text-[17px]`}
                >
                  Each conversation bring you closer to fluency.
                </p>
                <div>
                  <SeletedLanguage language={language} setLanguage={setLanguage} />
                </div>
              </div>
            </>
          ) : (
            <ChatContainer chats={chats} />
          )}
          <div>
            <div className="mx-auto flex items-center justify-center" ref={chatRef}>
              <button
                onClick={() => {
                  console.log(status);
                  status === 'idle' || status === 'stopped' ? startRecording() : null;
                }}
                className={`rounded-full h-20 w-20 bg-[#5D387F] flex items-center justify-center focus:outline-none focus:ring focus:border-[#5D387F] transition ease-in-out ${
                  status === 'recording' ? styles._bot_mic : ''
                }`}
              >
                <img src={micImg} alt="" className="max-w-full" />
                <span style={{ '--i': 0 }}></span>
                <span style={{ '--i': 1 }}></span>
                <span style={{ '--i': 2 }}></span>
                <span style={{ '--i': 3 }}></span>
              </button>
            </div>
            <div className="pt-10 h-28">
              <AnimatePresence mode="wait">
                <motion.div key={status} e initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {status === 'idle' ? (
                    <>
                      {chats.length === 0 ? (
                        <p className="text-[#262626]">Tap the Microphone to begin</p>
                      ) : (
                        <button
                          className="px-7 rounded-xl py-2 border border-[#5D387F]"
                          onClick={() => navigate('/signin')}
                        >
                          Exit
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="pb-10">
                      <p>{convertSecToMin('30')}</p>
                      <div className="flex items-center justify-center space-x-6 pt-5">
                        <button
                          className="h-6 w-6 rounded-full flex justify-center items-center"
                          onClick={() => stopRecording()}
                        >
                          <img src={trashImg} alt="" className="w-full" />
                        </button>
                        <button
                          className="h-6 w-6 rounded-full flex justify-center items-center"
                          onClick={() => (status === 'paused' ? resumeRecording() : pauseRecording())}
                        >
                          <img src={pauseImg} alt="" className="w-full" />
                        </button>
                        <button
                          className="h-6 w-6 rounded-full flex justify-center items-center"
                          onClick={submitAudioHandler}
                        >
                          <img src={sendImg} alt="" className="w-full" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </motion.div>
  );
}

export default Conversation;
