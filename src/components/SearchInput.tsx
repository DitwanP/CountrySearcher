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
    <div className="relative z-0 w-full md:max-w-[480px]">
      <label htmlFor="countrySearchInput">
        <img
          src={theme === "dark" ? MagnifyingGlassWhite : MagnifyingGlass}
          alt="Magnifying Glass Icon"
          className="absolute left-8 top-1/2 z-10 h-8 w-8 -translate-y-1/2 md:h-8 md:w-8"
        />
      </label>
      <input
        type="text"
        id="countrySearchInput"
        onChange={handleInput}
        placeholder="Search for a country..."
        aria-label="Country search text input"
        className="custom-shadow custom-border h-20 w-full rounded-lg bg-light-mode bg-transparent px-[60px]
        text-3xl font-normal tracking-widest text-main-light drop-shadow-md placeholder:text-2xl
        placeholder:text-main-light dark:bg-dark-mode dark:text-main-dark placeholder:dark:text-main-dark"
      />
    </div>
  );
};

export default SearchInput;
