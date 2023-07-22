import CrescentMoon from "../assets/images/crescent-moon.svg";
import Sun from "../assets/images/sun.svg";
import Globe from "../assets/images/globe.svg";

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const Navbar = (props: NavbarProps) => {
  const { isDarkMode, setIsDarkMode } = props;
  return (
    <div className="h-[95px] bg-white px-8 shadow-md">
      <div className="mx-auto flex h-[95px] max-w-screen-2xl items-center justify-between">
        <div className="flex items-center justify-center">
          <img
            src={Globe}
            alt="Crescent Moon Icon"
            className="h-10 w-10 md:h-14 md:w-14"
          />
        </div>
        <div className="flex h-full items-center transition-all">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="no-tap-highlighting flex h-16 items-center justify-center 
            gap-3 focus-visible:border-2 focus-visible:border-very-dark-blueT
            focus-visible:outline-none"
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

            {isDarkMode && (
              <span className="fade-in text-[16px] font-normal text-very-dark-blueT">
                Light Mode
              </span>
            )}
            {!isDarkMode && (
              <span className="fade-in text-[16px] font-normal text-very-dark-blueT">
                Dark Mode
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
