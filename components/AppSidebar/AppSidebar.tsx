"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import AppSidebarLinks from "./AppSidebarLinks/AppSidebarLinks";
import Link from "next/link";
import Image from "next/image";

const AppSidebar = () => {
  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="h-36 bg-main flex items-center justify-center">
        <Link
          onClick={() => setOpenMobile(false)}
          href={"/"}
          className="font-bold h-full aspect-square rounded-full bg-red-400 relative"
        >
          <Image src={'/superhero.png'} fill alt="Logo" className="object-contain"/>
        </Link>
      </SidebarHeader>
      <SidebarContent className="pt-4 bg-add">
        <AppSidebarLinks />
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
