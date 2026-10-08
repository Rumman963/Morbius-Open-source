import { z } from "zod";

export const componentDraftSchema = z.object({
  title: z.string().trim().min(2, "Give your component a title.").max(120, "Keep the title under 120 characters."),
  description: z.string().trim().max(2000, "Keep the description under 2,000 characters."),
  category: z.enum(["component", "block", "page"]),
  framework: z.enum(["React", "Next.js", "HTML"]),
  styling: z.enum(["Tailwind CSS", "CSS", "shadcn/ui"]),
  sourceCode: z.string().trim().min(12, "Add at least a small, usable code sample."),
  style: z.enum(["Glass", "Minimal", "Editorial", "Signal"]),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Choose a valid accent color."),
});

export type ComponentDraft = z.infer<typeof componentDraftSchema>;
