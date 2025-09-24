"use client";

import ManageSuperheroForm from "@/forms/ManageSuperheroForm/ManageSuperheroForm";
import type { superheroSchemaType } from "@/lib/zod-schemas";
import { useCreateSuperheroMutation } from "@/redux/apis/superheroesApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreateSuperheroPage = () => {
  const [createSuperhero, { isLoading }] = useCreateSuperheroMutation();
  const router = useRouter();
  const onSave = async (values: superheroSchemaType) => {
    const { data, error } = await createSuperhero({ values });
    if (error) {
      toast.error("Unexpected error");
      return;
    }
    if (data) {
      if (data.success) {
        toast.success("Superhero created");
        router.push(`/superhero/${data.pid}`);
      } else {
        toast.error(data.message);
      }
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
