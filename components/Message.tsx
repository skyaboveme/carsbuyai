import React from 'react';
import type { Message as MessageType } from '../types';
import { Sender } from '../types';
import { AiIcon, UserIcon } from './IconComponents';
import CarListingCard from './CarListingCard';

interface MessageProps {
  message: MessageType;
  onSendMessage?: (message: string) => void;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
    </div>
);

const Message: React.FC<MessageProps> = ({ message, onSendMessage }) => {
  const isAI = message.sender === Sender.AI;

  const wrapperClasses = `flex items-start gap-3 my-4 ${
    isAI ? 'justify-start' : 'justify-end'
  }`;
  const bubbleClasses = `max-w-lg lg:max-w-xl px-4 py-3 rounded-2xl shadow-md ${
    isAI
      ? 'bg-slate-700 text-slate-200 rounded-bl-none'
      : 'bg-blue-600 text-white rounded-br-none'
  }`;
  const iconClasses = 'w-8 h-8 p-1 rounded-full shrink-0';
  const iconWrapperClasses = `${isAI ? 'bg-slate-600 text-slate-300' : 'bg-blue-500 text-white'} ${iconClasses}`;

  const Icon = isAI ? AiIcon : UserIcon;
  const showListings = isAI && message.listings && message.listings.length > 0;

  return (
    <div className={wrapperClasses}>
      {isAI && <Icon className={iconWrapperClasses} />}
      <div className="flex flex-col w-full max-w-lg lg:max-w-2xl">
        <div className={bubbleClasses}>
          {message.text === '...' ? <TypingIndicator /> : <p className="whitespace-pre-wrap">{message.text}</p>}
        </div>

        {showListings && onSendMessage && (
          <div className="mt-3 w-full">
            <div className="flex overflow-x-auto space-x-4 py-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
              {message.listings?.map((listing, index) => (
                <CarListingCard 
                  key={index} 
                  listing={listing}
                  onStartNegotiation={onSendMessage}
                />
              ))}
              <div className="flex-shrink-0 w-1"></div>
            </div>
          </div>
        )}

        {message.sources && message.sources.length > 0 && !showListings && (
          <div className="mt-3 pt-3 border-t border-slate-600/50 max-w-lg lg:max-w-xl px-4">
            <h4 className="text-xs font-semibold text-slate-400 mb-1.5">Sources:</h4>
            <ul className="space-y-1.5">
              {message.sources.map((source, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-blue-400/80 mt-1">&#8226;</span>
                  <a
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline break-all"
                    title={source.uri}
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {!isAI && <Icon className={iconWrapperClasses} />}
    </div>
  );
};

export default Message;