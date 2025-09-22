import type { SortSuperheroOptionInterface } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  options: SortSuperheroOptionInterface[];
  currentOption: SortSuperheroOptionInterface;
  onChange: (value: string) => void;
}

const SortBySelect = ({ currentOption, onChange, options }: Props) => {
  return (
    <Select
      defaultValue={currentOption.value}
      onValueChange={(value) => onChange(value)}
    >
      <SelectTrigger className="w-fit">
        Sort: 
        <SelectValue>{currentOption.label}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-amber-50">
        <SelectGroup>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SortBySelect;
