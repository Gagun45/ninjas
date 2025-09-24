"use client";

interface Props {
  pid: string;
}
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { useDeleteSuperheroByPidMutation } from "@/redux/apis/superheroesApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteSuperheroButton = ({ pid }: Props) => {
  const [deleteSuperhero, { isLoading }] = useDeleteSuperheroByPidMutation();
  const router = useRouter();
  const onDelete = async () => {
    const { data, error } = await deleteSuperhero({ pid });
    if (error) {
      toast.error("Unexpected error");
      return;
    }
    if (data) {
      if (data.success) {
        toast.success("Superhero deleted!");
        router.push("/");
      } else {
        toast.error(data.message);
      }
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-24">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-amber-50">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            superhero.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!justify-between">
          <AlertDialogCancel className="bg-amber-50 hover:bg-amber-50">
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={isLoading}
            className={buttonVariants({ variant: "destructive" })}
            onClick={onDelete}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSuperheroButton;
