# 🚀 Neuxia - Multi-Modal AI Gateway & SaaS Platform

![Neuxia Banner](public/logo.png) 

## **Neuxia** is a comprehensive AI SaaS platform that unifies multiple generative models (Gemini, Replicate, ElevenLabs) into a single interface. Built with **Next.js**, it features a robust **credit-based economy**, tiered subscriptions via **Stripe**, and a fully responsive, optimized UI.

Unlike simple API wrappers, Neuxia implements a secure gateway pattern to handle rate limiting, credit deduction (atomic transactions), and multi-provider orchestration.

## 🏗️ System Architecture

Neuxia operates as a central gateway between users and various AI providers:

1.  **Unified Interface**: A single app that is capable of rendering Markdown, Code Blocks (with syntax highlighting), Images, and Audio players dynamically.
2.  **Credit Ledger System**: Middleware intercepts requests to verify user credit balance before hitting expensive AI APIs.
3.  **Model Aggregation**:
    * **Google Gemini**: For natural language processing and code generation.
    * **Replicate**: For high-fidelity image, video, and music generation.
    * **ElevenLabs**: For neural text-to-speech synthesis.

## ✨ Key Features

### 🧠 The AI Suite
* **💬 Conversational AI**: Context-aware chat with memory (powered by Gemini).
* **👨‍💻 Intelligent Code Gen**: Generates, formats, and explains code snippets in real-time.
* **🎨 Image & Video Generation**: Prompt-to-Image/Video using Replicate's diffusion models.
* **🗣️ Neural Text-to-Speech**: Converts written text into lifelike audio using ElevenLabs.

### 💼 The SaaS Core
* **💳 Credit-Based Economy**: Granular consumption model (e.g., 1 image = 5 credits).
* **🔄 Subscription Tiers**: Monthly subscriptions handled via Stripe Checkout.
* **⚡ Webhook Handling**: Secure Stripe webhook listeners to automate credit top-ups and subscription renewals.
* **🔒 Enterprise-Grade Auth**: Powered by Clerk for seamless sign-up, session management, and user security.

## 🛠️ Technology Stack

* **Frontend**: Next.js 14 (App Router), React, TailwindCSS, Shadcn UI, Lucide Icons.
* **Backend**: Next.js Server Actions, Prisma ORM.
* **Database**: MySQL (PlanetScale/Aiven) for relational data.
* **State & Storage**: Firebase Storage (for generated assets), Zustand (Client state).
* **AI Providers**: OpenAI SDK (Generic Interface), Replicate SDK, Google Generative AI.
* **Payments**: Stripe SDK + Webhooks.

## 🚀 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/moazelgandy2/neuxia-ai.git](https://github.com/moazelgandy2/neuxia-ai.git)
    cd neuxia-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup:**
    Rename `.env.example` to `.env` and fill in the keys.

    <details>
    <summary>Click to view required Environment Variables</summary>

    | Variable Name | Description |
    | :--- | :--- |
    | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk Public Key |
    | `CLERK_SECRET_KEY` | Clerk Secret Key |
    | `GEMINI_API_KEY` | Google Gemini API Key |
    | `REPLICATE_API_KEY` | Replicate AI API Key |
    | `ELEVEN_LABS_API_KEY` | ElevenLabs API Key |
    | `DATABASE_URL` | MySQL Connection String |
    | `STRIPE_API_KEY` | Stripe Secret Key |
    | `STRIPE_WEBHOOK_SECRET` | Stripe CLI/Live Webhook Secret |
    | `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` or production URL |

    </details>

4.  **Database Push:**
    ```bash
    npx prisma db push
    ```

5.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## 📸 Usage

Once running at `http://localhost:3000`:
1.  **Navigate to Dashboard**: View your credit balance and recent generations.
2.  **Select a Tool**: Choose between Conversation, Code, Image, Video, or Music.
3.  **Manage Subscription**: Click "Manage Subscription" to open the Stripe Portal.

---

**Author**: Moaz El Gandy
*Built to demonstrate complex API orchestration and SaaS architecture.*
