import MagnifyingGlass from "../assets/magnifying-glass.svg";

const SearchInput = () => {
  return (
    <div className="relative">
      <label htmlFor="countrySearchInput">
        <img
          src={MagnifyingGlass}
          alt="Magnifying Glass Icon"
          className="absolute left-12 top-1/2 h-10 w-10 -translate-y-1/2 md:h-20 md:w-20"
        ></img>
      </label>
      <input
        type="text"
        id="countrySearchInput"
        placeholder="Search for a country..."
        className="h-24 w-full max-w-[480px] rounded-lg px-[70px] text-[16px] placeholder:text-dark-blue focus-visible:border-2 focus-visible:border-dark-blue focus-visible:outline-none"
      />
    </div>
  );
};

export default SearchInput;
