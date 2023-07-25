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
        region={region}
        key={index}
        filterState={filterState}
        filterStateSetter={filterStateSetter}
      />
    );
  });

  return (
    <div className="relative z-10 flex h-20 min-w-[200px] flex-col gap-1 text-white">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="no-tap-highlighting glass flex h-full items-center justify-between
          rounded-md border-[1px] border-white px-8 text-xl font-extralight 
          tracking-widest text-white drop-shadow-md transition-transform duration-300 focus-visible:outline-none 
          md:max-w-[250px]"
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
  filterState: FilterSet;
  filterStateSetter: React.Dispatch<React.SetStateAction<FilterSet>>;
}

const Option = (props: OptionProps) => {
  const { region, filterState, filterStateSetter } = props;
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
    <button
      onClick={handleFilterChange}
      className="my-3 flex items-center justify-between text-[16px]"
    >
      <label htmlFor={region} className="text-[16px] tracking-[0.2em]">
        {formattedRegion.toUpperCase()}
      </label>
      <input
        type="checkbox"
        id={region}
        checked={filterState.has(region)}
        onChange={handleFilterChange}
        className="h-8 w-8 appearance-none rounded-md border-[1px] border-white checked:bg-white
        hover:cursor-pointer"
      />
    </button>
  );
};

export default FilterInput;
