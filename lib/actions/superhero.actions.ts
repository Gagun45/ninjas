"use server";

import type { Prisma } from "@prisma/client";
import prisma from "../prisma";
import type { SuperheroDetailedType, SuperheroHomepageType } from "../types";
import type { superheroSchemaType } from "../zod-schemas";
import { PER_PAGE_OPTIONS } from "../constants";
import { cloudinary } from "../cloudinary";

export const createSuperhero = async (
  values: superheroSchemaType
): Promise<{ success: boolean; pid: string }> => {
  const {
    catchPhrase,
    nickname,
    originDescription,
    realName,
    superpowers,
    imageFiles,
  } = values;
  try {
    let finalUrls: string[] = [];
    if (imageFiles) {
      const urlsData = await uploadImage(imageFiles);
      if (urlsData.success) {
        finalUrls = urlsData.urls;
      }
    }
    if (finalUrls.length === 0) return { success: false, pid: "" };
    const newSuperhero = await prisma.superhero.create({
      data: {
        catchPhrase,
        nickname,
        originDescription,
        realName,
        superpowers: { connect: superpowers.map((id) => ({ id })) },
        images: {
          create: finalUrls.map((url) => ({ url })),
        },
      },
    });
    if (!newSuperhero) return { success: false, pid: "" };
    return { success: true, pid: newSuperhero.pid };
  } catch (error) {
    console.log("Create superhero error: ", error);
    return { success: false, pid: "" };
  }
};

export const editSuperhero = async (
  values: superheroSchemaType,
  pid: string
): Promise<{
  success: boolean;
}> => {
  try {
    const {
      catchPhrase,
      nickname,
      originDescription,
      realName,
      superpowers,
      imageFiles,
      imageUrls,
    } = values;
    let finalUrls: string[] = [];
    if (imageFiles) {
      const urlsData = await uploadImage(imageFiles);
      if (urlsData.success) {
        finalUrls = urlsData.urls;
      }
      console.log(urlsData);
    }
    if (imageUrls) {
      finalUrls.push(...imageUrls);
    }
    if (finalUrls.length === 0) return { success: false };
    const existingUrlObjs = await prisma.images.findMany({
      where: { Superhero: { pid } },
    });
    const existingUrls = existingUrlObjs.map((obj) => obj.url);
    const toDelete = existingUrls.filter((url) => !finalUrls.includes(url));
    const toAdd = finalUrls.filter((url) => !existingUrls.includes(url));
    await prisma.$transaction(
      async (tx) => {
        const hero = await tx.superhero.findUnique({
          where: { pid },
          select: { id: true },
        });
        if (!hero) throw new Error("Superhero not found");
        const superheroId = hero.id;

        if (toDelete.length > 0) {
          await tx.images.deleteMany({
            where: { Superhero: { pid }, url: { in: toDelete } },
          });
        }

        if (toAdd.length > 0) {
          await tx.images.createMany({
            data: toAdd.map(
              (url) => ({ url, superheroId } as Prisma.ImagesCreateManyInput)
            ),
          });
        }
        await prisma.superhero.update({
          where: { pid },
          data: {
            catchPhrase,
            nickname,
            originDescription,
            realName,
            superpowers: { set: superpowers.map((id) => ({ id })) },
          },
        });
      },
      { timeout: 15000 }
    );

    return { success: true };
  } catch (error) {
    console.log("Edit superhero error: ", error);
    return { success: false };
  }
};

export const uploadImage = async (files: File[]) => {
  const uploadedUrls: string[] = [];
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{ secure_url: string }>((res, rej) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "ninjas_uploads",
        },
        (error, result) => {
          if (error) return rej(error);
          res(result as { secure_url: string });
        }
      );
      stream.end(buffer);
    });
    uploadedUrls.push(result.secure_url);
  }
  if (files.length !== uploadedUrls.length) {
    return { success: false, urls: [] };
  }
  return { success: true, urls: uploadedUrls };
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
        select: { pid: true, nickname: true, images: true },
      }),
      prisma.superhero.count(),
    ]);
    return { success: true, superheroes, totalCount };
  } catch (error) {
    console.log("Get superheroes error: ", error);
    return { success: false, superheroes: [], totalCount: 0 };
  }
};

export const getSuperheroByPid = async ({
  pid,
}: {
  pid: string;
}): Promise<{ success: boolean; superhero: SuperheroDetailedType | null }> => {
  try {
    const superhero = await prisma.superhero.findUnique({
      where: { pid },
      include: { superpowers: true, images: true },
    });
    return { success: true, superhero };
  } catch (error) {
    console.log("Get superhero by pid error: ", error);
    return { success: false, superhero: null };
  }
};

export const deleteSuperheroByPid = async ({
  pid,
}: {
  pid: string;
}): Promise<{ success: boolean }> => {
  try {
    await prisma.superhero.delete({
      where: { pid },
    });
    return { success: true };
  } catch (error) {
    console.log("Delete superhero by pid error: ", error);
    return { success: false };
  }
};
