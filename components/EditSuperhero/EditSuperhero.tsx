"use client";

import ManageSuperheroForm from "@/forms/ManageSuperheroForm/ManageSuperheroForm";
import type { SuperheroDetailedType } from "@/lib/types";
import type { superheroSchemaType } from "@/lib/zod-schemas";

interface Props {
  superhero: SuperheroDetailedType;
}

const EditSuperhero = ({ superhero }: Props) => {
  const onSave = async (values: superheroSchemaType) => {
    console.log("ASDASDASD: ", values);
  };
  return (
    <ManageSuperheroForm
      onSave={onSave}
      isLoading={false}
      superhero={superhero}
    />
  );
};
export default EditSuperhero;
