import React, { useEffect, useRef } from 'react';
import type { Conversation } from '../types';
import { AI_WELCOME_MESSAGE } from '../constants';
import Message from './Message';
import ChatInput from './ChatInput';
import PromptSuggestions from './PromptSuggestions';

const PROMPT_SUGGESTIONS = [
  "Help me find the perfect car",
  "What's a fair price for a used Toyota RAV4?",
  "Should I get a pre-purchase inspection?",
];

interface ChatWindowProps {
  conversation: Conversation | null;
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, isLoading, onSendMessage }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages, isLoading]);

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        Select a conversation or start a new one.
      </div>
    );
  }

  const showSuggestions = conversation.messages.length === 1 && conversation.messages[0].id === AI_WELCOME_MESSAGE.id;

  return (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-5xl mx-auto">
          {conversation.messages.map((msg) => (
            <Message key={msg.id} message={msg} onSendMessage={onSendMessage} />
          ))}
          {showSuggestions && !isLoading && (
            <PromptSuggestions 
              suggestions={PROMPT_SUGGESTIONS} 
              onSelectSuggestion={onSendMessage} 
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;