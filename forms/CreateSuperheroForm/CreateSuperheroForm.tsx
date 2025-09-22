"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createSuperheroSchema,
  type createSuperheroSchemaType,
} from "@/lib/zod-schemas";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import NicknameInput from "./NicknameInput/NicknameInput";
import RealNameInput from "./RealNameInput/RealNameInput";
import OriginDescriptionTextarea from "./OriginDescriptionTextarea/OriginDescriptionTextarea";
import CatchPhraseInput from "./CatchPhraseInput/CatchPhraseInput";
import SuperpowersMultiselect from "./SuperpowersMultiselect/SuperpowersMultiselect";
import { toast } from "sonner";
import { useCreateSuperheroMutation } from "@/redux/apis/superheroesApi";
import LoadingButton from "@/components/General/LoadingButton/LoadingButton";

const CreateSuperheroForm = () => {
  const [createSuperhero, { isLoading }] = useCreateSuperheroMutation();
  const form = useForm<createSuperheroSchemaType>({
    resolver: zodResolver(createSuperheroSchema),
    defaultValues: {
      nickname: "",
      realName: "",
      originDescription: "",
      catchPhrase: "",
      superpowers: [],
    },
  });
  const onSubmit = async (values: createSuperheroSchemaType) => {
    try {
      const res = await createSuperhero({ values }).unwrap();
      if (res.success) {
        toast.success("Superhero created");
        form.reset();
        // ROUTER TO /superhero/pid //
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Unexpected error");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-2xl"
      >
        <NicknameInput />
        <RealNameInput />
        <OriginDescriptionTextarea />
        <CatchPhraseInput />
        <SuperpowersMultiselect />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};
export default CreateSuperheroForm;
