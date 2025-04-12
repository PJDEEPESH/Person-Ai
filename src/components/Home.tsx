import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bot, Globe, BookOpen, GamepadIcon, Brain } from 'lucide-react';
import QuickAction from './QuickAction';
import PersonaCard from './PersonaCard';
import SearchBar from './SearchBar';

const featuredPersonas = [
  {
    name: "Study Assistant",
    description: "Your AI learning companion",
    interactions: "165.9m",
    icon: <Bot className="w-12 h-12 text-indigo-500" />,
    creator: "@landon"
  },
  {
    name: "Creative Writer",
    description: "Unleash your storytelling potential",
    interactions: "286.6k",
    icon: <BookOpen className="w-12 h-12 text-purple-500" />,
    creator: "@cai-official"
  },
  {
    name: "Travel Guide",
    description: "Plan your perfect adventure",
    interactions: "927.0k",
    icon: <Globe className="w-12 h-12 text-blue-500" />,
    creator: "@cai-official"
  },
  {
    name: "Decision Helper",
    description: "Make better choices, faster",
    interactions: "158.3k",
    icon: <Brain className="w-12 h-12 text-green-500" />,
    creator: "@cai-official"
  }
];

const quickActions = [
  {
    title: "Plan a trip",
    subtitle: "with Trip Planner",
    icon: Globe,
  },
  {
    title: "Write a story",
    subtitle: "with Creative Helper",
    icon: BookOpen,
  },
  {
    title: "Play a game",
    subtitle: "with Text Adventure",
    icon: GamepadIcon,
  },
  {
    title: "Get advice",
    subtitle: "with Decision Helper",
    icon: Brain,
  }
];

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Create Your Perfect AI Persona
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            Design, customize, and interact with AI personalities tailored to your needs
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </motion.div>
        </div>

        {/* Quick Actions Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {quickActions.map((action, index) => (
            <QuickAction
              key={action.title}
              title={action.title}
              subtitle={action.subtitle}
              icon={action.icon}
            />
          ))}
        </motion.div>

        {/* Featured Personas */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Personas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPersonas.map((persona, index) => (
              <PersonaCard
                key={persona.name}
                name={persona.name}
                description={persona.description}
                interactions={persona.interactions}
                icon={persona.icon}
                creator={persona.creator}
              />
            ))}
          </div>
        </div>

        {/* Create Persona CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Create Your Own Persona</h2>
          <p className="text-lg text-indigo-100 mb-8">
            Customize voice, personality, and conversation style to create your perfect AI companion
          </p>
          <button 
            onClick={() => navigate('/profile')}
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            Get Started
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;