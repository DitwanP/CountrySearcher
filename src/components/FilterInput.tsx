import { useState } from "react";
import { FilterSet } from "../utilities/Types";

import ChevronDown from "../assets/images/chevron-down.svg";
import ChevronDownWhite from "../assets/images/chevron-down-white.svg";

interface FilterInputProps {
  isDarkMode: boolean;
  filterState: FilterSet;
  filterStateSetter: React.Dispatch<React.SetStateAction<FilterSet>>;
}

const FilterInput = ({
  isDarkMode,
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
    <div className="relative z-10 flex h-20 min-w-[200px] flex-col gap-1 text-white">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Region filter dropdown menu toggle"
        className="no-tap-highlighting glass flex h-full items-center justify-between gap-14
          rounded-md border-[1px] border-white px-8 text-2xl font-light tracking-widest
        text-white drop-shadow-md transition-transform duration-300 md:max-w-[250px]"
      >
        FILTER BY REGION
        <img
          src={isDarkMode ? ChevronDownWhite : ChevronDown}
          alt="Downward Chevron Icon"
          className={`pointer-events-none h-10 w-6 touch-none transition-transform duration-300 ${
            isMenuOpen && "rotate-180"
          }`}
        />
      </button>
      <div
        className={`glass absolute top-[65px] flex h-0 w-full transform-gpu flex-col
            justify-between overflow-hidden rounded-md px-8 drop-shadow-2xl transition-all duration-[400ms]
            ease-in-out
            ${
              isMenuOpen &&
              "h-[250px] border-[1px] border-white py-8 opacity-100"
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

  return (
    <div className="flex justify-between">
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
        checked={filterState.has(region)}
        className="h-8 w-8 appearance-none rounded-md border-[1px] border-white checked:bg-white
        hover:cursor-pointer"
      />
    </div>
  );
};

export default FilterInput;
