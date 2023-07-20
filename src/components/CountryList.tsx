import { Country } from "../utilities/Interfaces";
import { FilterSet } from "../utilities/Types";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMutateCountries } from "../utilities/Hooks";
import CountryData from "../assets/data/country-data.json";
import CountryCard from "./CountryCard";

export interface CountryListProps {
  userSearchInput: string;
  filters: FilterSet;
}

const CountryList = (props: CountryListProps) => {
  const { userSearchInput, filters } = props;
  const countries: Country[] = CountryData;
  const queriedCountries = useMutateCountries({
    userSearchInput,
    filters,
    countries,
  });

  const getCountries = (page: number) => {
    return queriedCountries.slice((page - 1) * 10, page * 10);
  };

  const { data, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    {
      queryKey: ["countriesQuery"],
      queryFn: ({ pageParam = 1 }) => getCountries(pageParam),
      getNextPageParam: (_, pages) => pages.length + 1,
      initialData: {
        pages: [queriedCountries.slice(0, 10)],
        pageParams: [1],
      },
    }
  );

  const getCountryCards = (page: Country[]) => {
    return page.map((country, j) => (
      <CountryCard countryInfo={country} key={j} />
    ));
  };

  useEffect(() => {
    refetch();
  }, [queriedCountries]);

  return (
    <div className="z-0 flex w-full flex-col items-center justify-center gap-20 sm:grid md:grid-cols-2 lg:grid-cols-4">
      {data?.pages.map((page) => {
        return getCountryCards(page);
      })}
      <button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
        className="h-20 w-96 bg-white p-4 text-2xl shadow-md"
      >
        {isFetchingNextPage
          ? "Loading..."
          : (data?.pages.length ?? 0) < 25
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </div>
  );
};

export default CountryList;
