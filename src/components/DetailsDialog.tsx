import { useEffect, useState } from "react";
import { Country, DialogProps } from "../utilities/Interfaces";
import LeftArrow from "../assets/images/left-arrow.svg";
import LeftArrowWhite from "../assets/images/left-arrow-white.svg";
import getCountryFromCode from "../utilities/functions/getCountriesFromCode";

const DetailsDialog = ({
  isOpen,
  theme,
  setDialogInfo,
  country,
}: DialogProps) => {
  const [currentCountry, setCurrentCountry] = useState<Country>(
    country as Country
  );
  const [prevCountries, setPrevCountries] = useState<string[]>([]);

  const changeCountry = async (countryCode: string) => {
    setPrevCountries((prev) => [...prev, currentCountry?.alpha3Code as string]);
    let nextCountry = await getCountryFromCode(countryCode);
    setCurrentCountry(nextCountry as Country);
  };

  const goBack = async () => {
    const prevCountryCode = prevCountries.pop();

    if (prevCountryCode) {
      let prevCountry = await getCountryFromCode(prevCountryCode);
      const poppedPrev = prevCountries.filter((code) => {
        return code !== prevCountryCode;
      });

      setPrevCountries(poppedPrev);
      setCurrentCountry(prevCountry as Country);
    } else {
      document.body.removeAttribute("class");
      setDialogInfo({ isOpen: false, country: undefined });
    }
  };

  useEffect(() => {
    document.body.setAttribute("class", "modal-open");
  }, [isOpen]);

  return (
    <dialog
      id="details-dialog"
      open={isOpen}
      className="fixed left-0 top-0 z-30 mb-24 h-[100dvh] w-full overflow-y-scroll bg-white bg-opacity-30 pt-[80px]
      text-black backdrop-blur-3xl transition-all dark:bg-black dark:bg-opacity-50 dark:text-white"
    >
      <div
        className="mx-auto flex h-full w-full flex-col items-center justify-start
        gap-12 px-14 py-16 sm:max-w-screen-2xl md:gap-20 2xl:px-0"
      >
        <div className="w-full">
          <button
            onClick={goBack}
            className="flex h-16 items-center justify-center gap-4 rounded-lg
            border-2 border-black bg-transparent px-6 shadow-xl transition-colors duration-150 ease-linear hover:bg-black
            hover:text-white dark:border-white dark:hover:bg-black dark:hover:text-white"
          >
            <span className="text-[24px]">&#8592;</span>
          </button>
        </div>
        <div className="flex h-full w-full flex-col gap-14 md:items-center md:justify-center md:gap-16">
          <div className="w-full md:w-[90%] lg:w-4/5 xl:w-3/4">
            <div className="custom-shadow h-fit w-full">
              <img
                src={currentCountry?.flag}
                alt={`${currentCountry?.name}'s flag`}
                className="fade-in h-full w-full rounded-lg object-contain transition-transform
                duration-150 ease-out"
              />
            </div>
          </div>
          <div className="flex w-full flex-col justify-start gap-3 pb-16 md:w-[90%] lg:w-4/5 lg:pb-0 xl:w-3/4">
            <div>
              <p className="mb-8 text-4xl font-normal tracking-[0.1em] sm:text-4.5xl lg:text-6xl">
                {currentCountry?.name
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toUpperCase()}
              </p>
            </div>
            <div className="flex h-full w-full flex-col md:flex-row md:gap-8">
              <div className="flex w-full flex-col gap-4">
                <div>
                  <span className="text-3xl font-semibold tracking-widest lg:text-4xl xl:text-5xl">
                    Native Name:{" "}
                  </span>
                  <span className="text-3xl font-extralight tracking-widest sm:text-4xl lg:text-4xl xl:text-5xl">
                    {currentCountry?.nativeName}
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-semibold tracking-widest lg:text-4xl xl:text-5xl">
                    Population:{" "}
                  </span>
                  <span className="text-3xl font-extralight  tracking-widest sm:text-4xl lg:text-4xl xl:text-5xl">
                    {currentCountry?.population.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-semibold tracking-widest lg:text-4xl xl:text-5xl">
                    Region:{" "}
                  </span>
                  <span className="text-3xl font-extralight  tracking-widest sm:text-4xl lg:text-4xl xl:text-5xl">
                    {currentCountry?.region}
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-semibold tracking-widest lg:text-4xl xl:text-5xl">
                    Sub Region:{" "}
                  </span>
                  <span className="text-3xl font-extralight  tracking-widest sm:text-4xl lg:text-4xl xl:text-5xl">
                    {currentCountry?.subregion}
                  </span>
                </div>
                <p className="font-lextraight mb-12 text-3xl  tracking-widest transition-transform lg:text-4xl xl:text-5xl">
                  <span className="text-3xl font-semibold tracking-widest lg:text-4xl xl:text-5xl">
                    Capital:{" "}
                  </span>
                  {!currentCountry?.currencies ? (
                    <span className="text-3xl font-extralight tracking-widest sm:text-4xl lg:text-4xl xl:text-5xl">
                      N/A
                    </span>
                  ) : (
                    <span className="text-3xl font-extralight tracking-widest sm:text-4xl lg:text-4xl xl:text-5xl">
                      {currentCountry?.capital}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex w-full flex-col gap-4">
                <div>
                  <span className="text-3xl font-semibold tracking-widest lg:text-4xl xl:text-5xl">
                    Top Level Domain:{" "}
                  </span>
                  <span className="text-3xl font-extralight tracking-widest sm:text-4xl lg:text-4xl xl:text-5xl">
                    {currentCountry?.topLevelDomain}
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-semibold tracking-widest lg:text-4xl xl:text-5xl">
                    Currencies:{" "}
                  </span>
                  {!currentCountry?.currencies && (
                    <span className="text-3xl font-extralight tracking-widest sm:text-4xl lg:text-4xl xl:text-5xl">
                      N/A
                    </span>
                  )}
                  {currentCountry?.currencies?.map((currency, index) => (
                    <span
                      className="text-3xl font-extralight tracking-widest sm:text-4xl lg:text-4xl xl:text-5xl"
                      key={index}
                    >
                      {currency.name}
                      {currentCountry?.currencies &&
                      index !== currentCountry.currencies.length - 1
                        ? ", "
                        : ""}
                    </span>
                  ))}
                </div>
                <div className="mb-12">
                  <span className="text-3xl font-semibold tracking-widest lg:text-4xl xl:text-5xl">
                    Languages:{" "}
                  </span>
                  {currentCountry?.languages?.map((currency, index) => (
                    <span
                      className="text-3xl font-extralight tracking-widest sm:text-4xl lg:text-4xl xl:text-5xl"
                      key={index}
                    >
                      {currency.name}
                      {currentCountry?.languages &&
                      index !== currentCountry.languages.length - 1
                        ? ", "
                        : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="">
              <span className="text-3xl font-semibold tracking-wider lg:text-4xl xl:text-5xl">
                Border Countries:{" "}
              </span>
              {!currentCountry?.borders && (
                <span className="text-3xl font-extralight tracking-widest sm:text-4xl">
                  N/A
                </span>
              )}
              <br />
              <span className="mt-4 flex w-full flex-wrap gap-6">
                {currentCountry?.borders?.map((border, index) => (
                  <button
                    key={index}
                    onClick={() => changeCountry(border)}
                    className="flex h-16 w-40 items-center justify-center rounded-lg border-2 border-black 
                    bg-transparent px-12 py-3 text-xl font-medium tracking-widest shadow-xl transition-colors
                    duration-150 ease-linear hover:bg-black hover:text-white dark:border-white"
                  >
                    {border}
                  </button>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default DetailsDialog;
