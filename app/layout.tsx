import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModalProvider } from "@/components/model-provider";
import { ToastProvider } from "@/components/toaster-provider";
import { CrispProvider } from "@/components/crisp-provider";
import { PromptModal } from "@/components/prompt-modal";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neuxia",
  description: "Ai platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
