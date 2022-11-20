import React from 'react';
import PropTypes from 'prop-types';
import botImg from '../../assets/images/bot.svg';
import userImg from '../../assets/images/user.svg';

function Chat({ isBot, isCorrection, timestamp = '11:20 AM', isLastReply }) {
  return (
    <div className={`flex max-w-md items-center align-text-bottom space-x-1 ${isBot ? 'mr-auto' : 'ml-auto '}`}>
      <div className="order-1">
        <div
          className={`p-4 rounded-xl  border border-[#5D387F] space-y-4 ${
            isBot ? 'rounded-bl-none' : 'rounded-br-none'
          }`}
        >
          {isCorrection && <p className="font-bold text-lg">Correction</p>}
          <p className={`${isCorrection ? 'text-[#279371]' : ''}`}>
            “I was doing very good although my sleeping didn’t go very well because i sleeping very late and woken up
            too easily ”
          </p>
        </div>
        <p className={`text-sm mb-2 text-slate-800 pt-1 ${isBot ? 'text-right' : ''}`}>{timestamp}</p>
      </div>

      {isLastReply && (
        <div className={`mt-auto ${isBot ? 'w-32' : 'order-1 w-24'} `}>
          <img src={isBot ? botImg : userImg} alt="" className="w-full" />
        </div>
      )}
    </div>
  );
}

Chat.propTypes = {
  isBot: PropTypes.bool,
  isCorrection: PropTypes.bool,
  text: PropTypes.string,
  timestamp: PropTypes.string,
  isLastReply: PropTypes.bool,
};
export default Chat;
