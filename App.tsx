
import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FinanceCalculator from './components/FinanceCalculator';
import ImageGenerator from './components/ImageGenerator';
import LandingPage from './components/LandingPage';
import { useChatHistory } from './hooks/useChatHistory';
import type { Message, Source, CarListing } from './types';
import { Sender } from './types';
import { getChatResponseStream } from './services/geminiService';

// Regex to find a JSON code block
const JSON_FENCE_REGEX = /```json\s*([\s\S]*?)\s*```/;

const App: React.FC = () => {
  type View = 'landing' | 'chat' | 'calculator' | 'imageGenerator';
  const [activeView, setActiveView] = useState<View>('landing');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const {
    conversations,
    activeConversation,
    setActiveConversationId,
    startNewConversation,
    addMessageToConversation,
    updateMessageInConversation,
    deleteConversation,
  } = useChatHistory();
  
  const handleNewConversation = () => {
    startNewConversation();
    setActiveView('chat');
  };
  
  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    setActiveView('chat');
  };

  const handleGetStarted = () => {
    startNewConversation();
    setActiveView('chat');
  };

  const handleSendMessage = async (userText: string) => {
    if (isAiLoading || !activeConversation) return;

    const conversationId = activeConversation.id;
    // Make a clean copy of the history *before* adding the new messages for the UI
    const historyForApi = [...activeConversation.messages];

    setIsAiLoading(true);
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: userText,
      sender: Sender.USER,
    };
    addMessageToConversation(conversationId, userMessage);
    
    const aiResponseId = `ai-${Date.now()}`;
    const aiPlaceholderMessage: Message = {
      id: aiResponseId,
      text: '...',
      sender: Sender.AI,
      sources: [],
    };
    addMessageToConversation(conversationId, aiPlaceholderMessage);
    
    try {
      // Pass the clean history to the service
      const stream = await getChatResponseStream(historyForApi, userText);
      
      let fullResponseText = '';
      const collectedSources: Source[] = [];
      const sourceUris = new Set<string>();

      for await (const chunk of stream) {
        let hasNewContent = false;
        
        if (chunk.text) {
          fullResponseText += chunk.text;
          hasNewContent = true;
        }

        const groundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks) {
          for (const groundingChunk of groundingChunks) {
            if (groundingChunk.web?.uri && !sourceUris.has(groundingChunk.web.uri)) {
              sourceUris.add(groundingChunk.web.uri);
              collectedSources.push({
                uri: groundingChunk.web.uri,
                title: groundingChunk.web.title || groundingChunk.web.uri,
              });
              hasNewContent = true;
            }
          }
        }
        
        if (hasNewContent) {
          // Temporarily update with raw text during streaming
          updateMessageInConversation(conversationId, aiResponseId, { text: fullResponseText, sources: [...collectedSources] });
        }
      }

      // Helper to robustly parse and validate JSON
      const parseAndValidateListings = (jsonString: string): CarListing[] | null => {
        try {
          const parsedJson = JSON.parse(jsonString);
          if (Array.isArray(parsedJson) && parsedJson.length > 0 && parsedJson.every(item => 'make' in item && 'model' in item && 'truePrice' in item)) {
            return parsedJson;
          }
        } catch (e) {
          // Not valid JSON, ignore
        }
        return null;
      };

      // Final processing after stream is complete
      let finalMessageText = fullResponseText;
      let listings: CarListing[] = [];
      
      // Attempt 1: Find a fenced JSON block
      const jsonMatch = fullResponseText.match(JSON_FENCE_REGEX);
      let parsedListings: CarListing[] | null = null;
      
      if (jsonMatch && jsonMatch[1]) {
        parsedListings = parseAndValidateListings(jsonMatch[1]);
        if (parsedListings) {
          listings = parsedListings;
          finalMessageText = fullResponseText.replace(JSON_FENCE_REGEX, '').trim();
          // If there's no text left, provide a default
          if (!finalMessageText) {
              finalMessageText = "Here are the car listings I found for you:";
          }
        }
      } else {
        // Attempt 2: Check if the whole response is a valid JSON array of listings
        parsedListings = parseAndValidateListings(fullResponseText.trim());
        if (parsedListings) {
          listings = parsedListings;
          // The whole response was JSON, so we need some default text
          finalMessageText = "Here are the car listings I found for you:";
        }
      }


      if (!fullResponseText) {
        updateMessageInConversation(conversationId, aiResponseId, { text: "I'm sorry, I couldn't generate a response. Please try a different question."});
      } else {
        updateMessageInConversation(conversationId, aiResponseId, { 
          text: finalMessageText, 
          sources: collectedSources, 
          listings: listings 
        });
      }

    } catch (error) {
      console.error('Error sending message:', error);
      updateMessageInConversation(conversationId, aiResponseId, { text: 'Sorry, I encountered an error. Please try again.' });
    } finally {
      setIsAiLoading(false);
    }
  };
  
  const renderActiveView = () => {
    switch(activeView) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      case 'calculator':
        return <FinanceCalculator />;
      case 'imageGenerator':
        return <ImageGenerator />;
      case 'chat':
      default:
        return (
          <ChatWindow
            key={activeConversation?.id} // Re-mount component on conversation change
            conversation={activeConversation}
            isLoading={isAiLoading}
            onSendMessage={handleSendMessage}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white font-sans">
      {activeView !== 'landing' && <Header />}
      <div className="flex flex-1 overflow-hidden">
        {activeView !== 'landing' && (
          <Sidebar
            conversations={conversations}
            activeConversationId={activeConversation?.id || null}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
            onDeleteConversation={deleteConversation}
            activeView={activeView}
            onSelectView={setActiveView}
          />
        )}
        <main className={`${activeView === 'landing' ? 'w-full' : 'flex-1'} overflow-hidden bg-slate-900`}>
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default App;
