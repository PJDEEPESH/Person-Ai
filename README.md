# Persona AI

A powerful AI-driven application that generates personalized digital personas and enables natural conversation through voice and text interactions.

## Features

- AI Persona Generation: Create unique digital personas based on your profile, interests, and expertise
- Multi-Platform Support: Generate personas optimized for various social media platforms
- Voice Chat Integration: Engage in natural conversations with AI using voice input/output via Deepgram
- Intelligent Responses: Powered by Groq's advanced language models for fast, context-aware responses
- Web Search Integration: Real-time information retrieval for enhanced persona knowledge
- Dark Mode Support: Beautiful UI with light and dark theme options
- Responsive Design: Works seamlessly across all devices
- Multiple Input Methods: Profile-based, manual, structured, and raw input options

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- API Keys:
  - Groq API Key: https://console.groq.com
  - Deepgram API Key: https://console.deepgram.com

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/PJDEEPESH/Person-Ai.git
   cd Person-Ai
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory:
   ```
   VITE_GROQ_API_KEY=your_groq_api_key_here
   VITE_DEEPGRAM_API_KEY=your_deepgram_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser
   Navigate to `http://localhost:5173` (or the URL shown in terminal)

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Project Structure

```
Person-Ai/
├── src/
│   ├── components/          # React components
│   │   ├── Home.tsx         # Landing page
│   │   ├── UserProfile.tsx  # Profile input and persona generation
│   │   ├── ManualInput.tsx  # Manual persona input
│   │   ├── StructuredInput.tsx # Structured data input
│   │   ├── RawInput.tsx     # Raw text input
│   │   ├── Chat.tsx         # Chat interface with AI
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── Footer.tsx       # Footer component
│   │   ├── ThemeContext.tsx # Dark/Light theme context
│   │   ├── About.tsx        # About page
│   │   ├── Pricing.tsx      # Pricing information
│   │   └── Contact.tsx      # Contact page
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles
│   └── vite-env.d.ts        # TypeScript environment definitions
├── index.html               # HTML template
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## Tech Stack

- Frontend Framework: React 18.3
- Language: TypeScript 5.5
- Build Tool: Vite 5.4
- Styling: Tailwind CSS 3.4
- UI Animation: Framer Motion 10.12
- Icons: Lucide React 0.344
- Routing: React Router DOM 6.10
- HTTP Client: Axios 1.6
- AI APIs:
  - Groq SDK 0.3 - Fast language model inference
  - Deepgram SDK 2.4 - Voice transcription and synthesis
- Code Quality: ESLint 9.9

## Available Scripts

| Command | Description |
|---------|-------------|
| npm run dev | Start development server with hot reload |
| npm run build | Build optimized production bundle |
| npm run preview | Preview production build locally |

## Core Functionalities

### Persona Generation
- Input personal information through profile form
- Auto-search for web presence
- Select target platform
- AI generates customized persona

### Chat Interface
- Real-time conversation with AI persona
- Voice input support (speech-to-text)
- Voice output support (text-to-speech)
- Context-aware responses

### Multiple Input Methods
- User Profile: Interactive form-based input
- Manual Input: Free-form persona creation
- Structured Input: Predefined template input
- Raw Input: Direct text input

## Environment Variables

| Variable | Description |
|----------|-------------|
| VITE_GROQ_API_KEY | API key for Groq language models |
| VITE_DEEPGRAM_API_KEY | API key for Deepgram voice services |

## Customization

### Theme
The application supports light and dark modes. Theme preference is saved in localStorage and respects system preferences.

### Styling
All styles use Tailwind CSS. Modify `tailwind.config.js` and component `className` attributes for custom styling.

## Responsive Design

The application is fully responsive and tested on:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop screens (1024px and up)

## Contributing

Contributions are welcome! Feel free to:
- Report issues
- Submit pull requests
- Suggest improvements
- Fork and customize for your needs

## License

This project is open source and available under the MIT License.

## Author

PJDEEPESH - https://github.com/PJDEEPESH

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub Issues: https://github.com/PJDEEPESH/Person-Ai/issues
- Visit the Contact Page in the application

## Acknowledgments

- Groq: https://groq.com - Fast AI inference
- Deepgram: https://deepgram.com - Advanced voice AI
- Vite: https://vitejs.dev - Blazing fast build tooling
- React: https://react.dev - UI framework
- Tailwind CSS: https://tailwindcss.com - Utility-first styling

Made with love by PJDEEPESH
