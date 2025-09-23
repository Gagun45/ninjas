"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { SuperheroSchema, type superheroSchemaType } from "@/lib/zod-schemas";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import NicknameInput from "./NicknameInput/NicknameInput";
import RealNameInput from "./RealNameInput/RealNameInput";
import OriginDescriptionTextarea from "./OriginDescriptionTextarea/OriginDescriptionTextarea";
import CatchPhraseInput from "./CatchPhraseInput/CatchPhraseInput";
import SuperpowersMultiselect from "./SuperpowersMultiselect/SuperpowersMultiselect";
import LoadingButton from "@/components/General/LoadingButton/LoadingButton";
import type { SuperheroDetailedType } from "@/lib/types";
import { useEffect } from "react";
import ImagesInput from "./ImagesInput/ImagesInput";

interface Props {
  onSave: (values: superheroSchemaType) => void;
  superhero?: SuperheroDetailedType;
  isLoading?: boolean;
}

const ManageSuperheroForm = ({ isLoading, onSave, superhero }: Props) => {
  const form = useForm<superheroSchemaType>({
    resolver: zodResolver(SuperheroSchema),
    defaultValues: {
      nickname: "",
      realName: "",
      originDescription: "",
      catchPhrase: "",
      superpowers: [],
    },
  });
  useEffect(() => {
    if (superhero?.nickname) {
      const {
        catchPhrase,
        nickname,
        originDescription,
        realName,
        superpowers,
        images,
      } = superhero;
      form.reset({
        catchPhrase,
        nickname,
        originDescription,
        realName,
        superpowers: superpowers.map((s) => s.id),
        imageUrls: images.map((i) => i.url),
      });
    }
  }, [superhero, form]);

  const onSubmit = async (values: superheroSchemaType) => {
    onSave(values);
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
        <ImagesInput />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};
export default ManageSuperheroForm;
