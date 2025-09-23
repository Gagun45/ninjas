import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { createSuperheroSchemaType } from "@/lib/zod-schemas";
import { useFormContext } from "react-hook-form";

const ImagesInput = () => {
  const { control } = useFormContext<createSuperheroSchemaType>();
  return (
    <FormField
      control={control}
      name="images"
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
  );
};
export default ImagesInput;
