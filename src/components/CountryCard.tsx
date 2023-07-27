import { Country, DialogStateInterface } from "../utilities/Interfaces";
interface CountryCardProps {
  theme: string;
  countryInfo?: Country;
  lastCountryRef?: (element: any) => void;
  entry?: IntersectionObserverEntry;
  setDialogInfo: React.Dispatch<React.SetStateAction<DialogStateInterface>>;
}

const CountryCard = (props: CountryCardProps) => {
  const { countryInfo, lastCountryRef, setDialogInfo, theme } = props;

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
        className="custom-shadow group relative flex h-[450px] w-full transform-gpu flex-col overflow-hidden rounded-lg border-2 border-black transition-transform duration-150 ease-out dark:border-white sm:pointer-events-auto sm:max-w-[400px] sm:basis-[48.5%] md2:basis-[32%] xl:basis-[24%] xl:hover:cursor-pointer xl:hover:shadow-2xl xl:focus:cursor-pointer xl:focus:shadow-2xl"
      >
        <div className="relative z-20 flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden px-8 py-10 text-center text-black transition-all duration-150 ease-out dark:text-white">
          <div className="absolute h-full w-full">
            <img
              src={countryInfo.flag}
              alt={`${countryInfo.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")}'s flag`}
              className="fade-in h-full w-full -rotate-[10deg] scale-[1.8] transform-gpu object-cover
                transition-all duration-500 dark:brightness-[.85] xl:group-hover:rotate-[0deg]
                xl:group-hover:scale-[1] xl:group-hover:brightness-[1] xl:group-hover:saturate-[1]
                xl:group-focus:rotate-[0deg] xl:group-focus:scale-[1] xl:group-focus:brightness-[1] 
                xl:group-focus:saturate-[1]"
            />
          </div>
          <div className="z-30 flex h-full w-full transform-gpu flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-white bg-opacity-50 p-8 backdrop-blur-[50px] transition-all duration-150 ease-out dark:border-white dark:bg-black dark:bg-opacity-20 xl:group-hover:bg-opacity-40">
            <span className="text-[20px] font-normal leading-snug tracking-[0.2em]">
              {countryInfo.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toUpperCase()}
            </span>

            <div
              className={`my-8 h-[1px] w-2/3 transition-colors duration-150 ease-out ${
                theme === "dark" ? "bg-white" : "bg-black"
              }`}
            ></div>

            <div className="flex w-full flex-col items-center gap-6">
              <p className="text-2xl font-light tracking-widest">
                capital{": "}
                <br />
                <span className="text-[20px] font-light tracking-widest">
                  {countryInfo.capital?.toUpperCase() || "N/A"}
                </span>
              </p>
              <p className="text-2xl font-light tracking-widest">
                region{": "}
                <br />
                <span className="text-[20px] font-light tracking-widest">
                  {countryInfo.region.toUpperCase()}
                </span>
              </p>
              <p className="text-2xl font-light tracking-widest">
                population{": "}
                <br />
                <span className="text-[20px] font-light tracking-widest">
                  {countryInfo.population.toLocaleString()}
                </span>
              </p>
              <span
                className={`absolute bottom-4 left-1/2 flex w-full -translate-x-1/2 
                justify-center pt-1 text-lg font-light tracking-[0.2em]
                transition-all duration-150 ease-out xl:bottom-[-25px]
                xl:group-hover:-translate-y-16 xl:group-focus:-translate-y-16`}
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
