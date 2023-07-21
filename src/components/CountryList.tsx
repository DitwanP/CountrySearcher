import { Country } from "../utilities/Interfaces";
import { FilterSet } from "../utilities/Types";
import React, { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMutateCountries } from "../utilities/Hooks";
import CountryData from "../assets/data/country-data.json";
import CountryCard from "../components/CountryCard";
import getCountries from "../utilities/functions/getCountries";

const allCountriesInfo: Country[] = CountryData;
export interface CountryListProps {
  userSearchInput: string;
  filters: FilterSet;
}

const CountryList = (props: CountryListProps) => {
  const { userSearchInput, filters } = props;
  const cardsPerPage = 16;
  const [isInitialFetch, setIsInitialFetch] = useState(true);
  const mutateCountriesParams = { userSearchInput, filters, allCountriesInfo };
  const queriedCountries = useMutateCountries(mutateCountriesParams);

  const { data, fetchNextPage, refetch, isFetching } = useInfiniteQuery({
    queryKey: ["countriesQuery"],
    queryFn: ({ pageParam = 1 }) => {
      if (isInitialFetch) {
        return getCountries(pageParam, cardsPerPage, true, queriedCountries);
      }
      return getCountries(pageParam, cardsPerPage, false, queriedCountries);
    },
    getNextPageParam: (_, pages) => pages.length + 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const currentCountriesInfo = data?.pages.flatMap((page) => page);

  const countryListRef: any = useRef<HTMLDivElement>();
  const { ref, entry } = useIntersection({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);

  useEffect(() => {
    refetch();
  }, [queriedCountries]);

  useEffect(() => {
    setIsInitialFetch(false);
  }, []);

  return (
    <div
      ref={countryListRef}
      className="z-0 flex w-full flex-col items-center justify-start gap-20
      sm:grid sm:grid-cols-2 sm:justify-items-center lg:grid-cols-3
      2xl:grid-cols-4 2xl:grid-rows-4"
    >
      {isFetching
        ? [...Array(cardsPerPage)].map((_e, i) => <CountryCard key={i} />)
        : currentCountriesInfo?.map((country, i) => {
            return i === currentCountriesInfo.length - 1 ? (
              <CountryCard countryInfo={country} key={i} lastCountryRef={ref} />
            ) : (
              <CountryCard countryInfo={country} key={i} />
            );
          })}
    </div>
  );
};

export default React.memo(CountryList);
