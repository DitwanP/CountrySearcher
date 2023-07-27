import { useState } from "react";
import { FilterSet } from "../utilities/Types";

import ChevronDown from "../assets/images/chevron-down.svg";
import ChevronDownWhite from "../assets/images/chevron-down-white.svg";

interface FilterInputProps {
  theme: string;
  filterState: FilterSet;
  filterStateSetter: React.Dispatch<React.SetStateAction<FilterSet>>;
}

const FilterInput = ({
  theme,
  filterState,
  filterStateSetter,
}: FilterInputProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const regions = ["africa", "americas", "asia", "europe", "oceania"];

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
      <div className="relative left-0 top-0 h-full w-full overflow-hidden rounded-lg border-2 border-black dark:border-white">
        <div
          className={`absolute left-[0px] h-full w-full group-hover:bg-right ${
            theme === "dark"
              ? "custom-button-gradient-dark"
              : "custom-button-gradient-light"
          }`}
        ></div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Region filter dropdown menu toggle"
          className="no-tap-highlighting absolute flex h-full w-full items-center justify-between gap-14 overflow-hidden
            bg-white bg-opacity-5 px-8 text-2xl font-normal tracking-widest transition-all 
            duration-100 ease-in dark:bg-black dark:bg-opacity-5"
        >
          Filter by region
          <img
            src={theme === "dark" ? ChevronDownWhite : ChevronDown}
            alt="Downward Chevron Icon"
            className={`h-8 w-8 touch-none transition-transform duration-150 ${
              isMenuOpen && "rotate-180"
            }`}
          />
        </button>
      </div>
      <div
        className={`custom-shadow bg-light-mode-bg-200 dark:bg-dark-mode-bg-400 absolute top-[65px] z-30 flex h-0 w-full transform-gpu flex-col justify-between 
        overflow-hidden rounded-lg px-8 text-black drop-shadow-2xl transition-all duration-150 ease-in-out
        dark:text-primary-dark ${isMenuOpen && "h-[250px] py-8"}`}
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
    <div className="flex justify-between transition-all duration-150">
      <label
        htmlFor={region}
        className="text-[16px] font-light tracking-widest"
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
        className="h-8 w-8 appearance-none rounded-sm border-[1px] border-primary-light checked:bg-primary-light hover:cursor-pointer dark:border-primary-dark dark:checked:bg-primary-dark"
      />
    </div>
  );
};

export default FilterInput;
