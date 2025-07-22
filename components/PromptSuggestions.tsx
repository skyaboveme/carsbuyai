import React from 'react';

interface PromptSuggestionsProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

const ENHANCED_SUGGESTIONS = [
  {
    text: "Find me a reliable SUV under $30k",
    category: "🔍 Search",
    description: "Let AI find the perfect SUV within your budget"
  },
  {
    text: "What's a fair price for a 2020 Honda CR-V with 50k miles?",
    category: "💰 Pricing",
    description: "Get instant market analysis and deal scores"
  },
  {
    text: "Help me negotiate a better deal on this car",
    category: "🤝 Negotiate",
    description: "Get professional negotiation scripts and strategies"
  },
  {
    text: "Show me the best electric cars for families",
    category: "🔋 Electric",
    description: "Discover top-rated EVs perfect for family use"
  },
  {
    text: "Calculate my monthly payment for a $25,000 car",
    category: "📊 Finance",
    description: "Instant loan calculations with different scenarios"
  },
  {
    text: "What should I inspect before buying a used car?",
    category: "🔧 Inspection",
    description: "Get a comprehensive pre-purchase checklist"
  }
];

const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ suggestions, onSelectSuggestion }) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-slate-200 mb-2">
          ✨ Try asking Carla about:
        </h3>
        <p className="text-slate-400 text-sm mb-6">
          Click any suggestion below or type your own question
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {ENHANCED_SUGGESTIONS.map((suggestion, index) => (
          <SuggestionCard
            key={index}
            suggestion={suggestion}
            onSelect={() => onSelectSuggestion(suggestion.text)}
          />
        ))}
      </div>

      <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
        <h4 className="font-semibold text-slate-200 mb-2">💡 Pro Tips:</h4>
        <ul className="text-sm text-slate-400 space-y-1">
          <li>• Be specific about your budget, location, and preferences</li>
          <li>• Ask for TruePrice analysis to see if deals are fair</li>
          <li>• Use negotiation mode when you're ready to make an offer</li>
          <li>• Try the finance calculator for payment estimates</li>
        </ul>
      </div>
    </div>
  );
};

const SuggestionCard: React.FC<{
  suggestion: { text: string; category: string; description: string };
  onSelect: () => void;
}> = ({ suggestion, onSelect }) => (
  <button
    onClick={onSelect}
    className="group text-left p-4 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 hover:border-blue-500/50 rounded-lg transition-all duration-200 hover:transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
  >
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xs font-semibold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
        {suggestion.category}
      </span>
    </div>
    <h4 className="font-medium text-slate-200 mb-1 group-hover:text-white">
      {suggestion.text}
    </h4>
    <p className="text-xs text-slate-400 group-hover:text-slate-300">
      {suggestion.description}
    </p>
  </button>
);

export default PromptSuggestions;
