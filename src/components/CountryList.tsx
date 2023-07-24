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

const allCountriesInfo: Country[] = CountryData;
export interface CountryListProps {
  userSearchInput: string;
  filters: FilterSet;
  isDarkMode: boolean;
}

const defaultDialogState: DialogStateInterface = {
  isOpen: false,
  country: undefined,
};

const CountryList = (props: CountryListProps) => {
  const { userSearchInput, filters, isDarkMode } = props;
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

  console.log("From list: ", dialogInfo);

  return (
    <div
      ref={countryListRef}
      className="flex w-full flex-col items-center justify-start gap-14
      sm:flex-row sm:flex-wrap sm:justify-center"
    >
      {isFetching
        ? [...Array(cardsPerPage)].map((_e, i) => (
            <CountryCard key={i} isDarkMode={isDarkMode} />
          ))
        : currentCountriesInfo?.map((country, i) => {
            return i === currentCountriesInfo.length - 1 ? (
              <CountryCard
                key={i}
                isDarkMode={isDarkMode}
                countryInfo={country}
                lastCountryRef={ref}
                setDialogInfo={setDialogInfo}
              />
            ) : (
              <CountryCard
                key={i}
                isDarkMode={isDarkMode}
                countryInfo={country}
                setDialogInfo={setDialogInfo}
              />
            );
          })}
      {dialogInfo.isOpen && (
        <DetailsDialog
          isOpen={dialogInfo.isOpen}
          isDarkMode={isDarkMode}
          setDialogInfo={setDialogInfo}
          country={dialogInfo.country}
        />
      )}
    </div>
  );
};

export default CountryList;
