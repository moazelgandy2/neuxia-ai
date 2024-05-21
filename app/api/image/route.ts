import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

let conversationHistory: any = []; // Stores conversation history for context

const model = genAI.getGenerativeModel({
  model: "gemini-pro-vision",
});

function fileToGenerative(path: string, mimetype: any) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType: mimetype,
    },
  };
}

export async function POST(req: Request) {
  try {
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

    const imageParts = [fileToGenerative("public/logo.png", "image/png")];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;

    const text = response.text();
    console.log(text);

    return NextResponse.json(text, { status: 200 });
  } catch (e) {
    console.error("[GEMINI_TEXT_ERROR_API]", e);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

function buildFullPrompt(history: any[], prompt: string) {
  const previousMessages = history.map((message) => message.message).join("\n");
  return `${previousMessages}\n${prompt}`;
}
