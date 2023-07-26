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
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [filters, setFilters] = useState(defaultFilterState);
  const [userSearchInput, setUserSearchInput] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app min-h-screen overflow-hidden bg-light-mode transition-colors duration-300 ease-out dark:bg-dark-mode">
        <Navbar theme={theme} setTheme={setTheme} />
        <div className="px-14">
          <div className="z-30 mx-auto mb-20 flex w-full pt-[115px] sm:max-w-screen-2xl md:gap-[60px] 2xl:px-0">
            <div className="flex w-full flex-col justify-between gap-8 sm:flex-row">
              <SearchInput
                setUserSearchInput={setUserSearchInput}
                theme={theme}
              />
              <FilterInput
                filterState={filters}
                filterStateSetter={setFilters}
                theme={theme}
              />
            </div>
          </div>
          <div className="mx-auto h-full w-full overflow-y-auto sm:max-w-screen-2xl 2xl:px-0">
            <CountryList
              userSearchInput={userSearchInput}
              filters={filters}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
