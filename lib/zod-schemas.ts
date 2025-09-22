import z from "zod";

export const createSuperpowerSchema = z.object({
  power: z
    .string()
    .min(3, { message: "Power must be at least 3 characters" })
    .max(36, { message: "Power must be at most 36 characters" }),
});

export type createSuperpowerSchemaType = z.infer<typeof createSuperpowerSchema>;
