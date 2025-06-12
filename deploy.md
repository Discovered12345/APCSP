# Production Deployment Guide

## 🚀 Quick Start

### 1. Environment Setup
```bash
# Copy environment template
cp .env.example .env.production

# Edit with your production values
nano .env.production
```

### 2. Build for Production
```bash
# Build frontend
npm run build:prod

# Check build output
npm run preview:prod
```

### 3. Deploy Backend
```bash
# Start production server
npm run start:prod
```

## 🔧 Environment Variables

### Required Production Variables
```env
# Production API URL (update with your domain)
VITE_API_URL=https://your-api-domain.com

# Backend Database (server-side only)
DATABASE_URL=your_neon_database_url

# JWT Secret (server-side only)
JWT_SECRET=your_super_secure_jwt_secret

# Environment
NODE_ENV=production
```

## 🏗️ Build Process

### Frontend Build Features
- **Code Splitting**: Automatic vendor/UI chunk separation
- **Minification**: Terser with production optimizations
- **Tree Shaking**: Removes unused code
- **Asset Optimization**: Hashed filenames for caching
- **Console Removal**: Strips console.log in production

### Build Commands
```bash
# Standard build
npm run build

# Production build with optimizations
npm run build:prod

# Build with bundle analysis
npm run build:analyze

# Test production build locally
npm run preview:prod
```

## 🚀 Deployment Options

### Option 1: Static Hosting (Frontend)
Deploy `dist/` folder to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Upload `dist/` contents

### Option 2: Full-Stack Hosting
Deploy both frontend and backend:
- **Railway**: Connect GitHub repo
- **Render**: Deploy as web service
- **DigitalOcean**: Use App Platform

### Option 3: VPS/Server
```bash
# Clone repository
git clone your-repo-url
cd your-project

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with production values

# Run database migrations
npm run migrate

# Build frontend
npm run build:prod

# Start production server
npm run start:prod
```

## 🔒 Production Security Checklist

- [ ] Use HTTPS in production
- [ ] Set strong JWT_SECRET (32+ characters)
- [ ] Enable CORS for your domain only
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Regular security updates

## 📊 Performance Optimizations

### Frontend
- Lazy loading for routes
- Image optimization
- Code splitting
- CDN for static assets
- Service worker caching

### Backend
- Database connection pooling
- Redis for session storage
- API response caching
- Gzip compression
- Request logging

## 🔍 Monitoring

### Production Monitoring
- Server uptime monitoring
- Database performance
- API response times
- Error tracking
- User analytics

### Recommended Tools
- **Monitoring**: Uptime Robot, New Relic
- **Errors**: Sentry, Bugsnag
- **Analytics**: Google Analytics, Mixpanel
- **Logs**: LogRocket, DataDog

## 🛠️ Troubleshooting

### Common Issues
1. **API Connection Failed**
   - Check VITE_API_URL is correct
   - Verify CORS settings
   - Test backend health endpoint

2. **Build Errors**
   - Run `npm run type-check`
   - Check for TypeScript errors
   - Verify all dependencies installed

3. **Performance Issues**
   - Enable gzip compression
   - Use CDN for static assets
   - Optimize database queries

### Debug Commands
```bash
# Check TypeScript errors
npm run type-check

# Fix linting issues
npm run lint:fix

# Test API health
curl https://your-api-domain.com/api/health

# Check build size
npm run build:analyze
```

## 📝 Production Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificate configured
- [ ] CORS settings updated
- [ ] Rate limiting configured

### Post-Deployment
- [ ] Health check endpoint working
- [ ] User authentication working
- [ ] Database connection stable
- [ ] API endpoints responding
- [ ] Frontend loads correctly
- [ ] No console errors

### Ongoing Maintenance
- [ ] Regular backups
- [ ] Security updates
- [ ] Performance monitoring
- [ ] Error tracking
- [ ] User feedback collection 