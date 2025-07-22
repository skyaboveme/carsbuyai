
import React from 'react';
import { CarIcon } from './IconComponents';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm p-4 border-b border-slate-700/50 shadow-md z-10">
      <div className="max-w-5xl mx-auto flex items-center gap-3">
        <CarIcon className="w-8 h-8 text-blue-400" />
        <h1 className="text-2xl font-bold text-slate-100 tracking-wide">
          CarsBuyAI<span className="text-blue-400">.com</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
