import type { Prisma } from "@prisma/client";

export interface LinkInterface {
  label: string;
  href: string;
}

export type SuperpowerType = Prisma.SuperpowerGetPayload<object>;
export type SuperheroHomepageType = Prisma.SuperheroGetPayload<{
  select: { nickname: true; pid: true; images: true };
}>;

export type SuperheroDetailedType = Prisma.SuperheroGetPayload<{
  include: { superpowers: true; images: true };
  omit: { id: true };
}>;
