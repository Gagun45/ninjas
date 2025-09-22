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
    const res = await addNewSuperhero({ values }).unwrap();
    if (res.success) {
      toast.success("New superpower added!");
    } else {
      toast.error("Something went wrong!");
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
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};
export default CreateSuperpowerForm;
