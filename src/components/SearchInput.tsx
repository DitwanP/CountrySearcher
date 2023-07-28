import MagnifyingGlass from "../assets/images/magnifying-glass.svg";
import MagnifyingGlassWhite from "../assets/images/magnifying-glass-white.svg";

interface SearchInputProps {
  theme: string;
  setUserSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ theme, setUserSearchInput }: SearchInputProps) => {
  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserSearchInput(e.target.value);
  };

  return (
    <div className="custom-shadow group relative h-24 w-full overflow-hidden rounded-lg border-0 border-black dark:border-white md:max-w-[480px]">
      <div
        className={`absolute left-[0px] h-full w-full group-hover:bg-right ${
          theme === "dark"
            ? "custom-button-gradient-dark"
            : "custom-button-gradient-light"
        }`}
      ></div>
      <label htmlFor="countrySearchInput">
        <img
          src={theme === "dark" ? MagnifyingGlassWhite : MagnifyingGlass}
          alt="Magnifying Glass Icon"
          className="absolute left-8 top-1/2 z-10 h-7 w-7 -translate-y-1/2"
        />
      </label>
      <input
        type="text"
        id="countrySearchInput"
        onChange={handleInput}
        placeholder="SEARCH FOR A COUNTRY..."
        aria-label="Country search text input"
        className="dark:bg-dark-mode-bg-400 absolute h-full w-full bg-white bg-opacity-5 px-[55px] text-3xl font-normal
          tracking-wide text-black placeholder:text-[14px] placeholder:text-black 
          dark:bg-opacity-5 dark:text-white placeholder:dark:text-white"
      />
    </div>
  );
};

export default SearchInput;
