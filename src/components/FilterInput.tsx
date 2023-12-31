import { useState } from "react";
import { FilterSet } from "../utilities/Types";

import ChevronDown from "../assets/images/chevron-down.svg";
import ChevronDownWhite from "../assets/images/chevron-down-white.svg";

interface FilterInputProps {
  theme: string;
  filterState: FilterSet;
  filterStateSetter: React.Dispatch<React.SetStateAction<FilterSet>>;
}

const regions = ["africa", "americas", "asia", "europe", "oceania"];

const FilterInput = ({
  theme,
  filterState,
  filterStateSetter,
}: FilterInputProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownOptions = regions.map((region, index) => {
    return (
      <Option
        key={index}
        region={region}
        isMenuOpen={isMenuOpen}
        filterState={filterState}
        filterStateSetter={filterStateSetter}
      />
    );
  });

  return (
    <div className="custom-shadow group relative flex h-24 min-w-[250px] flex-col gap-1 rounded-lg text-black dark:text-white">
      <div className="relative left-0 top-0 h-full w-full overflow-hidden rounded-lg border-0 border-black dark:border-white">
        <div className="absolute left-[0px] h-full w-full bg-light-mode-bg group-hover:bg-right dark:bg-dark-mode-bg"></div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Region filter dropdown menu toggle"
          className="no-tap-highlighting absolute z-40 flex h-full w-full items-center justify-between 
          gap-14 overflow-hidden bg-white bg-opacity-5 px-8 text-[14px] tracking-widest 
          active:scale-[.95] dark:bg-black dark:bg-opacity-5"
        >
          FILTER BY REGION
          <img
            src={theme === "dark" ? ChevronDownWhite : ChevronDown}
            alt="Downward Chevron Icon"
            className={`h-6 w-6 touch-none transition-transform duration-300 ease-out ${
              isMenuOpen && "rotate-180"
            }`}
          />
        </button>
      </div>
      <div
        className={`custom-shadow absolute top-[70px] z-30 flex h-0 w-full flex-col justify-between overflow-hidden rounded-lg 
        bg-light-mode-bg px-8 drop-shadow-2xl transition-all duration-[400ms] ease-out dark:bg-dark-mode-bg ${
          isMenuOpen && "h-[220px] py-8"
        }`}
      >
        {dropdownOptions}
      </div>
    </div>
  );
};

interface OptionProps {
  region: string;
  isMenuOpen: boolean;
  filterState: FilterSet;
  filterStateSetter: React.Dispatch<React.SetStateAction<FilterSet>>;
}

const Option = (props: OptionProps) => {
  const { region, isMenuOpen, filterState, filterStateSetter } = props;
  // @ts-ignore
  const formattedRegion = region[0].toUpperCase() + region.slice(1);

  const handleFilterChange = () => {
    const newState = new Set(filterState);

    if (newState.has(region)) {
      newState.delete(region);
    } else {
      newState.add(region);
    }

    filterStateSetter(newState);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      handleFilterChange();
    }
  };

  return (
    <div
      className={`flex justify-between text-black transition-opacity duration-75 ease-linear dark:text-white ${
        isMenuOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <label
        htmlFor={region}
        className="text-[14px] tracking-widest hover:cursor-pointer"
      >
        {formattedRegion.toUpperCase()}
      </label>
      <input
        type="checkbox"
        id={region}
        tabIndex={isMenuOpen ? 0 : -1}
        aria-label={`Region filter option for ${formattedRegion}`}
        onChange={handleFilterChange}
        onKeyDown={handleKeyDown}
        checked={filterState.has(region)}
        className="h-6 w-6 appearance-none rounded-sm border-[1px] border-primary-light checked:bg-primary-light hover:cursor-pointer dark:border-primary-dark dark:checked:bg-primary-dark"
      />
    </div>
  );
};

export default FilterInput;
