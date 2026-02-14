# 🚀 QUICK SETUP GUIDE - J&F Smart Logistics Website

## ⚡ 3 Steps to Get Started

### Step 1: Add Your Logo
1. Save your company logo as `logo.png`
2. Place it in the same folder as `index.html`
3. Done! The logo will appear automatically in the header and footer

**Logo Tips:**
- Recommended size: 200x200px or 500x500px
- Format: PNG with transparent background (preferred)
- Alternative formats: JPG, SVG also work

---

### Step 2: Update WhatsApp Number

Open `script.js` and find this section at the top:

```javascript
const CONFIG = {
    whatsappNumber: '1234567890',  // ← CHANGE THIS
    phone: '+1 (555) 123-4567',
    email: 'info@jfsmartlogistics.com',
    address: '123 Logistics Avenue, Business District'
};
```

**Update WhatsApp Number:**
- Replace `'1234567890'` with your number
- Include country code
- NO + symbol
- NO spaces
- NO dashes

**Examples:**
- UK number: `'447123456789'`
- US number: `'19171234567'`
- Rwanda number: `'250781234567'`
- Kenya number: `'254712345678'`

---

### Step 3: Update Your Contact Details

In the same CONFIG section, update:

```javascript
phone: '+250 781 234 567',           // Your phone (display format)
email: 'info@jfsmartlogistics.com',  // Your email
address: 'Kigali, Rwanda'            // Your address
```

---

## ✅ That's It!

Your website is now ready to use!

### To View:
- Double-click `index.html` to open in browser

### To Publish Online:
1. Upload all files to your web hosting
2. Keep the same folder structure
3. Your website will be live!

---

## 🎨 Optional: Change Colors

To match your brand colors, open `styles.css` and edit these:

```css
:root {
    --primary-color: #FF6B35;      /* Main orange color */
    --secondary-color: #004E89;     /* Blue accent */
    --dark-bg: #0A1828;            /* Dark backgrounds */
}
```

Pick your colors from: https://coolors.co/

---

## 📱 WhatsApp Features

✅ **Floating WhatsApp Button**
- Always visible on bottom-right
- Customers can chat instantly
- Pre-filled greeting message

✅ **Contact Form → WhatsApp**
- Form submissions open WhatsApp
- All form details pre-filled
- Professional message format

---

## 🆘 Need Help?

**Logo not showing?**
→ Check filename is exactly `logo.png` (lowercase)

**WhatsApp not working?**
→ Verify number format (include country code, no symbols)

**Want to change text?**
→ Edit `index.html` - all content is clearly labeled

---

## 📋 File Checklist

Before uploading to web:
- [ ] logo.png added
- [ ] WhatsApp number updated in script.js
- [ ] Contact info updated in script.js
- [ ] Company name checked in index.html
- [ ] All 4 files present: index.html, styles.css, script.js, logo.png

---

**Your website includes:**
✨ Modern responsive design
✨ 6 service sections
✨ Contact form
✨ WhatsApp integration
✨ Mobile-friendly
✨ Professional animations
✨ Fast loading

**Good luck with your logistics business! 🚚📦**
