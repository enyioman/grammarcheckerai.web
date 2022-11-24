import React from 'react';
import PropTypes from 'prop-types';
import Chat from '../../../components/Chat';
import Audio from '../../../components/Audio';
import { getFontSize } from '../../../hooks/useCustomFont';

function ChatContainer() {
  const [fontSize] = getFontSize();

  return (
    <div
      className="w-full max-w-7xl mx-auto flex flex-col justify-center px-4 space-y-3"
      style={{ fontSize: `${fontSize}px` }}
    >
      <div className="flex items-center justify-end pr-14">
        <Audio />
      </div>
      <Chat isLastReply />
      <Chat isBot />
      <Chat isBot isCorrection isLastReply />
    </div>
  );
}

ChatContainer.propTypes = {
  chats: PropTypes.array,
};

export default ChatContainer;
