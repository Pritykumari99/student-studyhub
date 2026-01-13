
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedQuestion } from "../types";

export class GeminiService {
  private static getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  static async solveQuestion(question: string): Promise<string> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `You are an expert AI engineering tutor. 
        Answer ONLY academic questions related to engineering (math, physics, CS, mechanical, etc.).
        Explain solutions step-by-step in simple language. 
        If a question is non-educational or political/adult, politely decline.
        Format your response with clean Markdown.`,
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  }

  static async generateQuestionsFromImage(base64Image: string): Promise<GeneratedQuestion[]> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1] || base64Image,
            },
          },
          {
            text: `Act as an engineering professor. From the provided image:
            1. Extract the core academic text/concepts.
            2. Generate 10 exam-oriented questions based on this content.
            3. Include a mix of: 2-mark (short), 5-mark (detailed), and Numerical (if applicable).
            4. Output ONLY a valid JSON array matching the schema.`,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
              marks: { type: Type.NUMBER },
              type: { type: Type.STRING, description: "Theoretical, Numerical, or Conceptual" },
            },
            required: ["id", "text", "marks", "type"],
          },
        },
      },
    });

    try {
      return JSON.parse(response.text || "[]");
    } catch (e) {
      console.error("Failed to parse AI response as JSON", e);
      return [];
    }
  }
}
