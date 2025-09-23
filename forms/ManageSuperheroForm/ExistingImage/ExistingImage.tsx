import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface Props {
  url: string;
  onDelete: (url: string) => void;
}

const ExistingImage = ({ url, onDelete }: Props) => {
  return (
    <div className="size-36 sm:size-48 relative group">
      <Zoom>
        <Image
          src={url}
          fill
          alt="Superhero image"
        />
      </Zoom>
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
