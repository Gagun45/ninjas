import type { SuperheroHomepageType } from "@/lib/types";
import Link from "next/link";

interface Props {
  superhero: SuperheroHomepageType;
}

const SuperheroCard = ({ superhero }: Props) => {
  return (
    <div className="size-48 rounded-md bg-amber-600 flex items-center justify-center">
      <Link href={`/superhero/${superhero.pid}`}>{superhero.nickname}</Link>
    </div>
  );
};
export default SuperheroCard;
