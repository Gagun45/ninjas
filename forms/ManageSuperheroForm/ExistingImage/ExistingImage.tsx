import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";

interface Props {
  url: string;
  onDelete: (url: string) => void;
}

const ExistingImage = ({ url, onDelete }: Props) => {
  return (
    <div className="size-36 relative group">
      <Image src={url} fill alt="Superhero image" />
      <Button
        onClick={() => onDelete(url)}
        type="button"
        variant={"destructive"}
        className="absolute top-0 right-0"
      >
        <Trash2Icon />
      </Button>
    </div>
  );
};
export default ExistingImage;
