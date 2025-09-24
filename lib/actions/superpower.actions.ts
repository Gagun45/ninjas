"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import type { createSuperpowerSchemaType } from "../zod-schemas";
import type { SuperpowerType } from "../types";
import { Prisma } from "@prisma/client";

export const createSuperpower = async (
  values: createSuperpowerSchemaType
): Promise<{ success: boolean; message: string }> => {
  try {
    const { power } = values;
    await prisma.superpower.create({ data: { power } });
    revalidatePath("/create/superpowers");
    return { success: true, message: "Superpower created" };
  } catch (error) {
    console.log("Create superpower error: ", error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = error.meta?.target as string[] | undefined;
      return {
        success: false,
        message:
          target && target[0] === "power"
            ? "Superpower already exists"
            : "Something went wrong",
      };
    }
    return { success: false, message: "Something went wrong" };
  }
};

export const getAllSuperpowers = async (): Promise<{
  superpowers: SuperpowerType[];
}> => {
  try {
    const superpowers = await prisma.superpower.findMany();
    return { superpowers };
  } catch (error) {
    console.log("Get all superpowers error: ", error);
    return { superpowers: [] };
  }
};
