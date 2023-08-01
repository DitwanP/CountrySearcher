import { DialogStateInterface } from "../utilities/Interfaces";
import { FilterSet } from "../utilities/Types";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  filterByFilters,
  filterBySearch,
  getCountriesData,
  getCountriesForPage,
} from "../utilities/functions/getCountries";
import { CountryListSchema } from "../utilities/Schemas";

import CountryCard from "../components/CountryCard";
import DetailsDialog from "./DetailsDialog";
import Loader from "./Loader";
import LazyLoad from "react-lazy-load";

export interface CountryListProps {
  userSearchInput: string;
  filters: FilterSet;
  theme: string;
}

const defaultDialogState: DialogStateInterface = {
  isOpen: false,
  country: undefined,
};

const CARDS_PER_PAGE = 12;

const CountryList = (props: CountryListProps) => {
  const { userSearchInput, filters } = props;
  const [dialogInfo, setDialogInfo] = useState(defaultDialogState);
  const [isLoading, setIsLoading] = useState(true);

  const [allCountries, setAllCountries] = useState<
    typeof CountryListSchema["_output"]
  >([]);

  const [filteredCountries, setFilteredCountries] = useState<
    typeof CountryListSchema["_output"]
  >([]);

  const { data, fetchNextPage, refetch, hasNextPage } = useInfiniteQuery({
    queryKey: ["countriesQuery"],
    queryFn: async ({ pageParam = 1 }) =>
      getCountriesForPage(filteredCountries, pageParam, CARDS_PER_PAGE),

    getNextPageParam: (lastPage, pages) => {
      let nextPageParam;
      lastPage.length === CARDS_PER_PAGE
        ? (nextPageParam = pages.length + 1)
        : (nextPageParam = undefined);
      return nextPageParam;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const paginatedCountries = data?.pages.flatMap((page) => page);

  const countryListRef: any = useRef<HTMLDivElement>();
  const { ref, entry } = useIntersection({
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  // Fetch all countries data initially
  useLayoutEffect(() => {
    getCountriesData(setAllCountries, setFilteredCountries, setIsLoading);
  }, []);

  // Fetch next page when the last specified card is intersecting with viewport.
  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);

  // Whenever filtered country state changes refetch the pages from that new list.
  useEffect(() => {
    refetch();
  }, [filteredCountries]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  // Update data when user inputs into search or filters
  useLayoutEffect(() => {
    let newCountries: typeof CountryListSchema["_output"];

    if (userSearchInput) {
      newCountries = filterBySearch(allCountries, userSearchInput);
    } else {
      newCountries = allCountries;
    }

    if (filters.size > 0) {
      newCountries = filterByFilters(newCountries, filters);
    }

    setFilteredCountries(newCountries);
  }, [userSearchInput, filters]);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={countryListRef}
        className="grid w-full gap-12 overflow-hidden pb-20 sm:grid-cols-2 md2:grid-cols-3 xl:grid-cols-4"
      >
        {isLoading ? (
          <div className="absolute left-0 mt-64 flex w-full justify-center">
            <Loader />
          </div>
        ) : (
          paginatedCountries?.map((country, i) => {
            return i === paginatedCountries.length - 5 ? (
              <LazyLoad key={i}>
                <CountryCard
                  countryInfo={country}
                  lastCountryRef={ref}
                  setDialogInfo={setDialogInfo}
                />
              </LazyLoad>
            ) : (
              <LazyLoad key={i}>
                <CountryCard
                  countryInfo={country}
                  setDialogInfo={setDialogInfo}
                />
              </LazyLoad>
            );
          })
        )}
      </div>
      {!hasNextPage && !isLoading && (
        <div className="flex w-full animate-pulse justify-center pb-8 text-3xl text-black dark:text-white">
          Nothing more to see here folks 👽
        </div>
      )}
      {dialogInfo.isOpen && (
        <DetailsDialog
          isOpen={dialogInfo.isOpen}
          setDialogInfo={setDialogInfo}
          country={dialogInfo.country}
        />
      )}
    </div>
  );
};

export default CountryList;
