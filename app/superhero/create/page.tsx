"use client";

import ManageSuperheroForm from "@/forms/ManageSuperheroForm/ManageSuperheroForm";
import type { superheroSchemaType } from "@/lib/zod-schemas";
import { useCreateSuperheroMutation } from "@/redux/apis/superheroesApi";
import { toast } from "sonner";

const CreateSuperheroPage = () => {
  const [createSuperhero, { isLoading }] = useCreateSuperheroMutation();
  const onSave = async (values: superheroSchemaType) => {
    try {
      const { data } = await createSuperhero({ values });
      if (data?.success) {
        toast.success("Superhero created");
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Unexpected error");
    }
  };
  return (
    <main>
      <h1>Create a superhero</h1>
      <ManageSuperheroForm onSave={onSave} isLoading={isLoading} />
    </main>
  );
};
export default CreateSuperheroPage;
