import { GoogleGenAI } from "@google/genai";
import { Job } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchJobs = async (query: string): Promise<Job[]> => {
  try {
    // We use gemini-2.5-flash for speed and search capability
    // OPTIMIZATION: Reduced requested count to 15-20 to drastically improve loading speed. 
    // Generating 100 items takes too long for a single synchronous web request.
    
    const prompt = `
      Search the web for active, open job positions related to: "${query}".
      
      CRITICAL INSTRUCTIONS:
      1. LIMIT: Find only the top 15 high-quality, relevant listings. Speed is a priority.
      2. LINKS: Every job listing MUST have a direct, specific, and working URL to the job application. 
         - Do NOT include jobs with generic company career pages.
         - If a specific link is not found, DO NOT include the job.
         - Better to have fewer high-quality links than many broken ones.

      Focus on roles that involve:
      - "Vibecoding" (AI-assisted coding, Cursor, Replit, V0 users)
      - AI Engineer / AI Developer / LLM Engineer
      - Creative Technologist
      - Frontend Engineer (React/TypeScript) with AI fluency
      - Prompt Engineer

      Provide the output strictly as a JSON array inside a markdown code block (\`\`\`json ... \`\`\`).
      Each object in the array should have these fields:
      - id: string (unique identifier, can be random)
      - title: string
      - company: string
      - location: string (e.g. "Remote", "San Francisco, CA")
      - type: string (e.g. "Full-time", "Contract")
      - salary: string (e.g. "$120k - $180k", or "Competitive" if unknown)
      - description: string (short summary, max 120 characters)
      - url: string (REQUIRED: Direct link to the job post)
      - tags: array of strings (e.g. ["React", "AI", "Remote"])
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType: "application/json" // NOT ALLOWED with googleSearch
      },
    });

    const text = response.text || "";
    
    // Extract JSON from code block
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```([\s\S]*?)```/) || text.match(/\[[\s\S]*\]/);
    
    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      try {
        const jobs: Job[] = JSON.parse(jsonStr);
        // Safety filter: Ensure every job has a URL before returning
        return jobs.filter(job => job.url && job.url.trim().length > 0 && !job.url.includes("example.com"));
      } catch (e) {
        console.error("Failed to parse JSON from model response", e);
        throw new Error("Could not parse job data.");
      }
    } else {
       console.warn("No JSON code block found in response:", text);
       throw new Error("No structured data found.");
    }

  } catch (error) {
    console.error("Error fetching jobs:", error);
    // Return empty array or throw based on preference. 
    // For UI stability, we might want to return mock data in a real failure if we were strictly demoing, 
    // but here we throw to let the UI handle the error state.
    throw error;
  }
};