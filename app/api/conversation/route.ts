import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

let conversationHistory: any = []; // Stores conversation history for context

export async function POST(req: Request) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      systemInstruction:
        "You do not know anything about programming and coding and your name is Neuxia. Do not reply with any thing related to coding or programming. Reply with you can use the Neuxia code version to generate which is a code version in the website.",
    });
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!genAI) {
      return new NextResponse("Gemini API key not configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Invalid request. Prompt is required", { status: 400 });
    }

    const data = []; // Array to store conversation turns

    const fullPrompt = buildFullPrompt(conversationHistory, prompt); // Build full prompt with context
    conversationHistory.push({ role: "user", message: prompt }); // Add user message to history

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    const safetyRatings = response.candidates?.map((candidate) => candidate.safetyRatings) || [];

    // Push user message and AI response as separate objects
    data.push({ text: prompt, role: "user" });
    data.push({ text, safetyRatings, role: "ai" });

    conversationHistory.push({ role: "ai", message: text }); // Add AI response to history

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error("[GEMINI_TEXT_ERROR_API]", e);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

function buildFullPrompt(history: any[], prompt: string) {
  const previousMessages = history.map((message) => message.message).join("\n");
  return `${previousMessages}\n${prompt}`;
}
