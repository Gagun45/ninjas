"use server";

import type { Prisma } from "@prisma/client";
import prisma from "../prisma";
import type { SuperheroHomepageType } from "../types";
import type { createSuperheroSchemaType } from "../zod-schemas";
import { PER_PAGE_OPTIONS } from "../constants";

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
  sortOption,
}: {
  perPage: number;
  page: number;
  sortOption: string;
}): Promise<{
  success: boolean;
  superheroes: SuperheroHomepageType[];
  totalCount: number;
}> => {
  try {
    const orderBy: Prisma.SuperheroOrderByWithRelationInput = {};
    switch (sortOption) {
      case "nicknameDesc":
        orderBy.nickname = "desc";
        break;
      case "nicknameAsc":
      default:
        orderBy.nickname = "asc";
    }
    const validatedPerPage = PER_PAGE_OPTIONS.find(
      (opt) => opt === perPage.toString()
    )
      ? perPage
      : parseInt(PER_PAGE_OPTIONS[1]);
    const [superheroes, totalCount] = await Promise.all([
      prisma.superhero.findMany({
        take: validatedPerPage,
        skip: validatedPerPage * (page - 1),
        orderBy,
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
