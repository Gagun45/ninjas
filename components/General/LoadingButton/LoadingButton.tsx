import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";

interface Props {
  className?: string;
}

const LoadingButton = ({ className }: Props) => {
  return (
    <Button className={className} type="button">
      <BarLoader/>
    </Button>
  );
};
export default LoadingButton;
