'use client'

import { SidebarGroup, useSidebar } from "@/components/ui/sidebar";
import type { LinkInterface } from "@/lib/types";
import Link from "next/link";

const LINKS: LinkInterface[] = [
  { href: "/superhero/create", label: "Create a superhero" },
  { href: "/superpower/create", label: "Create a superpower" },
];

const AppSidebarLinks = () => {
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarGroup className="gap-4">
      {LINKS.map((link) => (
        <Link
          className="bg-main rounded-md p-1 font-semibold"
          href={link.href}
          key={link.href}
          onClick={() => setOpenMobile(false)}
        >
          {link.label}
        </Link>
      ))}
    </SidebarGroup>
  );
};
export default AppSidebarLinks;
