import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  return (
    <header className="w-full flex items-center bg-main h-36">
      <SidebarTrigger />
      <span>Super Heroes</span>
    </header>
  );
};
export default Header;
