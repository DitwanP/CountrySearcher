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
  const lightModeBg = fullConfig.theme.colors["dark-mode-bg"];
  const darkModeBg = fullConfig.theme.colors["light-mode-bg"];

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
    console.log("Changes css variables");
    if (theme === "dark") {
      document.documentElement.style.setProperty("--cell-color", darkModeBg);
      document.documentElement.style.setProperty(
        "--scrollbar-track-color",

        lightModeBg
      );
      document.documentElement.style.setProperty(
        "--scrollbar-color",
        darkModeBg
      );
      document.documentElement.style.setProperty(
        "--focus-border-color",
        darkModeBg
      );
    } else {
      document.documentElement.style.setProperty("--cell-color", lightModeBg);
      document.documentElement.style.setProperty(
        "--scrollbar-track-color",
        darkModeBg
      );
      document.documentElement.style.setProperty(
        "--scrollbar-color",

        lightModeBg
      );
      document.documentElement.style.setProperty(
        "--focus-border-color",
        lightModeBg
      );
    }
  }, [theme]);
  return (
    <button
      onClick={handleThemeToggle}
      className="no-tap-highlighting flex h-16 w-16 items-center justify-center 
            gap-3 text-primary-light focus:border-none"
    >
      {theme === "light" && (
        <img
          src={Sun}
          alt="Sun Icon"
          className="fade-in-icon h-10 w-10 md:h-12 md:w-12"
        />
      )}
      {theme === "dark" && (
        <img
          src={CrescentMoonWhite}
          alt="Crescent Moon Icon"
          className="fade-in-icon h-8 w-8 md:h-10 md:w-10"
        />
      )}
    </button>
  );
};

export default ThemeToggle;
