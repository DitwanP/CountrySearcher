import { Suspense } from "react";
import { Country, DialogStateInterface } from "../utilities/Interfaces";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface CountryCardProps {
  isDarkMode: boolean;
  countryInfo?: Country;
  lastCountryRef?: (element: any) => void;
  entry?: IntersectionObserverEntry;
  setDialogInfo?: React.Dispatch<React.SetStateAction<DialogStateInterface>>;
}

const CountryCard = (props: CountryCardProps) => {
  const { countryInfo, lastCountryRef, setDialogInfo, isDarkMode } = props;

  const openDialog = () => {
    console.log(countryInfo);
    if (setDialogInfo) {
      setDialogInfo({
        isOpen: true,
        country: countryInfo,
      });
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      openDialog();
    }
  };

  return countryInfo ? (
    <div
      tabIndex={0}
      ref={lastCountryRef}
      onClick={openDialog}
      onKeyDown={handleKeyDown}
      className="group relative flex h-[450px] w-full transform-gpu flex-col rounded-md border-2 border-white transition-transform duration-300 ease-in sm:pointer-events-auto sm:max-w-[400px] sm:basis-[48.5%] md2:basis-[32%] xl:basis-[24%] xl:hover:cursor-pointer xl:hover:shadow-2xl"
    >
      {/* Transparent Overlay */}

      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden p-8 text-center text-white">
        <Suspense>
          <div
            className={`absolute h-full w-full rounded-md p-[2px] ${
              isDarkMode ? "bg-[#272626]" : "bg-[#d9d9d9]"
            }`}
          >
            <img
              src={countryInfo.flag}
              loading="lazy"
              alt={`${countryInfo.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")}'s flag`}
              className="fade-in h-full w-full transform-gpu rounded-md object-cover blur-[45px]
              brightness-[.5] grayscale-[.3] transition-all duration-300 xl:group-hover:blur-[0px] 
              xl:group-hover:brightness-[.3]"
            />
          </div>
        </Suspense>

        <div className="z-30 flex w-full flex-col items-center justify-center">
          <span className="text-4xl font-extralight leading-snug tracking-[0.2em] transition-transform duration-300 ease-out xl:group-hover:-translate-y-4 xl:group-focus-visible:-translate-y-4">
            {countryInfo.name
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toUpperCase()}
          </span>

          <div className="my-8 h-[1px] w-1/4 bg-white transition-transform duration-300 ease-out xl:group-hover:-translate-y-4 xl:group-focus-visible:-translate-y-4"></div>

          <div className="flex w-full flex-col items-center gap-10">
            <p className="text-3xl font-normal tracking-widest transition-transform duration-300 xl:group-hover:-translate-y-4  xl:group-focus-visible:-translate-y-4">
              capital{": "}
              <br />
              <span className="text-3xl font-extralight tracking-widest">
                {countryInfo.capital?.toUpperCase() || "N/A"}
              </span>
            </p>
            <p className="text-3xl font-normal tracking-widest transition-transform duration-300 ease-out xl:group-hover:-translate-y-4 xl:group-focus-visible:-translate-y-4">
              region{": "}
              <br />
              <span className="text-3xl font-extralight tracking-widest">
                {countryInfo.region.toUpperCase()}
              </span>
            </p>
            <p className="text-3xl font-normal tracking-widest transition-transform duration-300 ease-out xl:group-hover:-translate-y-4 xl:group-focus-visible:-translate-y-4">
              population{": "}
              <br />
              <span className="text-3xl font-extralight tracking-widest">
                {countryInfo.population.toLocaleString()}
              </span>
            </p>
            <span
              className={`absolute bottom-4 left-1/2 flex w-full -translate-x-1/2 
                justify-center pt-1 text-lg font-light tracking-[0.2em] text-white
                transition-all duration-[400ms] ease-out xl:bottom-[-25px]
                xl:group-hover:-translate-y-16 xl:group-focus-visible:-translate-y-4`}
            >
              CLICK FOR DETAILS
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      ref={lastCountryRef}
      className="group relative flex h-[450px] w-full transform-gpu flex-col overflow-hidden
      rounded-md border-[1px] transition-all duration-300 ease-in sm:pointer-events-auto sm:max-w-[400px] sm:basis-[48%] md2:basis-[32%] xl:basis-[24%] xl:border-white xl:hover:cursor-pointer xl:hover:shadow-2xl"
    >
      {/* !!!!FIX SKELETON POSITIONS */}
      <SkeletonTheme
        baseColor="#1c1c1c"
        highlightColor="#303030"
        duration={1.5}
      >
        <div className="flex flex-col gap-4">
          <div className="flag-skeleton-container absolute h-full w-full overflow-hidden rounded-md">
            <Skeleton containerClassName="flex h-full" height="100%" />
          </div>
          <Skeleton containerClassName="flex h-6 w-[55%]" height="100%" />
          <Skeleton containerClassName="flex h-6 w-[40%]" height="100%" />
          <Skeleton containerClassName="flex h-6 w-[45%]" height="100%" />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default CountryCard;
