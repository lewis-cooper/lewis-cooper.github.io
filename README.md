# Lewis Cooper — Personal Website

A clean, static personal/academic portfolio site. Zero dependencies, no build system — just HTML, CSS, and a tiny bit of JS.

## Running Locally

Open `index.html` in your browser. That's it.

For a local dev server with auto-reload (optional):

```bash
# Using Python (built-in on macOS)
python3 -m http.server 8000
# Then open http://localhost:8000

# Or using Node (if installed)
npx serve .
```

## Structure

```
├── index.html    ← All page content (single-page scroll)
├── style.css     ← All styles
├── script.js     ← Mobile nav toggle + scroll effects
├── assets/       ← Put your photo here (e.g. photo.jpg)
└── README.md
```

## How to Edit

Everything you need to change is marked with `<!-- EDIT: ... -->` comments in `index.html`. Key things to update:

1. **Your photo** — Replace the `<div class="photo-placeholder">` in the hero section with an `<img>` tag
2. **Bio text** — Update the paragraph in the hero section
3. **Email** — Replace `lc@example.cam.ac.uk` (appears twice: hero + footer)
4. **Research summary** — Update the text in the Research section
5. **Publications** — Replace the placeholder entries in the publication list
6. **Projects** — Edit/duplicate the project cards
7. **YouTube video** — Replace `VIDEO_ID` in the iframe `src` with a real video ID
8. **Blog posts** — Edit/duplicate the blog cards with real posts and Substack links

### Colors

All colors are CSS custom properties in `:root` at the top of `style.css`. Change `--accent` to switch the whole color scheme.

## Deployment

This is a static site — deploy anywhere:

- **GitHub Pages**: Push to a repo, enable Pages in Settings
- **Netlify / Vercel**: Drag-and-drop the folder, or connect the repo
- **Any web server**: Just upload the files
