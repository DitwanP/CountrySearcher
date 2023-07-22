import { Country } from "../utilities/Interfaces";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface CountryCardProps {
  countryInfo?: Country;
  lastCountryRef?: (element: any) => void;
  entry?: IntersectionObserverEntry;
}

const CountryCard = (props: CountryCardProps) => {
  const { countryInfo, lastCountryRef } = props;

  return (
    <div
      ref={lastCountryRef}
      className={`group relative flex h-[460px] w-[320px] flex-col overflow-hidden
      rounded-xl bg-white shadow-md 2xl:max-w-none
      ${
        countryInfo &&
        "transition-all duration-300 hover:-translate-y-6 hover:cursor-pointer hover:shadow-2xl"
      }`}
    >
      <SkeletonTheme
        baseColor="#2b3945"
        highlightColor="#344554"
        duration={1.5}
      >
        <div className="flag-skeleton-container h-[200px] w-full rounded-t-xl">
          {countryInfo ? (
            <div className="h-full w-full overflow-hidden rounded-t-xl drop-shadow-md">
              <img
                src={countryInfo.flag}
                alt={`${countryInfo.name}'s flag`}
                className="fade-in h-full w-full rounded-t-xl object-cover 
                transition-transform duration-500 group-hover:scale-125"
              />
            </div>
          ) : (
            <Skeleton containerClassName="flex h-full" height="100%" />
          )}
        </div>

        <div className="flex w-full flex-grow flex-col justify-center gap-6 px-8 py-14">
          <span
            className={`text-4xl font-bold leading-tight tracking-wider text-very-dark-blueT
            ${
              countryInfo &&
              "transition-transform duration-300 group-hover:-translate-y-4"
            }`}
          >
            {countryInfo ? (
              countryInfo.name
            ) : (
              <Skeleton containerClassName="flex h-10 w-[60%]" height="100%" />
            )}
          </span>
          <div className="flex flex-col gap-4 text-very-dark-blueT">
            {countryInfo ? (
              <p
                className="text-3xl font-semibold transition-transform 
                delay-[25ms] duration-300 group-hover:-translate-y-4"
              >
                Population:{" "}
                <span className="text-3xl font-normal text-dark-blue">
                  {countryInfo.population.toLocaleString()}
                </span>
              </p>
            ) : (
              <Skeleton containerClassName="flex h-6 w-[55%]" height="100%" />
            )}
            {countryInfo ? (
              <p
                className={`text-3xl font-semibold transition-transform 
                ${
                  countryInfo &&
                  " transition-transform delay-[50ms] duration-300 group-hover:-translate-y-4"
                }`}
              >
                Region:{" "}
                <span className="text-3xl font-normal text-dark-blue">
                  {countryInfo.region}
                </span>
              </p>
            ) : (
              <Skeleton containerClassName="flex h-6 w-[40%]" height="100%" />
            )}
            {countryInfo ? (
              <p
                className={`text-3xl font-semibold  
                ${
                  countryInfo &&
                  "transition-transform delay-[75ms] duration-300 group-hover:-translate-y-4"
                }`}
              >
                Capital:{" "}
                <span className="text-3xl font-normal text-dark-blue">
                  {countryInfo.capital || "N/A"}
                </span>
              </p>
            ) : (
              <Skeleton containerClassName="flex h-6 w-[45%]" height="100%" />
            )}
          </div>
        </div>
      </SkeletonTheme>
      {countryInfo && (
        <span
          className="absolute bottom-[-25px] left-1/2 flex w-full -translate-x-1/2 justify-center pt-1 
        text-xl font-semibold text-very-dark-blue opacity-0 transition-all
        duration-[400ms] group-hover:-translate-y-16 group-hover:opacity-100"
        >
          CLICK FOR DETAILS
        </span>
      )}
    </div>
  );
};

export default CountryCard;
