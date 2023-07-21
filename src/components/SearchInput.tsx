import MagnifyingGlass from "../assets/images/magnifying-glass.svg";

interface SearchInputProps {
  setUserSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = (props: SearchInputProps) => {
  const { setUserSearchInput } = props;

  const handleInput: React.ChangeEventHandler<HTMLInputElement> | undefined = (
    e
  ) => {
    setUserSearchInput(e.target.value);
  };

  return (
    <div className="relative z-0 w-full md:max-w-[480px]">
      <label htmlFor="countrySearchInput">
        <img
          src={MagnifyingGlass}
          alt="Magnifying Glass Icon"
          className="absolute left-8 top-1/2 z-10 h-10 w-10 -translate-y-1/2 md:h-14 md:w-14"
        ></img>
      </label>
      <input
        type="text"
        id="countrySearchInput"
        onChange={handleInput}
        placeholder="Search for a country..."
        className="h-24 w-full rounded-lg px-[60px] text-[16px] 
        text-very-dark-blueT drop-shadow-md placeholder:text-[16px] 
        placeholder:text-very-dark-blueT focus-visible:border-2 
        focus-visible:border-very-dark-blueT focus-visible:outline-none"
      />
    </div>
  );
};

export default SearchInput;
