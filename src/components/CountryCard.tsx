import { Suspense } from "react";
import { Country, DialogStateInterface } from "../utilities/Interfaces";
interface CountryCardProps {
  theme: string;
  countryInfo?: Country;
  lastCountryRef?: (element: any) => void;
  entry?: IntersectionObserverEntry;
  setDialogInfo: React.Dispatch<React.SetStateAction<DialogStateInterface>>;
}

const CountryCard = (props: CountryCardProps) => {
  const { countryInfo, lastCountryRef, setDialogInfo } = props;

  const openDialog = () => {
    setDialogInfo({
      isOpen: true,
      country: countryInfo,
    });
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      openDialog();
    }
  };

  return (
    countryInfo && (
      <div
        tabIndex={0}
        ref={lastCountryRef}
        onClick={openDialog}
        onKeyDown={handleKeyDown}
        role="button"
        aria-label="Country info card"
        title={`Info card for ${countryInfo.name}, click for details.`}
        className=" custom-shadow group relative flex h-[450px] w-full transform-gpu flex-col overflow-hidden rounded-lg transition-transform duration-300 ease-in sm:pointer-events-auto sm:max-w-[400px] sm:basis-[48.5%] md2:basis-[32%] xl:basis-[24%] xl:hover:cursor-pointer xl:hover:shadow-2xl"
      >
        <div className="relative z-20 flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-lg text-center text-white transition-all duration-300 ease-out xl:group-hover:p-8 xl:group-focus:p-8">
          <Suspense>
            <div className="absolute h-full w-full rounded-lg">
              <img
                src={countryInfo.flag}
                alt={`${countryInfo.name
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")}'s flag`}
                className="fade-in h-full w-full scale-125 transform-gpu rounded-lg object-cover
                brightness-[.9] saturate-[.7] transition-all duration-300 xl:group-hover:-rotate-[10deg]
                xl:group-hover:scale-[1.8] xl:group-hover:brightness-[1] xl:group-hover:saturate-[1]"
              />
            </div>
          </Suspense>

          <div className="z-30 flex h-full w-full transform-gpu flex-col items-center justify-center overflow-hidden bg-black bg-opacity-20 p-8 backdrop-blur-[50px] transition-all duration-300 ease-out xl:group-hover:bg-opacity-40">
            <span className="text-[20px] font-normal leading-snug tracking-[0.2em]">
              {countryInfo.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toUpperCase()}
            </span>

            <div className="my-8 h-[1px] w-2/3 bg-white"></div>

            <div className="flex w-full flex-col items-center gap-6">
              <p className="text-2xl font-light tracking-widest">
                capital{": "}
                <br />
                <span className="text-[20px] font-normal tracking-widest">
                  {countryInfo.capital?.toUpperCase() || "N/A"}
                </span>
              </p>
              <p className="text-2xl font-light tracking-widest">
                region{": "}
                <br />
                <span className="text-[20px] font-normal tracking-widest">
                  {countryInfo.region.toUpperCase()}
                </span>
              </p>
              <p className="text-2xl font-light tracking-widest">
                population{": "}
                <br />
                <span className="text-[20px] font-normal tracking-widest">
                  {countryInfo.population.toLocaleString()}
                </span>
              </p>
              <span
                className={`absolute bottom-4 left-1/2 flex w-full -translate-x-1/2 
                justify-center pt-1 text-lg font-light tracking-[0.2em]
                transition-all duration-[400ms] ease-out xl:bottom-[-25px]
                xl:group-hover:-translate-y-16`}
              >
                CLICK FOR DETAILS
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CountryCard;
