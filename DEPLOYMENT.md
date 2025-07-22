# CarsBuyAI.com Deployment Guide

This guide will help you deploy CarsBuyAI.com to various hosting platforms.

## 🚀 Quick Deploy

The easiest way to deploy CarsBuyAI is to use one of these platforms:

### Vercel (Recommended)
1. Fork this repository to your GitHub account
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Click "New Project" and select your forked repository
4. Set environment variable: `GEMINI_API_KEY` = your Gemini API key
5. Deploy! Your site will be live in minutes.

### Netlify
1. Fork this repository
2. Go to [netlify.com](https://netlify.com) and sign up
3. Click "New site from Git" and connect your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variable: `GEMINI_API_KEY` = your Gemini API key
7. Deploy!

## 🔧 Manual Deployment

### Prerequisites
- Node.js 18+
- A Gemini API key from [Google AI Studio](https://ai.google.dev)

### Build Steps
```bash
# 1. Clone the repository
git clone https://github.com/yourusername/carsbuyai.git
cd carsbuyai

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your GEMINI_API_KEY

# 4. Build for production
npm run build

# 5. The built files are now in the dist/ directory
```

### Hosting Options

#### GitHub Pages
```bash
# After building
cd dist
git init
git add .
git commit -m "Deploy CarsBuyAI"
git branch -M gh-pages
git remote add origin https://github.com/yourusername/carsbuyai.git
git push -u origin gh-pages
```

#### AWS S3 + CloudFront
1. Create an S3 bucket with static website hosting enabled
2. Upload the contents of `dist/` to the bucket
3. Set up CloudFront distribution for HTTPS and caching
4. Configure environment variables in your build process

#### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Select dist as the public directory
firebase deploy
```

#### Docker
```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t carsbuyai .
docker run -p 80:80 carsbuyai
```

## 🌍 Environment Variables

### Required
- `GEMINI_API_KEY`: Your Google Gemini API key

### Platform-Specific Setup

#### Vercel
Add to your `vercel.json`:
```json
{
  "env": {
    "GEMINI_API_KEY": "@gemini-api-key"
  }
}
```

#### Netlify
Add to `netlify.toml`:
```toml
[build.environment]
  GEMINI_API_KEY = "your-key-here"
```

#### GitHub Actions
Add to `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🔒 Security Considerations

### Production Checklist
- [ ] Use HTTPS (SSL certificate)
- [ ] Set up proper CORS headers
- [ ] Consider implementing rate limiting
- [ ] Monitor API usage and costs
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Implement analytics (Google Analytics, etc.)

### API Key Security
⚠️ **Important**: The current implementation uses client-side API keys. For production, consider:
- Setting up a backend proxy to hide API keys
- Implementing user authentication
- Adding rate limiting per user
- Monitoring API usage

## 📊 Performance Optimization

### CDN Setup
Use a CDN for faster global delivery:
- Cloudflare
- AWS CloudFront
- Vercel Edge Network (automatic)

### Caching Strategy
```nginx
# Nginx configuration example
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location / {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

## 🐛 Troubleshooting

### Common Issues

1. **White screen on load**
   - Check browser console for JavaScript errors
   - Verify API key is set correctly
   - Ensure all environment variables are configured

2. **API errors**
   - Verify GEMINI_API_KEY is valid
   - Check API quotas and billing
   - Review network connectivity

3. **Build failures**
   - Ensure Node.js version is 18+
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Logs and Monitoring
- Check browser developer tools console
- Monitor hosting platform logs
- Set up error tracking for production

## 🚀 Going Live

### Domain Setup
1. Purchase a domain (recommended: carsbuyai.com)
2. Configure DNS to point to your hosting platform
3. Set up SSL certificate (usually automatic)
4. Update CNAME file if using GitHub Pages

### Final Steps
1. Test all functionality in production
2. Set up monitoring and analytics
3. Create backups of your code and data
4. Monitor performance and user feedback

---

Need help? Open an issue on GitHub or check our documentation wiki!