import { useEffect, useState } from "react";
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
      <div className="bg-slate-300">
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div
          className="mx-auto mt-[95px] flex h-full min-h-[calc(100vh-95px)] w-full max-w-[400px] 
          flex-col gap-14 px-8 py-20 sm:max-w-screen-2xl md:gap-[60px]
          md:px-10 md:pt-24 2xl:px-0"
        >
          <div className="flex w-full flex-col justify-between gap-14 sm:flex-row">
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
