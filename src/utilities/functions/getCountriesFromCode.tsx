import { Country } from "../Interfaces";
import CountryData from "../../assets/data/country-data.json";
const allCountriesInfo: Country[] = CountryData;

export default async function getCountryFromCode(code: string) {
  let country: Country | undefined = allCountriesInfo.find((country) => {
    return country.alpha3Code === code;
  });

  return country;
}
