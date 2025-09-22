import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getAllSuperpowers } from "@/lib/actions/superpower.actions";
import type { SuperpowerType } from "@/lib/types";
import type { createSuperheroSchemaType } from "@/lib/zod-schemas";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const SuperpowersMultiselect = () => {
  const [superpowers, setSuperpowers] = useState<SuperpowerType[]>([]);
  const fetchSuperpowers = async () => {
    const { superpowers: spowers } = await getAllSuperpowers();
    setSuperpowers(spowers);
  };
  useEffect(() => {
    fetchSuperpowers();
  }, []);
  const { control } = useFormContext<createSuperheroSchemaType>();
  return (
    <FormField
      control={control}
      name="superpowers"
      render={() => (
        <FormItem>
          <FormLabel>Superpowers</FormLabel>
          {superpowers.map((sp) => (
            <FormField
              key={sp.id}
              control={control}
              name="superpowers"
              render={({ field }) => (
                <FormItem key={sp.id} className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(sp.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, sp.id])
                          : field.onChange(
                              field.value?.filter((value) => value !== sp.id)
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel>{sp.power}</FormLabel>
                </FormItem>
              )}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default SuperpowersMultiselect;
