/// <reference types="vite/client" />
declare module '*.svg' {
  const content: any;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_GROQ_API_KEY: string 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;
  readonly VITE_DEEPGRAM_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}