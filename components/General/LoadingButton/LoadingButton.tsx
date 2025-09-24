import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";

interface Props {
  className?: string;
}

const LoadingButton = ({ className }: Props) => {
  return (
    <Button className={`${className} text-add`} type="button">
      <BarLoader color="currentColor" />
    </Button>
  );
};
export default LoadingButton;
