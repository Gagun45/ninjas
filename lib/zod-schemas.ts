import z from "zod";

export const createSuperpowerSchema = z.object({
  power: z
    .string()
    .min(3, { message: "Power must be at least 3 characters" })
    .max(36, { message: "Power must be at most 36 characters" }),
});

export const SuperheroSchema = z
  .object({
    nickname: z
      .string()
      .min(3, { message: "Nickname must be at least 3 characters" })
      .max(36, { message: "Nickname must be at most 36 characters" }),
    realName: z
      .string()
      .min(3, { message: "Real name must be at least 3 characters" })
      .max(36, { message: "Real name must be at most 36 characters" }),
    originDescription: z
      .string()
      .min(3, { message: "Origin description must be at least 3 characters" })
      .max(36, { message: "Origin description must be at most 36 characters" }),
    catchPhrase: z
      .string()
      .min(3, {
        message: "Catch phrase description must be at least 3 characters",
      })
      .max(36, {
        message: "Catch phrase description must be at most 36 characters",
      }),
    superpowers: z
      .array(z.int())
      .min(1, { message: "Choose at least one superpower" }),
    imageFiles: z.array(z.instanceof(File)).optional(),
    imageUrls: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      const totalCount =
        (data.imageFiles?.length || 0) + (data.imageUrls?.length ?? 0);
      return totalCount > 0;
    },
    { message: "Provide at least one image", path: ["imageFiles"] }
  );

export type createSuperpowerSchemaType = z.infer<typeof createSuperpowerSchema>;
export type superheroSchemaType = z.infer<typeof SuperheroSchema>;
