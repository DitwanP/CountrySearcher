import MagnifyingGlass from "../assets/images/magnifying-glass.svg";

interface SearchInputProps {
  setUserSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = (props: SearchInputProps) => {
  const { setUserSearchInput } = props;

  return (
    <div className="relative z-0">
      <label htmlFor="countrySearchInput">
        <img
          src={MagnifyingGlass}
          alt="Magnifying Glass Icon"
          className="absolute left-12 top-1/2 z-10 h-10 w-10 -translate-y-1/2 md:h-20 md:w-20"
        ></img>
      </label>
      <input
        type="text"
        id="countrySearchInput"
        onChange={(e) => setUserSearchInput(e.target.value.toLowerCase())}
        placeholder="Search for a country..."
        className="h-24 w-full max-w-[480px] rounded-lg px-[70px] text-[16px] text-very-dark-blueT drop-shadow-md placeholder:text-[16px] placeholder:text-very-dark-blueT focus-visible:border-2 focus-visible:border-very-dark-blueT focus-visible:outline-none"
      />
    </div>
  );
};

export default SearchInput;
