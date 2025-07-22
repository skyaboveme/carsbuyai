import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import { ImageIcon } from './IconComponents';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A red convertible sports car driving on a coastal road at sunset');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const url = await generateImage(prompt);
      setImageUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto w-full">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">AI Car Image Generator</h1>
          <p className="text-slate-400">Describe any car you can imagine, and watch it come to life.</p>
        </header>
        
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A futuristic electric pickup truck in a forest"
            disabled={isLoading}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-6 py-3 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                <span>Generating...</span>
              </>
            ) : (
                <>
                    <ImageIcon className="w-5 h-5"/>
                    <span>Generate Image</span>
                </>
            )}
          </button>
        </form>

        <div className="w-full aspect-video bg-slate-800/50 rounded-lg flex items-center justify-center border border-slate-700/50 overflow-hidden">
          {isLoading && (
             <div className="text-center text-slate-400">
                <p className="text-lg">Generating your vision...</p>
                <p className="text-sm">This may take a moment.</p>
             </div>
          )}
          {error && <p className="text-red-400 px-4 text-center">{error}</p>}
          {imageUrl && <img src={imageUrl} alt={prompt} className="object-contain w-full h-full" />}
          {!isLoading && !error && !imageUrl && (
            <div className="text-center text-slate-500 p-4">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 text-slate-600"/>
              <p>Your generated image will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
