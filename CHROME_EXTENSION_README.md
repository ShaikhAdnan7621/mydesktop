# Minimal Chrome New Tab Extension

A beautiful, minimal new tab page for Chrome with time display, search functionality, and quick access bookmarks.

## Features

✨ **Clean Design**: Minimal, elegant interface with smooth animations
🕐 **Live Clock**: Real-time clock with greeting messages
🔍 **Quick Search**: Instant Google search with beautiful UI
🔖 **Smart Bookmarks**: Quick access to your favorite sites with favicons
🌙 **Dark Mode**: Automatic dark/light theme support
📱 **Responsive**: Works perfectly on all screen sizes

## Installation as Chrome Extension

### Method 1: Build and Install Locally

1. **Build the project:**
   ```bash
   npm run build
   node build-extension.js
   ```

2. **Install in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `chrome-extension` folder
   - Your new tab page is now active!

### Method 2: Development Mode

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Access at:** `http://localhost:3000`

## Customization

### Adding Default Bookmarks
Edit the default bookmarks in `src/components/Bookmark.js`:

```javascript
const bookmarklist = JSON.parse(localStorage.getItem("bookmarks")) || [
    { name: "YouTube", url: "https://youtube.com" },
    { name: "GitHub", url: "https://github.com" },
    // Add your favorites here
];
```

### Changing Colors
Modify the gradient in `src/app/page.js`:

```javascript
className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-black"
```

### Search Engine
Change the search engine in `src/components/Search.js`:

```javascript
window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
```

## Keyboard Shortcuts

- `Ctrl+L` or `Cmd+L`: Focus address bar
- `Tab`: Navigate through elements
- `Enter`: Search or activate buttons

## Browser Compatibility

- ✅ Chrome (Primary)
- ✅ Edge (Chromium-based)
- ✅ Brave
- ✅ Opera

## Tech Stack

- **Next.js 14**: React framework
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **Local Storage**: Bookmark persistence

## File Structure

```
src/
├── app/
│   ├── page.js          # Main new tab page
│   ├── layout.js        # App layout
│   └── globals.css      # Global styles
└── components/
    ├── Clock.js         # Time display
    ├── Search.js        # Search functionality
    ├── Bookmark.js      # Bookmark management
    └── Darkmodetoggle.js # Theme switcher
```

## Contributing

Feel free to customize and improve this new tab page! Some ideas:

- Weather widget
- Quick notes
- Calendar integration
- Custom backgrounds
- Productivity tools

---

**Enjoy your new minimal Chrome new tab experience! 🚀**