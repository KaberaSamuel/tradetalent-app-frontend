import DesktopMenu from "@/features/navigation/DesktopMenu";
import MobileMenu from "@/features/navigation/MobileMenu";
import useMediaQuery from "@/hooks/useMediaQuery";

const NavBar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return <div>{isMobile ? <MobileMenu /> : <DesktopMenu />}</div>;
};

export default NavBar;
