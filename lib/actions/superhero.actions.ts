"use server";

import prisma from "../prisma";
import type { createSuperheroSchemaType } from "../zod-schemas";

export const createSuperhero = async (
  values: createSuperheroSchemaType
): Promise<{ success: boolean; pid: string }> => {
  const { catchPhrase, nickname, originDescription, realName, superpowers } =
    values;
  try {
    const newSuperhero = await prisma.superhero.create({
      data: {
        catchPhrase,
        nickname,
        originDescription,
        realName,
        superpowers: { connect: superpowers.map((id) => ({ id })) },
      },
    });
    if (!newSuperhero) return { success: false, pid: "" };
    return { success: true, pid: newSuperhero.pid };
  } catch (error) {
    console.log("Create superhero error: ", error);
    return { success: false, pid: "" };
  }
};
