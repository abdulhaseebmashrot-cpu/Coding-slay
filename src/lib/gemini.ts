import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateLesson = async (language: string, topic: string, difficulty: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a professional programming lesson for ${language} on the topic: ${topic} with a difficulty level of ${difficulty}. 
    The output must be in JSON format with the following structure:
    {
      "title": "Lesson Title",
      "content": "Markdown content explaining the concept with clear headings and explanations.",
      "codeExample": "A practical code example for the user to try.",
      "difficulty": "${difficulty}",
      "challenge": {
        "description": "A mini challenge for the user to solve.",
        "initialCode": "Starting code for the challenge.",
        "solution": "The correct code solution.",
        "testCases": [
          { "input": "optional input", "expectedOutput": "expected console output or result" }
        ]
      }
    }`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.STRING },
          codeExample: { type: Type.STRING },
          difficulty: { type: Type.STRING },
          challenge: {
            type: Type.OBJECT,
            properties: {
              description: { type: Type.STRING },
              initialCode: { type: Type.STRING },
              solution: { type: Type.STRING },
              testCases: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    input: { type: Type.STRING },
                    expectedOutput: { type: Type.STRING }
                  }
                }
              }
            }
          }
        },
        required: ["title", "content", "codeExample", "difficulty", "challenge"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};
