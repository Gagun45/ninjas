import prisma from "@/lib/prisma";

const AllSuperpowersSection = async () => {
  const superpowers = await prisma.superpower.findMany();

  return (
    <section className="flex flex-col w-full max-w-2xl">
      <h2>Existing superpowers</h2>
      <div className="flex flex-col gap-2">
        {superpowers.map((spower) => (
          <span key={spower.id}>{spower.power}</span>
        ))}
      </div>
    </section>
  );
};
export default AllSuperpowersSection;
