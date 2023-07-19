import { useState } from "react";
import { RegionFilterInterface } from "../utilities/Interfaces";

import ChevronDown from "../assets/chevron-down.svg";

interface FilterInputProps {
  filterState: RegionFilterInterface;
  filterStateSetter: React.Dispatch<
    React.SetStateAction<RegionFilterInterface>
  >;
}

const FilterInput = (props: FilterInputProps) => {
  const { filterState, filterStateSetter } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const regions = ["africa", "america", "asia", "europe", "oceania"];

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
    <div className="flex flex-col gap-1">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex h-24 w-[250px] items-center justify-between rounded-lg bg-white p-8 text-[16px] text-very-dark-blueT focus-visible:border-2 focus-visible:border-very-dark-blueT focus-visible:outline-none"
      >
        Filter by Region
        <img
          src={ChevronDown}
          alt="Downward Chevron Icon"
          className="h-12 w-8 md:h-20 md:w-20"
        />
      </button>
      {isMenuOpen && (
        <div className="ites flex w-[250px] flex-col rounded-lg bg-white p-8">
          {dropdownOptions}
        </div>
      )}
    </div>
  );
};

interface OptionProps {
  region: string;
  filterState: RegionFilterInterface;
  filterStateSetter: React.Dispatch<
    React.SetStateAction<RegionFilterInterface>
  >;
}

const Option = (props: OptionProps) => {
  const { region, filterState, filterStateSetter } = props;
  const formattedRegion = region[0].toUpperCase() + region.slice(1);

  return (
    <div className="my-3 flex items-center justify-between text-[16px]">
      <label htmlFor={region} className="text-[16px]">
        {formattedRegion}
      </label>
      <input
        type="checkbox"
        id={region}
        checked={filterState[region]}
        onChange={() =>
          filterStateSetter({
            ...filterState,
            [region]: !filterState[region],
          })
        }
        className="h-8 w-8 hover:cursor-pointer"
      />
    </div>
  );
};

export default FilterInput;
