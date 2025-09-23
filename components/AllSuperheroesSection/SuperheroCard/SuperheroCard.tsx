import type { SuperheroHomepageType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  superhero: SuperheroHomepageType;
}

const SuperheroCard = ({ superhero }: Props) => {
  return (
    <div className="w-64 rounded-md overflow-hidden border-2 border-black flex flex-col items-center">
      <div className="relative size-64 shrink-0">
        <Image src={superhero.images[0].url} alt="Superhero avatar" fill />
      </div>
      <Link
        className="font-semibold py-2 underline"
        href={`/superhero/${superhero.pid}`}
      >
        {superhero.nickname}
      </Link>
    </div>
  );
};
export default SuperheroCard;
