import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, Volume2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { generateChatResponse, Message, ChatError } from '../services/groq';
import { TextToSpeech } from '../utils/textToSpeech';
import VoiceButton from './VoiceButton';
import VoiceSettings from './VoiceSettings';

const MAX_INPUT_LENGTH = 500;

export const Chat: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voiceMode, setVoiceMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('aura-luna-en');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const ttsRef = useRef<TextToSpeech | null>(null);
  const { personaPrompt } = location.state || {};

  useEffect(() => {
    if (!personaPrompt) {
      navigate('/profile');
      return;
    }

    // Initialize TTS
    if (!ttsRef.current) {
      ttsRef.current = new TextToSpeech();
      ttsRef.current.setVoice(selectedVoice);
    }
  }, [personaPrompt, navigate, selectedVoice]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (ttsRef.current) {
        ttsRef.current.stop();
      }
    };
  }, []);

  const handleSubmit = async (e?: React.FormEvent, voiceInput?: string) => {
    if (e) e.preventDefault();
    const message = voiceInput || inputMessage.trim();
    if (!message || isLoading) return;

    if (message.length > MAX_INPUT_LENGTH) {
      setError(`Message too long. Please keep it under ${MAX_INPUT_LENGTH} characters.`);
      return;
    }

    setInputMessage('');
    setError(null);
    
    const newMessages = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await generateChatResponse(personaPrompt, messages, message);
      const newMessage = { role: 'assistant' as const, content: response };
      setMessages([...newMessages, newMessage]);

      if (voiceMode && ttsRef.current) {
        playMessage(response);
      }
    } catch (error) {
      const errorMessage = error instanceof ChatError 
        ? error.message 
        : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceMode = () => {
    setVoiceMode(!voiceMode);
    if (voiceMode && ttsRef.current) {
      ttsRef.current.stop();
      setIsPlaying(false);
    }
  };

  const handleVoiceChange = (voice: string) => {
    setSelectedVoice(voice);
    if (ttsRef.current) {
      ttsRef.current.setVoice(voice);
      // Replay current message with new voice if playing
      if (isPlaying) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.role === 'assistant') {
          playMessage(lastMessage.content);
        }
      }
    }
  };

  const playMessage = (text: string) => {
    try {
      if (ttsRef.current) {
        ttsRef.current.speak(text);
        setIsPlaying(true);
      }
    } catch (error) {
      setError('Failed to play audio. Please check your browser settings.');
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (!ttsRef.current) return;

    if (ttsRef.current.isPlaying()) {
      ttsRef.current.pause();
      setIsPlaying(false);
    } else if (ttsRef.current.isPausedState()) {
      ttsRef.current.resume();
      setIsPlaying(true);
    } else {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.role === 'assistant') {
        playMessage(lastMessage.content);
      }
    }
  };

  const handleVoiceTranscription = (text: string) => {
    handleSubmit(undefined, text);
  };

  const handleVoiceError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex flex-col">
      <div className="bg-white dark:bg-gray-900 shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Profile
          </button>
          <VoiceSettings
            voiceMode={voiceMode}
            isPlaying={isPlaying}
            selectedVoice={selectedVoice}
            onVoiceModeToggle={toggleVoiceMode}
            onPlayPauseToggle={togglePlayPause}
            onVoiceChange={handleVoiceChange}
          />
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}
                >
                  {message.content}
                  {message.role === 'assistant' && voiceMode && (
                    <button
                      onClick={() => playMessage(message.content)}
                      className="ml-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-gray-900 dark:text-white">
                  Typing...
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-center">
                <div className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg px-4 py-2">
                  {error}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-transparent"
                />
                <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                  {inputMessage.length}/{MAX_INPUT_LENGTH}
                </span>
              </div>
              <VoiceButton
                onTranscription={handleVoiceTranscription}
                onError={handleVoiceError}
                isDisabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;