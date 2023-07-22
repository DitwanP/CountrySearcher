import { useState } from "react";
import { FilterSet } from "../utilities/Types";

import ChevronDown from "../assets/images/chevron-down.svg";

interface FilterInputProps {
  filterState: FilterSet;
  filterStateSetter: React.Dispatch<React.SetStateAction<FilterSet>>;
}

const FilterInput = (props: FilterInputProps) => {
  const { filterState, filterStateSetter } = props;
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
    <div className="relative flex h-24 flex-col gap-1 rounded-xl bg-white">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="no-tap-highlighting flex h-full items-center justify-between 
        p-8 text-[16px] text-very-dark-blueT drop-shadow-md transition-transform
        duration-300 focus-visible:border-2 focus-visible:border-very-dark-blueT
        focus-visible:outline-none md:w-[250px]"
      >
        Filter by Region
        <img
          src={ChevronDown}
          alt="Downward Chevron Icon"
          className={`h-12 w-8 transition-transform duration-200 ${
            isMenuOpen && "rotate-180"
          }`}
        />
      </button>

      <div className="absolute top-[65px] h-[240px] w-[250px] overflow-hidden">
        <div
          className={`absolute top-[-260px] flex w-full flex-col rounded-lg bg-white
          p-8 opacity-0 drop-shadow-lg transition-all duration-[500ms]
          ease-in-out ${isMenuOpen ? "translate-y-[260px] opacity-100" : ""}`}
        >
          {dropdownOptions}
        </div>
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
    <div className="my-3 flex items-center justify-between text-[16px]">
      <label htmlFor={region} className="text-[16px]">
        {formattedRegion}
      </label>
      <input
        type="checkbox"
        id={region}
        checked={filterState.has(region)}
        onChange={handleFilterChange}
        className="h-8 w-8 hover:cursor-pointer"
      />
    </div>
  );
};

export default FilterInput;
