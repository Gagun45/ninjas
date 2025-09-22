import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import AppSidebarLinks from "./AppSidebarLinks/AppSidebarLinks";
import Link from "next/link";

const AppSidebar = () => {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="h-36 bg-main flex items-center justify-center">
        <Link href={"/"} className="font-bold">LOGO</Link>
      </SidebarHeader>
      <SidebarContent className="pt-4 bg-amber-50">
        <AppSidebarLinks />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
