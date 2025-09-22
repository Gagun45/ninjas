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
  return <main>SuperheroEditPage for {superhero.nickname}</main>;
};
export default SuperheroEditPage;
