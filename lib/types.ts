import type { Prisma } from "@prisma/client";

export interface LinkInterface {
  label: string;
  href: string;
}

export type SuperpowerType = Prisma.SuperpowerGetPayload<object>;
