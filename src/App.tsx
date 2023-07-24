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
      <div className="custom-bg-gradient">
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className="z-30 mb-14 flex w-full px-14 pb-2 pt-[115px] sm:max-w-screen-2xl md:gap-[60px] md:px-14 2xl:px-0">
          <div className="flex w-full max-w-[400px] flex-col justify-between gap-8 sm:flex-row md:max-w-none">
            <SearchInput
              setUserSearchInput={setUserSearchInput}
              isDarkMode={isDarkMode}
            />
            <FilterInput
              filterState={filters}
              filterStateSetter={setFilters}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
        <div className="flex h-full min-h-[100dvh] w-full overflow-hidden px-14">
          <CountryList
            userSearchInput={userSearchInput}
            filters={filters}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
