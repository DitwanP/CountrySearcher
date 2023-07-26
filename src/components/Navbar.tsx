import CrescentMoonWhite from "../assets/images/crescent-moon-white.svg";
import Sun from "../assets/images/sun.svg";
import Globe from "../assets/images/globe.svg";
import GlobeWhite from "../assets/images/globe-white.svg";
import { useEffect } from "react";

interface NavbarProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = (props: NavbarProps) => {
  const { theme, setTheme } = props;

  const handleThemeToggle = () => {
    if (theme === "dark") {
      localStorage.theme = "light";
      setTheme("light");
    } else {
      localStorage.theme = "dark";
      setTheme("dark");
    }
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.theme = "dark";
    }
  });

  return (
    <div className="custom-shadow fixed top-0 z-50 h-[80px] w-full bg-light-mode px-14 transition-colors duration-300 ease-out dark:bg-dark-mode">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between">
        <div className="flex items-center justify-center">
          <img
            src={theme === "dark" ? GlobeWhite : Globe}
            alt="Crescent Moon Icon"
            className="h-10 w-10 md:h-12 md:w-12"
          />
        </div>
        <div className="flex h-full items-center transition-all">
          <button
            onClick={handleThemeToggle}
            className="no-tap-highlighting flex h-16 w-16 items-center justify-center 
            gap-3 text-main-light focus:border-none"
          >
            {theme === "light" && (
              <img
                src={Sun}
                alt="Sun Icon"
                className="fade-in h-10 w-10 md:h-12 md:w-12"
              />
            )}
            {theme === "dark" && (
              <img
                src={CrescentMoonWhite}
                alt="Crescent Moon Icon"
                className="fade-in h-8 w-8 md:h-10 md:w-10"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
