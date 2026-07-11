# Client Only SDK - Vanilla JS Example

A plain HTML/JavaScript example of integrating the Sivi SDK without any framework.

## Setup

1. Open `index.html` and update the Sivi SDK script tag with your account email:
   ```html
   <script src="https://sdk-staging.sivicloud.com/script.js?namespace=SIVI&accountEmail=your@example.com"></script>
   ```

2. Serve the folder with any static file server:
   ```bash
   npx serve .
   # or
   python3 -m http.server 3000
   ```

3. Open `http://localhost:3000` in your browser.

## How it works

- `layouts.json` defines the layout structure with text, logo, and visual placeholders.
- `app.js` handles layout rendering, visual selection, and Sivi SDK integration.
- Click any visual placeholder to open the AI Design Studio and generate designs.
- When a design variant is selected, it appears in the layout with a confetti effect.
- Click "Edit Design" on any generated image to reopen it in the design editor.
