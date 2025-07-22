
import React from 'react';
import type { Conversation } from '../types';
import { PlusIcon, TrashIcon, CalculatorIcon, ImageIcon } from './IconComponents';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  activeView: 'chat' | 'calculator' | 'imageGenerator';
  onSelectView: (view: 'chat' | 'calculator' | 'imageGenerator') => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  activeView,
  onSelectView,
}) => {

  const NavItem: React.FC<{
    label: string;
    view: 'calculator' | 'imageGenerator';
    icon: React.ReactNode;
  }> = ({ label, view, icon }) => (
    <button
      onClick={() => onSelectView(view)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        activeView === view
          ? 'bg-slate-700 text-white'
          : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <aside className="w-64 bg-slate-800 p-3 flex flex-col border-r border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-200">History</h2>
        <button
          onClick={onNewConversation}
          className="p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
          title="New Chat"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 -mr-3 space-y-1">
        {conversations.map(convo => (
          <div key={convo.id} className="group relative">
            <button
              onClick={() => onSelectConversation(convo.id)}
              title={convo.title}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-colors ${
                activeConversationId === convo.id && activeView === 'chat'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {convo.title}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteConversation(convo.id);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 rounded-md opacity-0 group-hover:opacity-100 hover:bg-slate-600 hover:text-red-400 transition-opacity"
              title="Delete chat"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-700/50 space-y-2">
         <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Tools</h3>
         <NavItem label="Finance Calculator" view="calculator" icon={<CalculatorIcon className="w-5 h-5" />} />
         <NavItem label="Image Generator" view="imageGenerator" icon={<ImageIcon className="w-5 h-5" />} />
      </div>
    </aside>
  );
};

export default Sidebar;