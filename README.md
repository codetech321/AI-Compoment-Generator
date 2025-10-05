# AI Component Generator

A responsive, AI-powered web app that generates modern UI components from natural-language prompts. Built with React, Vite, Tailwind CSS and integrated with Google Gemini (GenAI). Includes a real-time Monaco code editor, live preview, copy/export features, and secure deployment on Vercel using environment variables.

---

## Key features

* Generate UI components from plain English prompts using Google Gemini API.
* Real-time editable code editor (Monaco Editor) with syntax highlighting.
* Live preview via `iframe` and full-screen preview modal.
* Copy to clipboard and download/export generated code.
* Dark-mode styled UI with responsive layout (Tailwind CSS).
* Secure API key management and production deployment on Vercel.

---

## Tech stack

* React + Vite
* Tailwind CSS
* Monaco Editor (`@monaco-editor/react`)
* `react-select` for the framework picker
* Google GenAI (Gemini) via `@google/genai`
* Toast notifications (`react-toastify`)
* Icons: `react-icons`
* Deployment: Vercel

---

## Quick start (local)

1. **Clone** the repo

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

2. **Install** dependencies

```bash
npm install
# or
# yarn
```

3. **Create environment file**

Create a `.env` file (or `.env.local`) at project root and add your Google GenAI API key. Example:

```
VITE_GOOGLE_GENAI_API_KEY=your_api_key_here
```

> **Important:** Do not commit `.env` to Git. Add it to `.gitignore`.

4. **Run locally**

```bash
npm run dev
# or
# yarn dev
```

Open `http://localhost:5173` (or the port Vite prints) and try generating a component.

---

## Environment variables

* `VITE_GOOGLE_GENAI_API_KEY` — Google GenAI API key (stored as Vercel environment variable for production).

If you used a different variable name in your code (for example `REACT_APP_...`), update accordingly.

---

## Vercel deployment

1. Create a new project in Vercel and connect your GitHub repository.
2. In your Vercel project settings, set the environment variable `VITE_GOOGLE_GENAI_API_KEY` (or the key name you use).
3. Set the build command to `npm run build` and the output directory to `dist` (Vite default).
4. Deploy. Vercel will build the site and keep your API key secure in the project settings.

---

## Security notes

* Never commit secret keys to the repository. Always use environment variables on Vercel (or other hosts).
* Consider restricting your API key usage (if provider supports it) to specific endpoints or IPs.
* For more sensitive projects, consider creating a backend or serverless function that proxies requests and keeps keys out of client bundles.

---

## Common issues & fixes

* **Editor not loading / blank page:** Ensure `@monaco-editor/react` is installed and compatible with your Vite config. Try clearing `node_modules` and reinstalling.
* **API errors / rate limits:** Check that the API key is set correctly in your environment and not exposed in client bundles. Monitor provider dashboard for usage.
* **CORS / mixed content in iframe preview:** Make sure generated HTML and included assets are self-contained, or host assets over HTTPS.

---

## Project structure (example)

```
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  └─ ...
│  ├─ pages/
│  │  └─ Home.jsx
│  ├─ styles/
│  └─ main.jsx
├─ .env
├─ package.json
└─ vite.config.js
```
