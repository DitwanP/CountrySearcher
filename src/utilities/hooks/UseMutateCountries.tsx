import { useState, useEffect } from "react";
import { Country } from "../Interfaces";
import { FilterSet } from "../Types";

interface UseMutateCountriesProps {
  userSearchInput: string;
  filters: FilterSet;
  currentCountriesData: Country[] | undefined;
}

export function useMutateCountries(props: UseMutateCountriesProps) {
  const { userSearchInput, filters, currentCountriesData } = props;
  const [queriedCountries, setQueriedCountries] =
    useState(currentCountriesData);

  useEffect(() => {
    let newCountriesList;

    // Filter by search if there is user input
    if (userSearchInput) {
      newCountriesList = currentCountriesData?.filter((country) => {
        return country.name.common
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .startsWith(userSearchInput.toLowerCase());
      });
    } else {
      newCountriesList = currentCountriesData;
    }

    // Filter the list return from the search query
    if (filters.size > 0) {
      newCountriesList = newCountriesList?.filter((country) => {
        return filters.has(country.region.toLowerCase());
      });
    }

    setQueriedCountries(newCountriesList);
  }, [userSearchInput, filters]);

  return queriedCountries;
}
