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
  const { countryInfo, lastCountryRef, setDialogInfo } = props;

  const openDialog = () => {
    console.log(countryInfo);
    if (setDialogInfo) {
      setDialogInfo({
        isOpen: true,
        country: countryInfo,
      });
    }
  };

  return (
    <div
      ref={lastCountryRef}
      onClick={openDialog}
      className={`group relative flex h-[460px] w-full flex-grow transform-gpu
      flex-col overflow-hidden rounded-md border-[1px] 
      sm:pointer-events-auto sm:max-w-[320px] xl:border-white
      ${
        countryInfo &&
        "transition-all duration-300 ease-in xl:hover:cursor-pointer xl:hover:shadow-2xl"
      }`}
    >
      <div
        className="absolute z-10 h-full w-full rounded-md bg-black 
        opacity-20"
      ></div>

      <SkeletonTheme
        baseColor="#2b3945"
        highlightColor="#344554"
        duration={1.5}
      >
        <div
          className="flag-skeleton-container absolute h-full w-full overflow-hidden 
          rounded-md"
        >
          {countryInfo ? (
            <div className="h-full w-full rounded-md bg-[#211f2d] drop-shadow-md">
              <img
                src={countryInfo.flag}
                alt={`${countryInfo.name}'s flag`}
                className="fade-in h-full w-full transform-gpu rounded-md
                object-cover blur-[50px] brightness-75 grayscale-[.5]
                "
              />
            </div>
          ) : (
            <Skeleton containerClassName="flex h-full" height="100%" />
          )}
        </div>

        <div
          className="relative z-20 flex w-full flex-grow flex-col items-center 
          justify-center gap-6 p-8 text-center text-white"
        >
          <span
            className={`text-4xl font-extralight leading-tight tracking-[0.2em]
            ${
              countryInfo &&
              "transition-transform duration-300 ease-out xl:group-hover:-translate-y-4"
            }`}
          >
            {countryInfo ? (
              countryInfo.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toUpperCase()
            ) : (
              <Skeleton containerClassName="flex h-10 w-[60%]" height="100%" />
            )}
          </span>

          <div className="my-4 h-[1px] w-1/2 bg-white"></div>

          {countryInfo ? (
            <div className="flex w-full flex-col items-center gap-6">
              <p
                className="text-3xl font-normal tracking-wider 
                transition-transform duration-300 xl:group-hover:-translate-y-4"
              >
                capital{": "}
                <br />
                <span className="text-3xl font-extralight tracking-widest">
                  {countryInfo.capital?.toUpperCase() || "N/A"}
                </span>
              </p>

              <p
                className="text-3xl font-normal tracking-wider transition-transform 
                duration-300 ease-out xl:group-hover:-translate-y-4"
              >
                region{": "}
                <br />
                <span className="text-3xl font-extralight tracking-widest">
                  {countryInfo.region.toUpperCase()}
                </span>
              </p>

              <p
                className="text-3xl font-normal tracking-wider transition-transform 
                duration-300 ease-out xl:group-hover:-translate-y-4"
              >
                population{": "}
                <br />
                <span className="text-3xl font-extralight tracking-widest">
                  {countryInfo.population.toLocaleString()}
                </span>
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Skeleton containerClassName="flex h-6 w-[55%]" height="100%" />
              <Skeleton containerClassName="flex h-6 w-[40%]" height="100%" />
              <Skeleton containerClassName="flex h-6 w-[45%]" height="100%" />
            </div>
          )}
        </div>
      </SkeletonTheme>
      {countryInfo && (
        <span
          className={`absolute bottom-4 left-1/2 flex w-full -translate-x-1/2 
          justify-center pt-1 text-lg font-light tracking-[0.2em] 
          text-white transition-all duration-[400ms] ease-out xl:bottom-[-25px]
          xl:opacity-0 xl:group-hover:-translate-y-16 xl:group-hover:opacity-100`}
        >
          CLICK FOR DETAILS
        </span>
      )}
    </div>
  );
};

export default CountryCard;
