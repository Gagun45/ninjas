import type { SuperheroDetailedType } from "@/lib/types";
import Link from "next/link";
import DeleteSuperheroButton from "./DeleteSuperheroButton/DeleteSuperheroButton";

interface Props {
  superhero: SuperheroDetailedType;
}

const SuperheroDetailsSection = ({ superhero }: Props) => {
  return (
    <section>
      <h1>{superhero.nickname}</h1>
      <div className="flex items-center justify-center gap-4">
        <Link href={`${superhero.pid}/edit`}>Edit</Link>
        <DeleteSuperheroButton pid={superhero.pid} />
      </div>
      <p>details ....</p>
    </section>
  );
};
export default SuperheroDetailsSection;
