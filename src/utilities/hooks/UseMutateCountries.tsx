import { useState, useEffect } from "react";
import { Country } from "../Interfaces";
import { FilterSet } from "../Types";

interface UseMutateCountriesProps {
  userSearchInput: string;
  filters: FilterSet;
  allCountriesInfo: Country[];
}

export function useMutateCountries(props: UseMutateCountriesProps) {
  const { userSearchInput, filters, allCountriesInfo } = props;
  const [queriedCountries, setQueriedCountries] = useState(allCountriesInfo);

  useEffect(() => {
    let newCountriesList;

    // Filter by search if there is user input
    if (userSearchInput) {
      newCountriesList = allCountriesInfo.filter((country) => {
        return country.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .startsWith(userSearchInput.toLowerCase());
      });
    } else {
      newCountriesList = allCountriesInfo;
    }

    // Filter the list return from the search query
    if (filters.size > 0) {
      newCountriesList = newCountriesList.filter((country) => {
        return filters.has(country.region.toLowerCase());
      });
    }

    setQueriedCountries(newCountriesList);
  }, [userSearchInput, filters]);

  return queriedCountries;
}
