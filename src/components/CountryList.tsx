import { Country, DialogStateInterface } from "../utilities/Interfaces";
import { FilterSet } from "../utilities/Types";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMutateCountries } from "../utilities/hooks/UseMutateCountries";
import CountryData from "../assets/data/country-data.json";
import CountryCard from "../components/CountryCard";
import getCountries from "../utilities/functions/getCountries";
import DetailsDialog from "./DetailsDialog";
import Loader from "./Loader";
import LazyLoad from "react-lazy-load";

const allCountriesInfo: Country[] = CountryData;
export interface CountryListProps {
  userSearchInput: string;
  filters: FilterSet;
  theme: string;
}

const defaultDialogState: DialogStateInterface = {
  isOpen: false,
  country: undefined,
};

const CountryList = (props: CountryListProps) => {
  const { userSearchInput, filters, theme } = props;
  const cardsPerPage = 16;
  const [isInitialFetch, setIsInitialFetch] = useState(true);
  const [dialogInfo, setDialogInfo] = useState(defaultDialogState);
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
      className="grid w-full gap-12 sm:grid-cols-2 md2:grid-cols-3 xl:grid-cols-4"
    >
      {isFetching ? (
        <div className="absolute left-0 mt-64 flex w-full justify-center">
          <Loader />
        </div>
      ) : (
        currentCountriesInfo?.map((country, i) => {
          return i === currentCountriesInfo.length - 1 ? (
            <LazyLoad key={i}>
              <CountryCard
                myKey={i}
                theme={theme}
                countryInfo={country}
                lastCountryRef={ref}
                setDialogInfo={setDialogInfo}
              />
            </LazyLoad>
          ) : (
            <LazyLoad key={i}>
              <CountryCard
                myKey={i}
                theme={theme}
                countryInfo={country}
                setDialogInfo={setDialogInfo}
              />
            </LazyLoad>
          );
        })
      )}
      {dialogInfo.isOpen && (
        <DetailsDialog
          isOpen={dialogInfo.isOpen}
          theme={theme}
          setDialogInfo={setDialogInfo}
          country={dialogInfo.country}
        />
      )}
    </div>
  );
};

export default CountryList;
