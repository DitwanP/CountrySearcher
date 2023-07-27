import Globe from "../assets/images/globe.svg";
import GlobeWhite from "../assets/images/globe-white.svg";
import { useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = (props: NavbarProps) => {
  const { theme, setTheme } = props;
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
      localStorage.theme = "light";
    }
  });

  return (
    <div className="custom-shadow fixed top-0 z-50 h-[80px] w-full bg-light-mode-bg px-14 drop-shadow-md transition-colors duration-500 ease-out dark:bg-dark-mode-bg">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between">
        <div className="flex items-center justify-center">
          <img
            src={theme === "dark" ? GlobeWhite : Globe}
            alt="Crescent Moon Icon"
            className="h-10 w-10 md:h-12 md:w-12"
          />
        </div>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
};

export default Navbar;
