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
import { useEffect, useRef } from "react";
import ImagesInput from "./ImagesInput/ImagesInput";

interface Props {
  onSave: (values: superheroSchemaType) => Promise<void>;
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
      imageFiles: [],
      imageUrls: [],
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formReset = () => {
    form.reset();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const onSubmit = async (values: superheroSchemaType) => {
    await onSave(values);
    formReset();
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
        <ImagesInput inputRef={fileInputRef} />
        <div className="flex gap-4 items-center">
          <Button
            disabled={form.formState.isSubmitting}
            type="button"
            variant={"default"}
            onClick={() => {
              formReset();
            }}
          >
            Reset
          </Button>
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit">{superhero ? "Edit" : "Create"}</Button>
          )}
        </div>
      </form>
    </Form>
  );
};
export default ManageSuperheroForm;
