# J&F Smart Logistics Ltd - Website

A modern, responsive logistics company website built with Bootstrap 5, custom CSS, and vanilla JavaScript.

## 📁 Files Included

- `index.html` - Main HTML structure
- `styles.css` - Custom CSS styling
- `script.js` - JavaScript functionality
- `logo.png` - Company logo (you need to add this)

## 🚀 Quick Start

1. **Add Your Logo**
   - Place your company logo as `logo.png` in the same folder as index.html
   - Recommended size: 200x200px or similar square/rectangular ratio
   - Formats supported: PNG (recommended), JPG, SVG

2. **Update WhatsApp Number**
   - Open `script.js`
   - Find the CONFIG object at the top (line 8)
   - Replace `'1234567890'` with your WhatsApp number
   - **Format:** Include country code without + or spaces
   - Example: `'447123456789'` for UK, `'19171234567'` for US

3. **Update Contact Information**
   - Still in `script.js`, in the CONFIG object, update:
     - `phone`: Your display phone number
     - `email`: Your company email
     - `address`: Your company address

4. **Open the Website**
   - Double-click `index.html` to open in your browser
   - Or upload all files to your web hosting

## ⚙️ Customization Guide

### WhatsApp Integration
The WhatsApp button appears as a floating button on the bottom-right. When clicked:
- Users can chat with you directly on WhatsApp
- Contact form submissions also redirect to WhatsApp with the form data

**To change WhatsApp number:**
```javascript
// In script.js, line 8
const CONFIG = {
    whatsappNumber: 'YOUR_NUMBER_HERE', // e.g., '447123456789'
    ...
};
```

### Contact Information
Update these in `script.js`:
```javascript
const CONFIG = {
    whatsappNumber: '1234567890',
    phone: '+1 (555) 123-4567',      // Display format
    email: 'info@jfsmartlogistics.com',
    address: '123 Logistics Avenue, Business District'
};
```

### Colors & Branding
To change the color scheme, edit `styles.css` CSS variables:
```css
:root {
    --primary-color: #FF6B35;      /* Orange accent color */
    --secondary-color: #004E89;     /* Blue color */
    --dark-bg: #0A1828;            /* Dark background */
    --accent-color: #FFD23F;       /* Yellow accent */
    /* Change these to match your brand */
}
```

### Logo
- Add your logo as `logo.png` in the main folder
- If the logo doesn't exist, the site will show text only
- Logo appears in:
  - Navigation bar
  - Footer

### Content Updates
Edit `index.html` to change:
- Company name and tagline
- Services descriptions
- Statistics (500+ Deliveries, 98% On-Time, etc.)
- About section text
- Social media links (footer)

## 📱 Features

✅ Fully responsive (mobile, tablet, desktop)
✅ Modern, professional design
✅ Bootstrap 5 framework
✅ WhatsApp integration
✅ Smooth scrolling navigation
✅ Animated sections
✅ Contact form
✅ Google Fonts integration
✅ Font Awesome icons
✅ Fast loading
✅ SEO-friendly structure

## 🎨 Sections Included

1. **Hero Section** - Eye-catching landing with call-to-action
2. **Services** - 6 logistics services with descriptions
3. **About** - Company information and experience
4. **Why Choose Us** - Key differentiators
5. **Contact** - Contact form and information
6. **Footer** - Links and social media

## 🛠️ Technical Details

- **Bootstrap**: 5.3.2
- **Font Awesome**: 6.4.2
- **Google Fonts**: Rajdhani & Outfit
- **No jQuery required**
- **Pure vanilla JavaScript**
- **CSS Grid & Flexbox**
- **CSS Animations**

## 📞 WhatsApp Features

1. **Floating Button**
   - Always visible on bottom-right
   - Pulse animation to attract attention
   - Tooltip on hover
   - Direct chat link

2. **Contact Form Integration**
   - Form submissions redirect to WhatsApp
   - Pre-filled message with form data
   - Professional formatting

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 Deployment

### Upload to Web Host
1. Upload all files to your hosting via FTP/cPanel
2. Ensure file structure is maintained
3. Make sure logo.png is in the root folder
4. Access via your domain

### Use with Website Builders
- Works with most hosting platforms
- Can be integrated into WordPress (as custom HTML)
- Compatible with GitHub Pages, Netlify, Vercel

## 🎯 SEO Optimization

The site includes:
- Semantic HTML5 structure
- Meta tags ready for expansion
- Descriptive alt texts (add to images)
- Clean, accessible code
- Fast loading times

**To improve SEO, add to `index.html` head:**
```html
<meta name="description" content="Your company description">
<meta name="keywords" content="logistics, freight, shipping">
<meta name="author" content="J&F Smart Logistics">
```

## ⚡ Performance Tips

1. Optimize logo.png (compress before uploading)
2. Use WebP format for images if possible
3. Enable GZIP compression on server
4. Use CDN for Bootstrap/FontAwesome (already implemented)

## 🆘 Troubleshooting

**Logo not showing?**
- Check file name is exactly `logo.png`
- Ensure it's in the same folder as index.html
- Try using a different image format

**WhatsApp not working?**
- Verify number format (no + or spaces)
- Include country code
- Test the number on WhatsApp Web first

**Form not submitting?**
- Check browser console for errors
- Ensure WhatsApp number is correct in script.js

## 📄 License

This website template is provided for J&F Smart Logistics Ltd.
Feel free to modify and use as needed for your business.

## 🤝 Support

For questions about customization:
1. Check the comments in script.js
2. Review the CONFIG object
3. Test changes in browser developer tools

---

**Built with ❤️ for J&F Smart Logistics Ltd**

Last Updated: February 2026
# kamandajf
