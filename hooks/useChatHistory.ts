import { useState, useEffect, useMemo } from 'react';
import type { Conversation, Message } from '../types';
import { Sender } from '../types';
import { AI_WELCOME_MESSAGE } from '../constants';

const LOCAL_STORAGE_KEY = 'car-buying-chat-history';

// Helper to generate a title from the first user message
const generateTitle = (messages: Message[]): string => {
  const firstUserMessage = messages.find(m => m.sender === Sender.USER);
  if (firstUserMessage) {
    return firstUserMessage.text.split(' ').slice(0, 5).join(' ').replace(/[?.,!]$/, '') + '...';
  }
  return 'New Chat';
};


export const useChatHistory = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Load from localStorage on initial render
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedHistory) {
        const parsedHistory: Conversation[] = JSON.parse(storedHistory);
        if (parsedHistory.length > 0) {
          setConversations(parsedHistory);
          // Set the most recent conversation as active
          setActiveConversationId(parsedHistory[0].id); 
        } else {
          startNewConversation();
        }
      } else {
        startNewConversation();
      }
    } catch (error) {
      console.error("Failed to parse chat history from localStorage", error);
      startNewConversation();
    }
  }, []);

  // Save to localStorage whenever conversations change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(conversations));
    } else {
      // If all conversations are deleted, clear the storage
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [conversations]);

  const activeConversation = useMemo(() => {
    return conversations.find(c => c.id === activeConversationId) || null;
  }, [conversations, activeConversationId]);

  const startNewConversation = () => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: 'New Chat',
      messages: [AI_WELCOME_MESSAGE],
      createdAt: Date.now(),
    };
    // Add to the top of the list
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };
  
  const deleteConversation = (id: string) => {
    if (window.confirm('Are you sure you want to delete this chat? This action cannot be undone.')) {
        setConversations(prev => {
        const remaining = prev.filter(c => c.id !== id);
        if (remaining.length === 0) {
            const newConv = {
            id: `conv-${Date.now()}`,
            title: 'New Chat',
            messages: [AI_WELCOME_MESSAGE],
            createdAt: Date.now(),
            };
            setActiveConversationId(newConv.id);
            return [newConv];
        }
        
        if (activeConversationId === id) {
            setActiveConversationId(remaining[0].id);
        }
        return remaining;
        });
    }
  };

  const updateConversationState = (conversationId: string, updateFn: (conv: Conversation) => Conversation) => {
    setConversations(prev =>
      prev.map(c => (c.id === conversationId ? updateFn(c) : c))
    );
  };

  const addMessageToConversation = (conversationId: string, message: Message) => {
    updateConversationState(conversationId, conv => {
      const newMessages = [...conv.messages, message];
      // Generate title if it's the first user message
      const newTitle = conv.title === 'New Chat' ? generateTitle(newMessages) : conv.title;
      return { ...conv, messages: newMessages, title: newTitle };
    });
  };
  
  const updateMessageInConversation = (
    conversationId: string,
    messageId: string,
    updates: Partial<Omit<Message, 'id' | 'sender'>>
  ) => {
    updateConversationState(conversationId, conv => ({
      ...conv,
      messages: conv.messages.map(m =>
        m.id === messageId ? { ...m, ...updates } : m
      ),
    }));
  };

  return {
    conversations,
    activeConversation,
    setActiveConversationId,
    startNewConversation,
    addMessageToConversation,
    updateMessageInConversation,
    deleteConversation,
  };
};