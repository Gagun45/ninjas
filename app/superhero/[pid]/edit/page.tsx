// import EditSuperheroForm from "@/forms/EditSuperheroForm/EditSuperheroForm";
import EditSuperhero from "@/components/EditSuperhero/EditSuperhero";
import ManageSuperheroForm from "@/forms/ManageSuperheroForm/ManageSuperheroForm";
import { getSuperheroByPid } from "@/lib/actions/superhero.actions";
import type { superheroSchemaType } from "@/lib/zod-schemas";

interface Props {
  params: Promise<{ pid: string }>;
}

const SuperheroEditPage = async ({ params }: Props) => {
  const { pid } = await params;
  const { success, superhero } = await getSuperheroByPid({ pid });
  if (!success) {
    return <main>Something went wrong</main>;
  }

  if (!superhero) {
    return <main>Superhero not found</main>;
  }
  const onSave = async (
    values: superheroSchemaType,
    images?: File[],
    existingUrls?: string[]
  ) => {
    console.log("ASDASDASD: ", values, images, existingUrls);
  };
  return (
    <main>
      <h1>Edit superhero</h1>
      <EditSuperhero superhero={superhero} />
    </main>
  );
};
export default SuperheroEditPage;
