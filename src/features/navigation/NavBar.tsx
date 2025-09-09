import useMediaQuery from "@/hooks/useMediaQuery";
import MobileMenu from "@/features/navigation/MobileMenu";
import DesktopMenu from "@/features/navigation/DesktopMenu";

const NavBar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return <div>{isMobile ? <MobileMenu /> : <DesktopMenu />}</div>;
};

export default NavBar;
