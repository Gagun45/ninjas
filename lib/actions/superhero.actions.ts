"use server";

import prisma from "../prisma";
import type { SuperheroHomepageType } from "../types";
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

export const getSuperheroes = async ({
  perPage,
  page,
}: {
  perPage: number;
  page: number;
}): Promise<{
  success: boolean;
  superheroes: SuperheroHomepageType[];
  totalCount: number;
}> => {
  try {
    const [superheroes, totalCount] = await Promise.all([
      prisma.superhero.findMany({
        take: perPage,
        skip: perPage * (page - 1),
        select: { pid: true, nickname: true },
      }),
      prisma.superhero.count(),
    ]);
    return { success: true, superheroes, totalCount };
  } catch (error) {
    console.log("Get superheroes error: ", error);
    return { success: false, superheroes: [], totalCount: 0 };
  }
};
