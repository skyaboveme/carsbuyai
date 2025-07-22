
import React, { useState } from 'react';
import { SendIcon } from './IconComponents';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="bg-slate-800/70 p-4 border-t border-slate-700/50 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your next car..."
          disabled={isLoading}
          className="flex-1 bg-slate-700 border border-slate-600 rounded-full py-3 px-5 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-full p-3 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label="Send message"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-t-2 border-white border-solid rounded-full animate-spin"></div>
          ) : (
            <SendIcon className="w-6 h-6" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
