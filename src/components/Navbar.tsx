import CrescentMoon from "../assets/crescent-moon.svg";
import Sun from "../assets/sun.svg";
import Globe from "../assets/globe.svg";

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const Navbar = (props: NavbarProps) => {
  const { isDarkMode, setIsDarkMode } = props;
  return (
    <div className="flex h-[95px] items-center justify-between bg-white px-8">
      <div className="flex items-center justify-center">
        <img
          src={Globe}
          alt="Crescent Moon Icon"
          className="h-10 w-10 md:h-20 md:w-20"
        />
      </div>
      <div className="flex h-full items-center gap-1">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex h-16 w-16 items-center justify-center focus-visible:border-2 focus-visible:border-very-dark-blueT focus-visible:outline-none"
        >
          {isDarkMode && (
            <img
              src={Sun}
              alt="Sun Icon"
              className="h-10 w-10 md:h-20 md:w-20"
            />
          )}
          {!isDarkMode && (
            <img
              src={CrescentMoon}
              alt="Crescent Moon Icon"
              className="h-8 w-8 md:h-20 md:w-20"
            />
          )}
        </button>
        <p className="text-[16px] font-semibold text-very-dark-blueT">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
