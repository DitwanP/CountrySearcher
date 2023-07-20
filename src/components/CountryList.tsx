import { Country } from "../utilities/Interfaces";
import { FilterSet } from "../utilities/Types";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
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

  const _countries = data?.pages.flatMap((page) => page);

  const lastCountryRef = useRef<HTMLDivElement>();
  const { ref, entry } = useIntersection({
    root: lastCountryRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);

  useEffect(() => {
    refetch();
  }, [queriedCountries]);

  return (
    <div className="z-0 flex w-full flex-col items-center justify-center gap-20 sm:grid md:grid-cols-2 lg:grid-cols-4">
      {_countries?.map((country, i) => {
        return i === _countries.length - 1 ? (
          <CountryCard countryInfo={country} key={i} lastCountryRef={ref} />
        ) : (
          <CountryCard countryInfo={country} key={i} />
        );
      })}
      {(data?.pages.length ?? 0 > 25) && (
        <p className="text-2xl">Nothing more to load</p>
      )}
    </div>
  );
};

export default CountryList;
