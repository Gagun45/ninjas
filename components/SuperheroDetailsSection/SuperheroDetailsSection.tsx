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

interface DetailInterface {
  label: string;
  value: string;
}

const SuperheroDetailsSection = ({ superhero }: Props) => {
  const details: DetailInterface[] = [
    { label: "Nickname", value: superhero.nickname },
    { label: "Real name", value: superhero.realName },
    { label: "Origin description", value: superhero.originDescription },
    { label: "Catch phrase", value: superhero.catchPhrase },
  ];
  return (
    <section className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center justify-center">
        <h1>{superhero.nickname}</h1>
        <div className="flex items-center justify-center gap-4 mb-4">
          <Link
            className={`${buttonVariants({ variant: "default" })} w-24`}
            href={`${superhero.pid}/edit`}
          >
            Edit
          </Link>
          <DeleteSuperheroButton pid={superhero.pid} />
        </div>
      </div>
      <div className="grid grid-cols-1 max-w-7xl lg:grid-cols-2 gap-4 w-full py-4">
        <div className="w-full mx-auto max-w-xl flex items-center justify-center ">
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
        </div>
        <div className="w-full mx-auto max-w-xl flex items-center justify-center ">
          <div className="flex flex-col w-full gap-2 border-2 border-main rounded-md p-2">
            <span className="font-semibold text-lg">Superhero details:</span>
            <ul className="space-y-1">
              {details.map((detail) => (
                <li key={detail.label}>
                  <strong>{detail.label}:</strong> {detail.value}
                </li>
              ))}
              <li>
                <strong>Superpowers:</strong>
                <ul className="pl-8">
                  {superhero.superpowers.map((s) => (
                    <li key={s.id}>{s.power}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SuperheroDetailsSection;
