import { Country } from "../Interfaces";

export default async function getCountries(
  page: number,
  cardsPerPage: number,
  initialFetch: boolean,
  queriedCountries: Country[]
) {
  if (initialFetch) {
    const randomTimeout = Math.floor(Math.random() * 1000) + 1000;
    if (page == 1) {
      await new Promise((resolve) => setTimeout(resolve, randomTimeout));
    }
  }

  const randomTimeout = Math.floor(Math.random() * 200) + 200;
  if (page == 1) {
    await new Promise((resolve) => setTimeout(resolve, randomTimeout));
  }

  return queriedCountries.slice((page - 1) * cardsPerPage, page * cardsPerPage);
}
