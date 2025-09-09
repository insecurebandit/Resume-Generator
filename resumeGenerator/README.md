# Resume Generator - Online Web App

A professional web application for creating beautiful, formatted resumes. Built with HTML, CSS, and JavaScript - **no downloads required!**

## 🌐 Live Demo

**[Try it now!](https://insecurebandit.github.io/resumeGenerator)**

## ✨ Features

- 🖥️ **Web-based**: Works in any modern browser
- 📱 **Mobile-friendly**: Responsive design for all devices  
- 🖼️ **Photo Integration**: Add profile photos to your resume
- 📊 **Live Preview**: See changes in real-time as you type
- 💾 **Auto-save**: Never lose your progress (local storage)
- 🎯 **Form Validation**: Ensure all required fields are completed
- 📤 **Multiple Export Formats**: PDF, PNG, JPEG
- 🔧 **Skills Management**: Tag-based skills input
- 📚 **Education Sections**: Support for multiple education levels
- ⚡ **PWA Support**: Install as an app on mobile devices
- 🌍 **No Registration**: Start creating immediately

## 🚀 Quick Start (For Users)

1. **Visit the web app**: [Resume Generator](https://insecurebandit.github.io/resumeGenerator)
2. **Fill out the form**: Add your personal information, experience, and skills
3. **Generate**: Click "Generate Resume" to create your resume
4. **Download**: Export as PDF, PNG, or JPEG

That's it! No downloads, no installations, no accounts needed.

## 📱 Install as App (PWA)

Users can install this as a mobile/desktop app:

### On Mobile (Android/iOS):
1. Open the web app in Chrome/Safari
2. Tap the "Share" button
3. Select "Add to Home Screen"

### On Desktop (Chrome/Edge):
1. Open the web app
2. Look for the "Install" button in the address bar
3. Click to install as a desktop app

## 🛠️ Development & Hosting

### Project Structure
```
resumeGenerator/
├── index.html          # Main application page
├── styles.css          # All styling
├── script.js           # Application logic
├── manifest.json       # PWA configuration
├── favicon.svg         # Vector icon
├── favicon.png         # Raster icon (generate with generate-favicon.html)
└── bin/               # Backup files
    ├── index_backup.html
    ├── styles_backup.css
    └── script_backup.js
```

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/resumeGenerator.git
   cd resumeGenerator
   ```

2. **Run locally**:
   - **Simple**: Open `index.html` in your browser
   - **With server**: Use Python, Node.js, or any static server
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (with npx)
     npx http-server
     
     # PHP
     php -S localhost:8000
     ```

3. **Access**: Visit `http://localhost:8000`

## 🌐 Hosting Options

### 1. GitHub Pages (Free - Recommended)

**Steps:**
1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" → "main" branch
4. Your app will be available at: `https://username.github.io/repositoryname`

**Pros**: Free, automatic SSL, custom domains supported
**Cons**: Public repositories only (for free tier)

### 2. Netlify (Free)

**Steps:**
1. Create account at [netlify.com](https://netlify.com)
2. Drag & drop your project folder to Netlify
3. Or connect to your GitHub repository for auto-deployment

**Pros**: Free SSL, form handling, serverless functions, great performance
**Cons**: Limited build minutes on free tier

### 3. Vercel (Free)

**Steps:**
1. Create account at [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Deploy with one click

**Pros**: Fast global CDN, automatic deployments, great performance
**Cons**: Bandwidth limits on free tier

### 4. Firebase Hosting (Free)

**Steps:**
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

**Pros**: Google's infrastructure, fast, free SSL
**Cons**: Requires Google account, CLI setup

### 5. Surge.sh (Free)

**Steps:**
1. Install: `npm install -g surge`
2. Run: `surge` in your project directory
3. Follow prompts

**Pros**: Simple, fast deployment, custom domains
**Cons**: Limited features on free tier

### 6. Cloudflare Pages (Free)

**Steps:**
1. Connect to your GitHub repository
2. Deploy automatically on push

**Pros**: Cloudflare's global network, free SSL, fast
**Cons**: Newer service, fewer tutorials

## 🔧 Customization

### Adding Your Own Domain
Most platforms support custom domains:
1. **GitHub Pages**: Add CNAME file with your domain
2. **Netlify/Vercel**: Add domain in dashboard settings
3. **Update HTML**: Change the `og:url` meta tag in index.html

### Branding
- **Colors**: Modify CSS variables in `styles.css`
- **Logo**: Replace favicon files
- **Title**: Update `<title>` and meta tags in `index.html`

### Features
- All functionality is in `script.js`
- No build process required
- Modern ES6+ JavaScript
- Uses external CDNs for PDF generation

## 📊 Analytics (Optional)

Add Google Analytics or similar:

```html
<!-- Add to <head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🛡️ Security & Privacy

- **No data collection**: All data stays in the user's browser
- **Local storage only**: Auto-save uses browser's local storage
- **No server**: Pure client-side application
- **HTTPS**: All hosting platforms provide SSL certificates
- **No tracking**: No cookies, no analytics (unless you add them)

## 🐛 Troubleshooting

### Common Issues:

**1. PDF export not working**
- Check internet connection (requires external libraries)
- Try different browser
- Disable ad blockers temporarily

**2. Images not uploading**
- Check file size (2MB limit)
- Use common formats (JPG, PNG, GIF)
- Try different browser

**3. Mobile issues**
- Ensure viewport meta tag is present
- Test on actual device, not just browser dev tools

## 🚀 Performance Tips

1. **Optimize images**: Compress uploaded photos
2. **CDN**: External libraries load from CDN
3. **Caching**: Static files cache automatically
4. **Minification**: Consider minifying CSS/JS for production

## 📱 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and test in multiple browsers
4. Submit a pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🆘 Support

- **Issues**: Create a GitHub issue
- **Questions**: Use GitHub Discussions
- **Updates**: Watch the repository for new releases

---

**No downloads. No installations. No accounts. Just create beautiful resumes instantly!**

*Built with ❤️ by Matthew Estrella*
