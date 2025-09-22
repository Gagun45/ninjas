"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createSuperpowerSchema,
  type createSuperpowerSchemaType,
} from "@/lib/zod-schemas";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createSuperpower } from "@/lib/actions/superpower.actions";
import { toast } from "sonner";

const CreateSuperpowerForm = () => {
  const form = useForm<createSuperpowerSchemaType>({
    resolver: zodResolver(createSuperpowerSchema),
    defaultValues: {
      power: "",
    },
  });
  const onSubmit = async (values: createSuperpowerSchemaType) => {
    const success = await createSuperpower(values);
    if (success) {
      toast.success("Superpower created");
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
        <FormField
          control={form.control}
          name="power"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Superpower</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default CreateSuperpowerForm;
