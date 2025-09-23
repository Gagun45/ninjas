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
import { useFormContext } from "react-hook-form";

const ImagesInput = () => {
  const { control, watch, setValue } = useFormContext<superheroSchemaType>();
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
                multiple
                type="file"
                accept="iamge/*"
                name={name}
                ref={ref}
                onBlur={onBlur}
                onChange={(e) => onChange(Array.from(e.target.files ?? []))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-col">
        <span>Existing urls:</span>
        {existingUrls?.map((url) => (
          <div key={url}>
            <span>{url}</span>
            <Button onClick={() => handleDeleteExistingUrl(url)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ImagesInput;
