# CarsBuyAI.com Setup Guide 🚗🤖

Welcome! This guide will help you set up and run the CarsBuyAI.com website locally or deploy it to production.

## 🎯 What You're Building

CarsBuyAI.com is a cutting-edge car shopping website that uses AI to help users:
- **Research** cars with real-time market data
- **Shop** for vehicles with intelligent search
- **Negotiate** prices with AI-powered assistance
- **Calculate** financing with built-in tools
- **Generate** custom car images

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **A Google AI Studio account** - [Sign up here](https://ai.google.dev/)
- **A code editor** (VS Code recommended)
- **Basic knowledge** of React/TypeScript (helpful but not required)

## 🚀 Quick Start (5 minutes)

### Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Click "Get API Key" → "Create API Key"
4. Copy your API key (starts with `AIza...`)

### Step 2: Clone and Setup

```bash
# Navigate to your workspace
cd /workspace

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit the environment file with your API key
nano .env.local
```

### Step 3: Configure API Key

In `.env.local`, replace the placeholder with your actual API key:

```env
# CarsBuyAI.com Environment Configuration
GEMINI_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
```

### Step 4: Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Detailed Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | Your Google Gemini AI API key |
| `GEMINI_API_BASE_URL` | ❌ No | Custom API endpoint (advanced users) |
| `DEBUG` | ❌ No | Enable debug mode (development only) |

### API Key Security

⚠️ **Important Security Notes:**

- **Development**: API key is used client-side (fine for testing)
- **Production**: Consider implementing a backend proxy for enhanced security
- **Never commit** your `.env.local` file to version control
- **Rotate keys** regularly for production applications

## 🌐 Deployment Options

### Option 1: Quick Deploy (Recommended for beginners)

**GitHub Pages:**
```bash
npm run build
# Upload the `dist/` folder to GitHub Pages
```

**Vercel (Easiest):**
1. Push your code to GitHub
2. Connect your repo at [vercel.com](https://vercel.com)
3. Add your `GEMINI_API_KEY` in Vercel's environment variables
4. Deploy automatically

### Option 2: Static Hosting

**Netlify:**
```bash
npm run build
# Drag and drop the `dist/` folder to Netlify
```

**AWS S3 + CloudFront:**
```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete
```

### Option 3: Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🛠 Development Tips

### Hot Reloading
The development server supports hot reloading. Changes to components will update instantly.

### Component Structure
```
components/
├── Header.tsx          # Main navigation
├── Sidebar.tsx         # Chat history & navigation
├── ChatWindow.tsx      # Main chat interface
├── CarListingCard.tsx  # Individual car displays
├── FinanceCalculator.tsx # Loan calculations
└── ImageGenerator.tsx  # AI image creation
```

### Adding New Features

1. **New AI Capabilities**: Modify `constants.ts` to update Carla's instructions
2. **UI Components**: Add new components in the `components/` folder
3. **Styling**: Use Tailwind CSS classes or update `index.css`
4. **Icons**: Add new icons to `components/IconComponents.tsx`

## 🐛 Troubleshooting

### Common Issues

**"API key not configured" Error:**
- Check your `.env.local` file exists
- Verify the API key starts with `AIza`
- Restart the development server

**Build Errors:**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors:**
```bash
# Check for type errors
npx tsc --noEmit
```

### Performance Optimization

**For Large Deployments:**
- Implement request caching
- Add rate limiting
- Use a CDN for static assets
- Consider server-side rendering (SSR)

## 📊 Analytics & Monitoring

### Adding Analytics

**Google Analytics:**
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

**Plausible Analytics (Privacy-friendly):**
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/plausible.js"></script>
```

## 🔒 Security Best Practices

### Production Checklist

- [ ] Use environment variables for sensitive data
- [ ] Implement rate limiting for API calls
- [ ] Add HTTPS/SSL certificates
- [ ] Enable CORS properly
- [ ] Regular security updates
- [ ] Monitor API usage

### Content Security Policy

Add to your hosting platform:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://generativelanguage.googleapis.com;
```

## 📈 Scaling for Production

### Backend Considerations

For high-traffic applications, consider:

1. **API Proxy Server** (Node.js/Express)
2. **Rate Limiting** (Redis-based)
3. **Caching Layer** (Memcached/Redis)
4. **Load Balancing** (nginx/CloudFront)
5. **Database** (PostgreSQL for user data)

### Monitoring

Set up monitoring for:
- API response times
- Error rates
- User engagement
- Cost tracking (API usage)

## 🆘 Getting Help

- **GitHub Issues**: Report bugs or request features
- **Documentation**: Check the README.md for API details
- **Community**: Join discussions for tips and tricks

## 📝 Next Steps

Once you have the basic setup running:

1. **Customize** the AI instructions for your specific use case
2. **Brand** the application with your colors and logo
3. **Add** additional car data sources
4. **Implement** user accounts and preferences
5. **Integrate** with dealer APIs for direct communication

Happy coding! 🚗✨