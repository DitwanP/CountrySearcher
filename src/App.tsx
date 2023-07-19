import { useState } from "react";
import { RegionFilterInterface } from "./utilities/Interfaces";
import { Country } from "./utilities/Interfaces";

import CountryData from "./assets/data/country-data.json";
import Navbar from "./components/Navbar";
import SearchInput from "./components/SearchInput";
import FilterInput from "./components/FilterInput";

const defaultFilters: RegionFilterInterface = {
  africa: false,
  america: false,
  asia: false,
  europe: false,
  oceania: false,
};

const countries: Country[] = CountryData;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [filters, setFilters] = useState(defaultFilters);
  const [countryList, setCountryList] = useState(countries);

  console.log(countries);
  return (
    <div className="h-screen overflow-hidden bg-slate-400">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="flex h-full w-full flex-col gap-14 overflow-y-auto px-8 pt-14">
        <div className="flex w-full flex-col justify-between gap-14 md:flex-row">
          <SearchInput />
          <FilterInput filterState={filters} filterStateSetter={setFilters} />
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}

export default App;
