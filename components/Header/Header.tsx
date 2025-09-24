import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  return (
    <header className="w-full  px-6 flex items-center bg-main h-36 shrink-0">
      <SidebarTrigger />
    </header>
  );
};
export default Header;
