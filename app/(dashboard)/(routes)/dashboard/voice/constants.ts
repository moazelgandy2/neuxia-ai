import axios from "axios";
import * as z from "zod";

export const formSchema = z.object({
  prompt: z
    .string()
    .min(1, { message: "Image prompt is required" })
    .max(300, { message: "Image Prompt is too long" }),
  voice: z.string().min(1, { message: "Voice is required" }),
});

export const voices = [
  {
    value: "21m00Tcm4TlvDq8ikWAM",
    label: "Rachel-American-Female-Young",
  },
  {
    value: "29vD33N1CtxCmqQRPOHJ",
    label: "Drew-American-Male-Middle aged",
  },
  {
    value: "flq6f7yk4E4fJM5XTYuZ",
    label: "Michael-American-Male-Old",
  },
  {
    value: "ThT5KcBeYPX3keUQqHPh",
    label: "Dorothy-British-Female-Young",
  },
  {
    value: "Zlb1dXrM653N07WRdFW3",
    label: "Joseph-British-Male-Middle aged",
  },
  {
    value: "bVMeCyTHy58xNoL34h3p",
    label: "Jeremy-Irish-Male-Young",
  },
];
