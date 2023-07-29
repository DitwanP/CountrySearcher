import CrescentMoonWhite from "../assets/images/crescent-moon-white.svg";
import Sun from "../assets/images/sun.svg";
import { useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
// @ts-ignore
import tailwindConfig from "../../tailwind.config.js";

interface ThemeToggleProps {
  theme: string;
  setTheme: (value: string) => void;
}

const ThemeToggle = ({ theme, setTheme }: ThemeToggleProps) => {
  const fullConfig = resolveConfig(tailwindConfig);
  const darkModeBg = fullConfig.theme.colors["dark-mode-bg"];
  const lightModeBg = fullConfig.theme.colors["light-mode-bg"];

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
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.setProperty("--document-bg", darkModeBg);
      document.documentElement.style.setProperty("--cell-color", lightModeBg);
      document.documentElement.style.setProperty("--scrollbar-bg", darkModeBg);
      document.documentElement.style.setProperty("--scrollbar", lightModeBg);
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.setProperty("--document-bg", lightModeBg);
      document.documentElement.style.setProperty("--cell-color", darkModeBg);
      document.documentElement.style.setProperty("--scrollbar-bg", lightModeBg);
      document.documentElement.style.setProperty("--scrollbar", darkModeBg);
    }
  }, [theme]);

  return (
    <button
      onClick={handleThemeToggle}
      className="no-tap-highlighting flex h-16 w-16 items-center justify-center 
            gap-3 text-primary-light focus:border-none"
    >
      {theme === "light" && (
        <img src={Sun} alt="Sun Icon" className="h-10 w-10 md:h-12 md:w-12" />
      )}
      {theme === "dark" && (
        <img
          src={CrescentMoonWhite}
          alt="Crescent Moon Icon"
          className="h-8 w-8 md:h-10 md:w-10"
        />
      )}
    </button>
  );
};

export default ThemeToggle;
