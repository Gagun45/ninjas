import LoadingIndicator from "@/components/General/LoadingIndicator/LoadingIndicator";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { superheroSchemaType } from "@/lib/zod-schemas";
import { useGetSuperpowersQuery } from "@/redux/apis/superpowersApi";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

const SuperpowersMultiselect = () => {
  const { data, isLoading } = useGetSuperpowersQuery();
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<superheroSchemaType>();
  if (data && data.superpowers.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-destructive font-semibold">
          No superpowers added yet. Creating a superhero w/o a superpower is not
          allowed
        </span>
        <Link
          className={`${buttonVariants({ variant: "default" })} w-fit `}
          href={"/superpower/create"}
        >
          Add superpower
        </Link>
      </div>
    );
  }
  return (
    <FormField
      control={control}
      name="superpowers"
      render={() => (
        <FormItem>
          <FormLabel>Superpowers</FormLabel>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              {data?.superpowers.map((sp) => (
                <FormField
                  key={sp.id}
                  control={control}
                  name="superpowers"
                  render={({ field }) => (
                    <FormItem key={sp.id} className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          disabled={isSubmitting}
                          checked={field.value?.includes(sp.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, sp.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== sp.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel>{sp.power}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default SuperpowersMultiselect;
