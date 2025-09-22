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
import { createSuperhero } from "@/lib/actions/superhero.actions";
import { toast } from "sonner";

const CreateSuperheroForm = () => {
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
    const { success, pid } = await createSuperhero(values);
    if (success) {
      toast.success("Superhero created");
      // ROUTER TO /superhero/pid //
    } else {
      toast.error("Something went wrong");
    }
    form.reset();
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default CreateSuperheroForm;
