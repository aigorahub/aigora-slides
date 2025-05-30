# Netlify Deployment Guide for Aigora Slides

## ✅ Pre-Deployment Checklist (Completed)

The following critical fixes have been applied:

### 1. Dependencies Fixed ✅
- All build tools moved from `devDependencies` to `dependencies`
- This prevents the `NODE_ENV=production` issue on Netlify

### 2. Build Scripts Fixed ✅  
- PostCSS commands now use `npx` prefix
- Prevents "postcss: not found" errors

### 3. Netlify Configuration ✅
- `netlify.toml` created with proper settings
- Node version specified as 18
- Security headers included

### 4. Build Order ✅
- CSS builds before HTML generation
- All assets properly generated

## 🚀 Netlify Deployment Steps

### Option 1: GitHub Connection (Recommended)
1. Push code to GitHub repository
2. Log into Netlify (netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Netlify will automatically use `netlify.toml` settings
6. Deploy!

### Option 2: Manual Deploy
1. Run `npm run build` locally
2. Drag `_site` folder to Netlify drop zone
3. Site will be live immediately

## 📋 Build Configuration

If manually configuring (though `netlify.toml` handles this):

- **Build command:** `npm install && npm run build`
- **Publish directory:** `_site`
- **Node version:** 18

## 🔍 Troubleshooting

### Common Issues:
1. **"devDependencies will not be installed"** → Fixed by moving to dependencies
2. **"postcss: not found"** → Fixed by using `npx postcss`
3. **Build timeout** → Node version specified in netlify.toml
4. **Assets not loading** → Check publish directory is `_site`

### Build Success Indicators:
- CSS files generated in `_site/assets/css/`
- HTML files in `_site/`
- Reveal.js assets copied to `_site/assets/reveal.js/`

## 🌟 Post-Deployment

After successful deployment:
- Test all slide presentations
- Verify dark mode toggle works
- Check responsive design on mobile
- Test PDF export functionality (add `?print-pdf` to URL)

Your Aigora Slides template is now ready for production! 🎉 