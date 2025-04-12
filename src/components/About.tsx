import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About Persona AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Revolutionizing influencer engagement through AI-powered persona replication
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          At Persona AI, we're on a mission to bridge the gap between influencers and their audience. By leveraging cutting-edge AI technology, we create authentic digital replicas of influencers based on their social media presence, allowing for more personalized and scalable interactions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          How It Works
        </h2>
        <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 mb-6">
          <li className="mb-2">Provide the influencer's social media profile URL</li>
          <li className="mb-2">Our AI analyzes and processes the public data</li>
          <li className="mb-2">A custom AI model is created to replicate the influencer's persona</li>
          <li>Engage with the AI-powered persona through chat or voice interactions</li>
        </ol>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Benefits
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
          <li className="mb-2">Enhanced fan engagement</li>
          <li className="mb-2">Scalable influencer interactions</li>
          <li className="mb-2">Personalized content creation</li>
          <li>Unique marketing opportunities</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default About;