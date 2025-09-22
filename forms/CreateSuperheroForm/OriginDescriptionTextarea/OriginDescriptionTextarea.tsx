import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { createSuperheroSchemaType } from "@/lib/zod-schemas";
import { useFormContext } from "react-hook-form";

const OriginDescriptionTextarea = () => {
  const { control } = useFormContext<createSuperheroSchemaType>();
  return (
    <FormField
      control={control}
      name="originDescription"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Origin description</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default OriginDescriptionTextarea;
