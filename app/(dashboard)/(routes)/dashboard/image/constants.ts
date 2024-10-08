import * as z from "zod";

export const formSchema = z.object({
  prompt: z
    .string()
    .min(1, { message: "Prompt is required" })
    .max(300, { message: "Prompt is too long" }),
});
