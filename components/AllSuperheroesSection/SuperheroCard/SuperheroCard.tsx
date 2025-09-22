import type { SuperheroHomepageType } from "@/lib/types";

interface Props {
  superhero: SuperheroHomepageType;
}

const SuperheroCard = ({ superhero }: Props) => {
  return (
    <div className="size-48 rounded-md bg-amber-600 flex items-center justify-center">
      {superhero.nickname}
    </div>
  );
};
export default SuperheroCard;
