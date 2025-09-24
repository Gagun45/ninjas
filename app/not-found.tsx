import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <main>
      <h1>404 Page not found</h1>
      <Link href={"/"} className={buttonVariants({ variant: "default" })}>
        Homepage
      </Link>
    </main>
  );
};
export default NotFound;
