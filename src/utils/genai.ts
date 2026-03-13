const FALLBACK_GEMINI_KEY = 'AIzaSyCrh3ZPkhQsPYIHy127I8lUHye0Y1NYs9E';

export const geminiApiKey = import.meta.env.GEMINI_API_KEY ?? FALLBACK_GEMINI_KEY;
export const hasGeminiApiKey = Boolean(geminiApiKey);

export const geminiHeaders = geminiApiKey
  ? {
      Authorization: `Bearer ${geminiApiKey}`,
      'Content-Type': 'application/json',
    }
  : {
      'Content-Type': 'application/json',
    };

export function requireGeminiApiKey() {
  if (!geminiApiKey) {
    throw new Error('Missing GEMINI_API_KEY. Set GEMINI_API_KEY in your environment or secrets panel.');
  }
  return geminiApiKey;
}
