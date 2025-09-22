import { SidebarGroup } from "@/components/ui/sidebar";
import type { LinkInterface } from "@/lib/types";
import Link from "next/link";

const LINKS: LinkInterface[] = [
  { href: "/superpower/create", label: "Create a superpower" },
  { href: "/superhero/create", label: "Create a superhero" },
];

const AppSidebarLinks = () => {
  return (
    <SidebarGroup className="gap-4">
      {LINKS.map((link) => (
        <Link
          className="bg-main rounded-md p-1 font-semibold"
          href={link.href}
          key={link.href}
        >
          {link.label}
        </Link>
      ))}
    </SidebarGroup>
  );
};
export default AppSidebarLinks;
