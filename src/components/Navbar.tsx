import CrescentMoon from "../assets/images/crescent-moon.svg";
import Sun from "../assets/images/sun-white.svg";
import Globe from "../assets/images/globe.svg";
import GlobeWhite from "../assets/images/globe-white.svg";

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const Navbar = (props: NavbarProps) => {
  const { isDarkMode, setIsDarkMode } = props;
  return (
    <div className="glass fixed top-0 z-50 h-[80px] w-full px-14 shadow-md">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between">
        <div className="flex items-center justify-center">
          <img
            src={isDarkMode ? GlobeWhite : Globe}
            alt="Crescent Moon Icon"
            className="h-10 w-10 md:h-12 md:w-12"
          />
        </div>
        <div className="flex h-full items-center transition-all">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="no-tap-highlighting flex h-16 items-center justify-center 
            gap-3 text-white focus-visible:border-2
            focus-visible:border-very-dark-blueT focus-visible:outline-none"
          >
            {isDarkMode && (
              <img
                src={Sun}
                alt="Sun Icon"
                className="fade-in h-10 w-10 md:h-12 md:w-12"
              />
            )}
            {!isDarkMode && (
              <img
                src={CrescentMoon}
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
