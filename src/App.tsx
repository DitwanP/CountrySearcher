import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchInput from "./components/SearchInput";
import FilterInput from "./components/FilterInput";
import { RegionFilterInterface } from "./utilities/Interfaces";

const defaultFilters: RegionFilterInterface = {
  africa: false,
  america: false,
  asia: false,
  europe: false,
  oceania: false,
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [filters, setFilters] = useState(defaultFilters);

  return (
    <div className="h-screen bg-slate-400">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="mt-14 flex w-full flex-col gap-14 px-8">
        <div className="flex w-full flex-col justify-between gap-14 md:flex-row">
          <SearchInput />
          <FilterInput filterState={filters} filterStateSetter={setFilters} />
        </div>
      </div>
    </div>
  );
}

export default App;
