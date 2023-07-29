import Globe from "../assets/images/globe.svg";
import GlobeWhite from "../assets/images/globe-white.svg";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = (props: NavbarProps) => {
  const { theme, setTheme } = props;

  return (
    <div className="custom-shadow fixed top-0 z-50 h-[80px] w-full bg-light-mode-bg px-14 drop-shadow-md dark:bg-dark-mode-bg">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between">
        <img
          src={theme === "dark" ? GlobeWhite : Globe}
          alt="Crescent Moon Icon"
          className="fade-in-icon h-10 w-10 md:h-12 md:w-12"
        />
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
};

export default Navbar;
