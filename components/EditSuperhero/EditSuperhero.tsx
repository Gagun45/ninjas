"use client";

import ManageSuperheroForm from "@/forms/ManageSuperheroForm/ManageSuperheroForm";
import type { SuperheroDetailedType } from "@/lib/types";
import type { superheroSchemaType } from "@/lib/zod-schemas";
import { useEditSuperheroMutation } from "@/redux/apis/superheroesApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  superhero: SuperheroDetailedType;
}

const EditSuperhero = ({ superhero }: Props) => {
  const [editSuperhero, { isLoading }] = useEditSuperheroMutation();
  const router = useRouter();
  const onSave = async (values: superheroSchemaType) => {
    const { data, error } = await editSuperhero({
      values,
      pid: superhero.pid,
    });
    if (error) {
      toast.error("Unexpected error");
      return;
    }
    if (data) {
      if (data.success) {
        toast.success("Superhero updated");
        router.push(`/superhero/${superhero.pid}`);
      } else {
        toast.error(data.message);
      }
    }
  };
  return (
    <ManageSuperheroForm
      onSave={onSave}
      isLoading={isLoading}
      superhero={superhero}
    />
  );
};
export default EditSuperhero;
