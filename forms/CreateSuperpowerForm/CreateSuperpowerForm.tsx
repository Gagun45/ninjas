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
import { toast } from "sonner";
import { useCreateSuperpowerMutation } from "@/redux/apis/superpowersApi";
import LoadingButton from "@/components/General/LoadingButton/LoadingButton";

const CreateSuperpowerForm = () => {
  const [addNewSuperhero, { isLoading }] = useCreateSuperpowerMutation();
  const form = useForm<createSuperpowerSchemaType>({
    resolver: zodResolver(createSuperpowerSchema),
    defaultValues: {
      power: "",
    },
  });
  const onSubmit = async (values: createSuperpowerSchemaType) => {
    const { data, error } = await addNewSuperhero({ values });
    if (error) {
      toast.error("Unexpected error");
      return;
    }
    if (data) {
      if (data.success) {
        toast.success("New superpower added!");
        form.reset();
      } else {
        toast.error(data.message);
      }
    }
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
                <Input {...field} disabled={form.formState.isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? <LoadingButton /> : <Button type="submit">Create</Button>}
      </form>
    </Form>
  );
};
export default CreateSuperpowerForm;
