import prisma from "@/lib/prisma";
import type { SuperpowerType } from "@/lib/types";

const AllSuperpowersSection = async () => {
  let superpowers: SuperpowerType[] = [];
  try {
    superpowers = await prisma.superpower.findMany();
  } catch (error) {
    console.log("Failed to fetch all superpowers: ", error);
    return (
      <section className="flex flex-col w-full max-w-2xl">
        <h2 className="text-xl font-semibold py-4">Existing superpowers</h2>
        <p className="font-semibold">
          Unexpected error. Failed to load existing superpowers.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col w-full max-w-2xl">
      <h2 className="text-xl font-semibold py-4">Existing superpowers</h2>
      {superpowers.length === 0 ? (
        <span>No superpowers exist so far</span>
      ) : (
        <ul className="flex flex-col gap-2 list-disc pl-4">
          {superpowers.map((spower) => (
            <li key={spower.id}>{spower.power}</li>
          ))}
        </ul>
      )}
    </section>
  );
};
export default AllSuperpowersSection;
