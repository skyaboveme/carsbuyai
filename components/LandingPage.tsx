import React from 'react';
import { CarIcon, MessageSquareIcon, CalculatorIcon, SearchIcon, StarIcon } from './IconComponents';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-y-auto">
      {/* Hero Section */}
      <div className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CarIcon className="w-16 h-16 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="gradient-text">CarsBuyAI.com</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Your AI-powered car buying assistant that helps you research, shop for, and negotiate the perfect vehicle deal with cutting-edge artificial intelligence.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Car Shopping with AI
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-16 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose CarsBuyAI?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<MessageSquareIcon className="w-8 h-8 text-blue-400" />}
              title="AI Chat Assistant"
              description="Chat with Carla, your personal AI assistant who understands cars and helps you find exactly what you need."
            />
            <FeatureCard
              icon={<SearchIcon className="w-8 h-8 text-green-400" />}
              title="Real-time Search"
              description="Search thousands of real car listings from major automotive sites with up-to-date pricing and availability."
            />
            <FeatureCard
              icon={<StarIcon className="w-8 h-8 text-yellow-400" />}
              title="TruePrice Analysis"
              description="Get AI-powered pricing analysis with deal scores from 1-10 and estimated market values for every car."
            />
            <FeatureCard
              icon={<CalculatorIcon className="w-8 h-8 text-purple-400" />}
              title="Smart Finance Tools"
              description="Calculate payments, negotiate deals, and understand financing options with built-in calculators and AI guidance."
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="space-y-8">
            <Step
              number={1}
              title="Tell Carla What You Want"
              description="Describe your ideal car, budget, and preferences to your AI assistant."
            />
            <Step
              number={2}
              title="AI Finds Real Listings"
              description="Our AI searches thousands of real car listings and analyzes market data in real-time."
            />
            <Step
              number={3}
              title="Get TruePrice Analysis"
              description="Each car gets a deal score and market analysis so you know if it's priced fairly."
            />
            <Step
              number={4}
              title="Negotiate Like a Pro"
              description="Let our AI negotiation agent help you get the best possible deal."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-16 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of smart car buyers who trust AI to help them make better purchasing decisions.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started Now - It's Free!
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8 bg-slate-900 border-t border-slate-700">
        <div className="max-w-4xl mx-auto text-center text-slate-400">
          <p>&copy; 2024 CarsBuyAI.com. Made with ❤️ for smart car shoppers.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="glass rounded-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <p className="text-slate-300 text-sm">{description}</p>
  </div>
);

const Step: React.FC<{
  number: number;
  title: string;
  description: string;
}> = ({ number, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  </div>
);

export default LandingPage;