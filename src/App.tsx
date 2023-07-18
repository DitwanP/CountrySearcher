import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchInput from "./components/SearchInput";
import FilterInput from "./components/FilterInput";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  console.log(isDarkMode);

  return (
    <div className="h-screen bg-slate-400">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="mt-14 flex w-full flex-col gap-14 px-8">
        <div className="flex w-full flex-col justify-between gap-14 md:flex-row">
          <SearchInput />
          <FilterInput />
        </div>
      </div>
    </div>
  );
}

export default App;
