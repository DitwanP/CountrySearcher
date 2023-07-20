import { useState, useEffect } from "react";
import { Country } from "./Interfaces";
import { CountryListProps } from "../components/CountryList";

interface UseMutatCountriesProps extends CountryListProps {
  countries: Country[];
}

export function useMutateCountries(props: UseMutatCountriesProps) {
  const { userSearchInput, filters, countries } = props;
  const [queriedCountries, setQueriedCountries] = useState(countries);

  useEffect(() => {
    let newCountriesList;

    // Filter by search if there is user input
    if (userSearchInput) {
      newCountriesList = countries.filter((country) => {
        return country.name.toLowerCase().startsWith(userSearchInput);
      });
    } else {
      newCountriesList = countries;
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
