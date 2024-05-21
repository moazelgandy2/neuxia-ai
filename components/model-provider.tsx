"use client";

import { useEffect, useState } from "react";
import { ProModal } from "./pro-modal";
import { PromptModal } from "./prompt-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProModal />
      <PromptModal />
    </>
  );
};
