import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Facebook, FileInput, Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchGoogle } from '../services/googleSearch';
import { generateSearchBasedPrompt, generateDefaultPrompt } from '../utils/promptGenerator';

const platforms = [
  { name: 'Twitter', icon: Twitter },
  { name: 'Instagram', icon: Instagram },
  { name: 'YouTube', icon: Youtube },
  { name: 'Facebook', icon: Facebook },
];

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [personaName, setPersonaName] = useState('');
  const [demographics, setDemographics] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any>(null);

  const handleSearch = async () => {
    if (!personaName.trim()) {
      setError('Please enter a persona name');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchGoogle(personaName);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let personaPrompt = '';
    
    if (searchResults) {
      personaPrompt = generateSearchBasedPrompt(personaName, searchResults);
    } else {
      personaPrompt = generateDefaultPrompt(personaName, demographics);
    }

    navigate('/chat', { state: { personaPrompt } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-indigo-500 to-purple-600">
            <h2 className="text-2xl font-bold text-white">Input Influencer Data</h2>
            <p className="mt-2 text-indigo-100">Provide details to create your AI persona</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
            <div>
              <label htmlFor="personaName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Persona Name
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="personaName"
                  value={personaName}
                  onChange={(e) => setPersonaName(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                  placeholder="Enter persona name..."
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {searchResults && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Search Results</h3>
                <div className="space-y-2">
                  {searchResults.organic_results.slice(0, 3).map((result: any, index: number) => (
                    <div key={index} className="text-sm text-gray-600 dark:text-gray-300">
                      <div className="font-medium">{result.title}</div>
                      <div>{result.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Platform
              </label>
              <div className="grid grid-cols-2 gap-4">
                {platforms.map((platform) => (
                  <button
                    key={platform.name}
                    type="button"
                    onClick={() => setSelectedPlatform(platform.name)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                      selectedPlatform === platform.name
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                    } transition-all`}
                  >
                    <platform.icon className="w-5 h-5" />
                    <span>{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="demographics" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content Focus & Expertise
              </label>
              <textarea
                id="demographics"
                value={demographics}
                onChange={(e) => setDemographics(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                placeholder="Describe your main content themes and areas of expertise..."
              />
            </div>

            {error && (
              <div className="text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all"
              >
                Generate Persona & Start Chat
              </button>

              <button
                type="button"
                onClick={() => navigate('/manual-input')}
                className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all"
              >
                <FileInput className="w-5 h-5" />
                Manual Input
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;