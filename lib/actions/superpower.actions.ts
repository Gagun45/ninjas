"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import type { createSuperpowerSchemaType } from "../zod-schemas";
import type { SuperpowerType } from "../types";

export const createSuperpower = async (
  values: createSuperpowerSchemaType
): Promise<{ success: boolean }> => {
  try {
    const { power } = values;
    const newSuperpower = await prisma.superpower.create({ data: { power } });
    if (!newSuperpower) return { success: false };
    revalidatePath("/create/superpowers");
    return { success: true };
  } catch (error) {
    console.log("Create superpower error: ", error);
    return { success: false };
  }
};

export const getAllSuperpowers = async (): Promise<{
  superpowers: SuperpowerType[];
}> => {
  try {
    const superpowers = await prisma.superpower.findMany();
    return { superpowers };
  } catch (error) {
    console.log("Create superpower error: ", error);
    return { superpowers: [] };
  }
};
