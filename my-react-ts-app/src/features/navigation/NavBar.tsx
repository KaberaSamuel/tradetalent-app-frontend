import useMediaQuery from "../../hooks/useMediaQuery";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const NavBar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return <div>{isMobile ? <MobileMenu /> : <DesktopMenu />}</div>;
};

export default NavBar;
