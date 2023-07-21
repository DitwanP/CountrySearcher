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
      className="flex h-[460px] w-full min-w-[320px] max-w-[360px] flex-col 
      rounded-xl bg-white shadow-md transition-all 2xl:max-w-none"
    >
      <SkeletonTheme
        baseColor="#2b3945"
        highlightColor="#344554"
        duration={1.5}
      >
        <div className="flag-skeleton-container h-[200px] w-full rounded-t-xl">
          {countryInfo ? (
            <img
              src={countryInfo.flag}
              alt={`${countryInfo.name}'s flag`}
              className=" fade-in h-full w-full rounded-t-xl object-cover drop-shadow-md"
            />
          ) : (
            <Skeleton containerClassName="flex h-full" height="100%" />
          )}
        </div>

        <div className=" flex w-full flex-grow flex-col justify-center gap-6 px-8 py-14">
          <span className="text-4xl font-bold leading-tight tracking-wider text-very-dark-blueT">
            {countryInfo ? (
              countryInfo.name
            ) : (
              <Skeleton containerClassName="flex h-10 w-[60%]" height="100%" />
            )}
          </span>
          <div className="flex flex-col gap-4 text-very-dark-blueT">
            {countryInfo ? (
              <p className="text-3xl font-semibold">
                Population:{" "}
                <span className="text-3xl font-normal text-dark-blue">
                  {countryInfo.population.toLocaleString()}
                </span>
              </p>
            ) : (
              <Skeleton containerClassName="flex h-6 w-[55%]" height="100%" />
            )}
            {countryInfo ? (
              <p className="text-3xl font-semibold">
                Region:{" "}
                <span className="text-3xl font-normal text-dark-blue">
                  {countryInfo.region}
                </span>
              </p>
            ) : (
              <Skeleton containerClassName="flex h-6 w-[40%]" height="100%" />
            )}
            {countryInfo ? (
              <p className="text-3xl font-semibold">
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
    </div>
  );
};

export default CountryCard;
