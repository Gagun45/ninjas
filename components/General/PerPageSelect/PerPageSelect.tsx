import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  perPage: number;
  onChange: (value: number) => void;
}

const PER_PAGE_VARIANTS = ["2", "5", "10"];

const PerPageSelect = ({ onChange, perPage }: Props) => {
  return (
    <Select
      defaultValue={perPage.toString()}
      onValueChange={(value) => onChange(parseInt(value))}
    >
      <SelectTrigger className="w-[180px]">
        <Label>Show per page: </Label>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-amber-50">
        <SelectGroup>
          {PER_PAGE_VARIANTS.map((value) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default PerPageSelect;
