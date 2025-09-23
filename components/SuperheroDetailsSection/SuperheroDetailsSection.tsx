import type { SuperheroDetailedType } from "@/lib/types";
import Link from "next/link";
import DeleteSuperheroButton from "./DeleteSuperheroButton/DeleteSuperheroButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { buttonVariants } from "../ui/button";

interface Props {
  superhero: SuperheroDetailedType;
}

const SuperheroDetailsSection = ({ superhero }: Props) => {
  return (
    <section className="w-full flex flex-col items-center">
      <h1>{superhero.nickname}</h1>
      <div className="flex items-center justify-center gap-4 mb-4">
        <Link className={`${buttonVariants({variant: 'default'})} w-24`} href={`${superhero.pid}/edit`}>Edit</Link>
        <DeleteSuperheroButton pid={superhero.pid} />
      </div>
      <Carousel className="size-64 sm:size-96">
        <CarouselContent>
          {superhero.images.map((image) => (
            <CarouselItem key={image.id}>
              <div className="size-64 sm:size-96 relative">
                <Image alt="Superhero image" fill src={image.url} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-main hover:bg-main" />
        <CarouselNext className="bg-main hover:bg-main" />
      </Carousel>

      <p>details ....</p>
    </section>
  );
};
export default SuperheroDetailsSection;
