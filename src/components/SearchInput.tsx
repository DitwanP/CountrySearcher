import MagnifyingGlass from "../assets/images/magnifying-glass.svg";
import MagnifyingGlassWhite from "../assets/images/magnifying-glass-white.svg";

interface SearchInputProps {
  isDarkMode: boolean;
  setUserSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ isDarkMode, setUserSearchInput }: SearchInputProps) => {
  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserSearchInput(e.target.value);
  };

  return (
    <div className="relative z-0 w-full md:max-w-[480px]">
      <label htmlFor="countrySearchInput">
        <img
          src={isDarkMode ? MagnifyingGlassWhite : MagnifyingGlass}
          alt="Magnifying Glass Icon"
          className="absolute left-8 top-1/2 z-10 h-8 w-8 -translate-y-1/2 md:h-8 md:w-8"
        />
      </label>
      <input
        type="text"
        id="countrySearchInput"
        onChange={handleInput}
        placeholder="SEARCH FOR A COUNTRY..."
        className="glass h-20 w-full rounded-md border-[1px] border-white
        px-[60px] text-2xl font-extralight tracking-widest text-white
        drop-shadow-md placeholder:text-xl 
        placeholder:text-white focus-visible:outline-none"
      />
    </div>
  );
};

export default SearchInput;
