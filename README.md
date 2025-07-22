# CarsBuyAI.com - AI-Powered Vehicle Discovery Platform

<!-- Deployment trigger: 2025-07-22 12:59 -->

Find your perfect vehicle with our intelligent search platform powered by Google Gemini AI.

## 🌟 Features

- **AI Car Shopping Assistant**: Chat with Carla, your personal AI assistant, to find cars based on your preferences
- **Real-time Market Search**: Integrates with Google Search to find actual car listings from major automotive sites
- **TruePrice Analysis**: AI-powered pricing analysis that scores deals from 1-10 and provides market value estimates
- **Finance Calculator**: Built-in loan calculator to estimate monthly payments, interest, and total costs
- **Image Generation**: Generate custom car images using AI for visualization
- **Negotiation Assistant**: AI-powered negotiation agent that helps you get the best deal
- **Interactive Chat History**: Save and manage multiple car shopping conversations
- **Responsive Design**: Modern, mobile-friendly interface with beautiful animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Gemini API key (get one from [Google AI Studio](https://ai.google.dev))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/CarsBuyAI.com.git
   cd CarsBuyAI.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Gemini API Key Setup

1. Go to [Google AI Studio](https://ai.google.dev)
2. Create a new project or select an existing one
3. Generate an API key
4. Add the key to your `.env.local` file

### Customization

- **AI Instructions**: Modify `constants.ts` to customize Carla's behavior
- **Styling**: Update `index.css` or component styles for custom branding
- **Features**: Add new tools or modify existing ones in the components directory

## 📁 Project Structure

```
CarsBuyAI.com/
├── components/           # React components
│   ├── Header.tsx       # Main navigation header
│   ├── Sidebar.tsx      # Navigation and conversation history
│   ├── ChatWindow.tsx   # Main chat interface
│   ├── Message.tsx      # Chat message component
│   ├── CarListingCard.tsx # Car listing display
│   ├── FinanceCalculator.tsx # Loan calculator
│   └── ImageGenerator.tsx # AI image generation
├── services/            # External service integrations
│   └── geminiService.ts # Google Gemini AI integration
├── hooks/               # Custom React hooks
│   └── useChatHistory.ts # Chat state management
├── types.ts            # TypeScript type definitions
├── constants.ts        # AI system instructions
├── index.css          # Global styles
└── App.tsx            # Main application component
```

## 🛠 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **AI Integration**: Google Gemini AI
- **Build Tool**: Vite
- **Deployment**: Static site compatible

## 🚀 Deployment

### GitHub Pages

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   The built files in `dist/` can be deployed to any static hosting service.

### Other Hosting Options

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **AWS S3**: Upload the built files to an S3 bucket
- **Firebase Hosting**: Use Firebase CLI to deploy

### Environment Variables for Production

Make sure to set your `GEMINI_API_KEY` in your hosting platform's environment variables section.

## 🔐 Security & Privacy

- API keys are handled client-side (consider server-side proxy for production)
- No user data is stored permanently
- Chat history is stored locally in browser
- All car searches use real-time data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the wiki for detailed guides

## 🎯 Roadmap

- [ ] Server-side API proxy for enhanced security
- [ ] User accounts and saved preferences
- [ ] Integration with more car listing APIs
- [ ] Advanced filtering and comparison tools
- [ ] Mobile app development
- [ ] Dealer integration for direct communication

---

**Made with ❤️ for car enthusiasts and smart shoppers**
