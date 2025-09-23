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

const NicknameInput = () => {
  const { control, formState: {isSubmitting} } = useFormContext<superheroSchemaType>();
  return (
    <FormField
      control={control}
      name="nickname"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nickname</FormLabel>
          <FormControl>
            <Input {...field} disabled={isSubmitting}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default NicknameInput;
