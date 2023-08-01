import { Country } from "../Interfaces";
import { FilterSet } from "../Types";
import { CountryListSchema } from "../Schemas";
import FallbackCountryData from "../../assets/data/country-data.json";

export const countryDictionary: Map<string, Country> = new Map();

export const getCountriesData = async (
  setAllCountries: React.Dispatch<
    React.SetStateAction<typeof CountryListSchema["_output"]>
  >,
  setFilteredCountries: React.Dispatch<
    React.SetStateAction<typeof CountryListSchema["_output"]>
  >,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const response = await fetch("https://restcountries.com/v3.1/all");

  if (!response.ok) {
    const err = new Error("Failed to fetch data from the API.");
    console.log(err.message + "🫠");
    console.log("No worries, I'll render some fallback data. 😉");

    getFallbackCountries(setAllCountries, setFilteredCountries);
    setIsLoading(false);
  } else {
    const allCountriesData = await response.json();
    const parsedCountriesData = CountryListSchema.safeParse(allCountriesData);
    if (parsedCountriesData.success) {
      sortCountries(parsedCountriesData.data);
      setAllCountries(parsedCountriesData.data);
      setFilteredCountries(parsedCountriesData.data);
      getCountriesDictionary(parsedCountriesData.data);
      setIsLoading(false);
    } else {
      getFallbackCountries(setAllCountries, setFilteredCountries);
      setIsLoading(false);
    }
  }
};

export const getCountriesForPage = async (
  countries: typeof CountryListSchema["_output"],
  page: number,
  CARDS_PER_PAGE: number
) => {
  const startIdx = (page - 1) * CARDS_PER_PAGE;
  const endIdx = startIdx + CARDS_PER_PAGE;
  return countries.slice(startIdx, endIdx);
};

export const getFallbackCountries = (
  setAllCountries: React.Dispatch<
    React.SetStateAction<typeof CountryListSchema["_output"]>
  >,
  setFilteredCountries: React.Dispatch<
    React.SetStateAction<typeof CountryListSchema["_output"]>
  >
) => {
  const allCountriesData = CountryListSchema.parse(FallbackCountryData);
  sortCountries(allCountriesData);
  setAllCountries(allCountriesData);
  setFilteredCountries(allCountriesData);
  getCountriesDictionary(allCountriesData);
};

export const getCountriesDictionary = (
  countriesData: typeof CountryListSchema["_output"]
) => {
  countriesData.forEach((country: any) => {
    countryDictionary.set(country.cca3, country);
  });
};

export function sortCountries(countryData: Country[]) {
  return countryData.sort((a, b) => {
    if (
      a.name.common
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase() <
      b.name.common
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
    ) {
      return -1;
    } else if (
      a.name.common
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase() >
      b.name.common
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
    ) {
      return 1;
    } else {
      return 0;
    }
  });
}

export function filterBySearch(
  countries: typeof CountryListSchema["_output"],
  userSearchInput: string
) {
  let newCountriesList;

  newCountriesList = countries?.filter((country) => {
    return country.name.common
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .startsWith(userSearchInput.toLowerCase());
  });

  return newCountriesList;
}

export function filterByFilters(
  countries: typeof CountryListSchema["_output"],
  filters: FilterSet
) {
  let newCountriesList;

  newCountriesList = countries?.filter((country) => {
    return filters.has(country.region.toLowerCase());
  });

  return newCountriesList;
}
