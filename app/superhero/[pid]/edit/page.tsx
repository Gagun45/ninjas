// import EditSuperheroForm from "@/forms/EditSuperheroForm/EditSuperheroForm";
import EditSuperhero from "@/components/EditSuperhero/EditSuperhero";
import { getSuperheroByPid } from "@/lib/actions/superhero.actions";
import type { SuperheroDetailedType } from "@/lib/types";

interface Props {
  params: Promise<{ pid: string }>;
}

const SuperheroEditPage = async ({ params }: Props) => {
  let superhero: SuperheroDetailedType | null = null;
  try {
    const { pid } = await params;
    const { success, superhero: shero } = await getSuperheroByPid({ pid });
    if (!success) {
      return <main>Something went wrong</main>;
    }

    if (!shero) {
      return <main>Superhero not found</main>;
    }
    superhero = shero;
  } catch {
    return <main>Something went wrong</main>;
  }
  return (
    <main>
      <h1>Edit superhero</h1>
      <EditSuperhero superhero={superhero} />
    </main>
  );
};
export default SuperheroEditPage;
