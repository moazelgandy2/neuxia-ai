# 🚀 Neuxia - AI SaaS Platform

**Neuxia** is an advanced AI SaaS platform built with Next.js and React, integrating cutting-edge AI models for conversational AI, code generation, text-to-speech, and image generation. The platform is designed for performance and scalability, achieving **100%** performance and SEO optimization while providing secure authentication and robust database management.

## ✨ Features

- 💬 **Conversational AI**: AI-powered chatbots that provide real-time interactions.
- 🖥️ **Code Generation**: Generate code snippets using AI, streamlining development.
- 🗣️ **Text-to-Speech**: High-quality text-to-speech conversion for voice-driven applications.
- 🎨 **Image Generation**: Generate images using advanced AI models.
- 🔒 **Authentication**: User authentication is secured using Clerk.
- 🗄️ **Database Management**: MySQL managed with Prisma ORM.
- ☁️ **File Storage**: Integrated with Firebase Storage for seamless file handling.
- ⚡ **Performance Optimization**: Achieved 100% performance and SEO optimization.

## 🛠️ Technologies Used

- **Next.js**: For server-side rendering and performance optimizations.
- **React**: For building responsive user interfaces.
- **TypeScript**: For type safety and better development experience.
- **Clerk**: For secure user authentication.
- **MySQL & Prisma**: For efficient database management.
- **Firebase Storage**: For secure and scalable file storage.
- **Vercel**: For deploying the platform with high scalability.

## 🚀 Installation

1. Clone the repository:
   ```bash
    git clone https://github.com/moazelgandy2/neuxia-ai.git
   ```
2. Install dependencies

   ```bash
    npm install
    or
    yarn install
   ```

3. Set up your environment variables by renaming the `.env.example` file to `.env`:

   ```bash
   mv .env.example .env
   ```

4. Run the development server

   ```bash
     npm run dev
     OR
     yarn run dev
   ```

## 🚀 Usage

Once the development server is running, you can access the app at `http://localhost:3000`. Explore the various features, including AI-powered interactions, code generation, and image creation.

## ⚙️ Environment Variables

| Variable Name                         | Description                                 |
| ------------------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`   | Clerk publishable API key for public use    |
| `CLERK_SECRET_KEY`                    | Clerk secret key for server-side operations |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL`       | URL for the sign-in page                    |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL`       | URL for the sign-up page                    |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Redirect URL after successful sign-in       |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Redirect URL after successful sign-up       |
| `GEMINI_API_KEY`                      | API key for the Gemini service              |
| `REPLICATE_API_KEY`                   | API key for the Replicate service           |
| `ELEVEN_LABS_API_KEY`                 | API key for Eleven Labs (text-to-speech)    |
| `DATABASE_URL`                        | URL for connecting to the database          |
| `STRIP_API_SECRET_KEY`                | Stripe secret key for handling payments     |
| `NEXT_PUBLIC_APP_URL`                 | Publicly accessible URL of the application  |
| `STRIPE_WEBHOOK_SECRET`               | Secret key for verifying Stripe webhooks    |
| `FIREBASE_API_KEY`                    | Firebase API key                            |
| `FIREBASE_AUTH_DOMAIN`                | Firebase authentication domain              |
| `FIREBASE_PROJECT_ID`                 | Firebase project ID                         |
| `FIREBASE_STORAGE_BUCKET`             | Firebase storage bucket for file handling   |
| `FIREBASE_MESSAGING_SENDER_ID`        | Firebase messaging sender ID                |
| `FIREBASE_APP_ID`                     | Firebase app ID                             |
| `FIREBASE_MEASUREMENT_ID`             | Firebase measurement ID for analytics       |
