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

const RealNameInput = () => {
  const { control } = useFormContext<createSuperheroSchemaType>();
  return (
    <FormField
      control={control}
      name="realName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Real name</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default RealNameInput;
