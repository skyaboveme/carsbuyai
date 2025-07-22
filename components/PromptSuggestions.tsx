import React from 'react';

interface PromptSuggestionsProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ suggestions, onSelectSuggestion }) => {
  return (
    // Add left margin to align with the AI chat bubble above.
    // The alignment is based on the AiIcon (w-8 = 2rem) and the gap (gap-3 = 0.75rem) in Message.tsx
    <div className="ml-[2.75rem] py-2">
        <div className="flex flex-wrap items-start gap-2">
            {suggestions.map((suggestion, index) => (
            <button
                key={index}
                onClick={() => onSelectSuggestion(suggestion)}
                className="bg-slate-700/50 hover:bg-slate-700 text-slate-200 text-sm font-medium py-2 px-4 rounded-full transition-colors duration-200 ease-in-out border border-slate-600"
                aria-label={`Send prompt: ${suggestion}`}
            >
                {suggestion}
            </button>
            ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;
