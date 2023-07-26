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
    <div className="relative z-10 flex h-20 min-w-[200px] flex-col gap-1 text-main-light">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Region filter dropdown menu toggle"
        className="no-tap-highlighting custom-border custom-shadow flex h-full items-center justify-between gap-14
        rounded-lg bg-light-mode px-8 text-2xl font-normal tracking-widest text-main-light transition-transform
      duration-300 dark:bg-dark-mode dark:text-main-dark md:max-w-[250px]"
      >
        Filter by region
        <img
          src={theme === "dark" ? ChevronDownWhite : ChevronDown}
          alt="Downward Chevron Icon"
          className={`h-10 w-6 touch-none transition-transform duration-300 ${
            isMenuOpen && "rotate-180"
          }`}
        />
      </button>
      <div
        className={`custom-shadow absolute top-[65px] flex h-0 w-full transform-gpu flex-col justify-between overflow-hidden rounded-lg bg-light-mode
            px-8 text-main-light drop-shadow-2xl transition-all duration-300 ease-out dark:bg-dark-mode
            dark:text-main-dark ${isMenuOpen && "h-[250px] py-8"}`}
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
    <div className="flex justify-between transition-all duration-300">
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
        className="h-8 w-8 appearance-none rounded-sm border-[1px] border-main-light checked:bg-main-light hover:cursor-pointer dark:border-main-dark dark:checked:bg-main-dark"
      />
    </div>
  );
};

export default FilterInput;
