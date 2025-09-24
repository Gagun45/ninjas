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
  onChange: (value: string) => void;
  options: string[];
}

const PerPageSelect = ({ onChange, perPage, options }: Props) => {
  return (
    <Select
      defaultValue={perPage.toString()}
      onValueChange={(value) => onChange(value)}
    >
      <SelectTrigger className="w-fit">
        Show per page:
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-add">
        <SelectGroup>
          {options.map((value) => (
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
