"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("59edfe0b-eb95-4c0a-8a2c-f9871a5e668c");
  }, []);

  return null;
};
