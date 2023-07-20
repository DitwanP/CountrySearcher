import { useState } from "react";
import { FilterSet } from "./utilities/Types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "./components/Navbar";
import SearchInput from "./components/SearchInput";
import FilterInput from "./components/FilterInput";
import CountryList from "./components/CountryList";

const defaultFilterState: FilterSet = new Set();

const queryClient = new QueryClient();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [filters, setFilters] = useState(defaultFilterState);
  const [userSearchInput, setUserSearchInput] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-[calc(100vh-95px)] bg-slate-300">
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className="z-0 flex h-full min-h-[calc(100vh-95px)] w-full flex-col gap-14 overflow-y-auto px-8 py-14">
          <div className="z-10 flex w-full flex-col justify-between gap-14 md:flex-row">
            <SearchInput setUserSearchInput={setUserSearchInput} />
            <FilterInput filterState={filters} filterStateSetter={setFilters} />
          </div>
          <CountryList userSearchInput={userSearchInput} filters={filters} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
