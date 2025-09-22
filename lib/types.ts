import type { Prisma } from "@prisma/client";

export interface LinkInterface {
  label: string;
  href: string;
}

export type SuperpowerType = Prisma.SuperpowerGetPayload<object>;
export type SuperheroHomepageType = Prisma.SuperheroGetPayload<{
  select: { nickname: true; pid: true };
}>;

export type SuperheroDetailedType = Prisma.SuperheroGetPayload<{
  include: { superpowers: true };
  omit: { id : true};
}>;
