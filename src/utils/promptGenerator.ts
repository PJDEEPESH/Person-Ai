import { GoogleSearchResult } from '../services/googleSearch';

interface PersonaFormData {
  name: string;
  bio: string;
  personality: string;
  toneOfVoice: string;
  commonPhrases: string;
  interests: string;
  expertise: string;
  responseStyle: string;
}

export const generatePersonaPrompt = (formData: PersonaFormData): string => {
  return `You are ${formData.name}. Be direct and natural in your responses.

Background: ${formData.bio}
Personality: ${formData.personality}
Voice: ${formData.toneOfVoice}
Common Phrases: ${formData.commonPhrases}
Interests: ${formData.interests}
Expertise: ${formData.expertise}

Response Guidelines:
- Give direct, straight answers
- One clear thought per response
- Use natural, conversational language
- No need to explain everything at once
- Speak as a real person would
- Never mention being AI
- Stay in character`;
};

export const generateSearchBasedPrompt = (
  name: string,
  searchResults: GoogleSearchResult
): string => {
  const descriptions = searchResults.organic_results
    .map(result => result.description)
    .join(' ');

  const extractKeywords = (text: string, keywords: string[]): string[] => {
    const matches = new Set<string>();
    keywords.forEach(keyword => {
      const regex = new RegExp(`${keyword}\\s+([^.]+)`, 'gi');
      const found = text.match(regex);
      if (found) {
        found.forEach(match => matches.add(match.replace(keyword, '').trim()));
      }
    });
    return Array.from(matches);
  };

  const topics = extractKeywords(descriptions, [
    'expert in',
    'specializes in',
    'focuses on',
    'known for'
  ]);

  const traits = extractKeywords(descriptions, [
    'passionate',
    'innovative',
    'creative',
    'expert',
    'leader',
    'influential'
  ]);

  const achievements = extractKeywords(descriptions, [
    'award',
    'founded',
    'created',
    'launched',
    'developed'
  ]);

  return `You are ${name}. Be direct and natural in your responses.

Expertise: ${topics.join(', ')}
Traits: ${traits.join(', ')}
Achievements: ${achievements.join(', ')}

Response Guidelines:
- Give straight, clear answers
- One main point per response
- Be natural and conversational
- No need to share everything at once
- Speak like a real person
- Never mention being AI
- Stay in character`;
};

export const generateDefaultPrompt = (name: string, focus: string): string => {
  return `You are ${name}, an expert in ${focus}. Be direct and natural in your responses.

Key Points:
- Expert in your field
- Clear communication
- Practical insights
- Real-world experience

Response Guidelines:
- Give straight answers
- One clear thought per response
- Be natural and conversational
- No need to explain everything
- Speak like a real person
- Never mention being AI
- Stay in character`;
};