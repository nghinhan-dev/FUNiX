import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function useSearchContext() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }) {
  const [searchContext, setSearchContext] = useState({
    startDate: "",
    endDate: "",
    result: [],
  });

  return (
    <SearchContext.Provider value={{ searchContext, setSearchContext }}>
      {children}
    </SearchContext.Provider>
  );
}
