import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { superheroSchemaType } from "@/lib/zod-schemas";
import { useFormContext } from "react-hook-form";

const OriginDescriptionTextarea = () => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<superheroSchemaType>();
  return (
    <FormField
      control={control}
      name="originDescription"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Origin description</FormLabel>
          <FormControl>
            <Textarea {...field} disabled={isSubmitting} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default OriginDescriptionTextarea;
