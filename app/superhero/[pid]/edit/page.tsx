// import EditSuperheroForm from "@/forms/EditSuperheroForm/EditSuperheroForm";
import EditSuperhero from "@/components/EditSuperhero/EditSuperhero";
import { getSuperheroByPid } from "@/lib/actions/superhero.actions";

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
  return (
    <main>
      <h1>Edit superhero</h1>
      <EditSuperhero superhero={superhero} />
    </main>
  );
};
export default SuperheroEditPage;
