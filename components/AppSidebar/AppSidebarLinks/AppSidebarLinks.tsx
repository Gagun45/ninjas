import { SidebarGroup } from "@/components/ui/sidebar";
import type { LinkInterface } from "@/lib/types";
import Link from "next/link";

const LINKS: LinkInterface[] = [{ href: "create", label: "Create" }];

const AppSidebarLinks = () => {
  return (
    <SidebarGroup>
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
