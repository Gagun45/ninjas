import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { superheroSchemaType } from "@/lib/zod-schemas";
import type { RefObject } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  inputRef: RefObject<HTMLInputElement | null>;
}

const ImagesInput = ({ inputRef }: Props) => {
  const {
    control,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useFormContext<superheroSchemaType>();
  const existingUrls = watch("imageUrls");
  const handleDeleteExistingUrl = (existingUrl: string) => {
    setValue(
      "imageUrls",
      existingUrls?.filter((url) => url != existingUrl)
    );
  };
  return (
    <div>
      <FormField
        control={control}
        name="imageFiles"
        render={({ field: { onChange, onBlur, ref, name } }) => (
          <FormItem>
            <FormLabel>Images</FormLabel>
            <FormControl>
              <Input
                placeholder="asdasd"
                multiple
                type="file"
                accept="image/*"
                disabled={isSubmitting}
                name={name}
                ref={(e) => {
                  ref(e);
                  inputRef.current = e;
                }}
                onBlur={onBlur}
                onChange={(e) => onChange(Array.from(e.target.files ?? []))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {existingUrls && existingUrls.length > 0 && (
        <div className="flex flex-col">
          <span>Existing urls:</span>
          {existingUrls?.map((url) => (
            <div key={url}>
              <span>{url}</span>
              <Button onClick={() => handleDeleteExistingUrl(url)}>
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ImagesInput;
