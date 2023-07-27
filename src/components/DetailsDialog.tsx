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
      className="fixed left-0 top-0 z-30 mb-24 h-[100dvh] w-full overflow-hidden bg-white bg-opacity-30 pt-[80px] text-black
      backdrop-blur-3xl transition-all dark:bg-black dark:bg-opacity-10 dark:text-white"
    >
      <div
        className="mx-auto flex h-full w-full flex-col items-center justify-start
        gap-12 overflow-x-hidden px-14 py-16 sm:max-w-screen-2xl"
      >
        <div className="w-full">
          <button
            onClick={goBack}
            className="testing-svg flex h-20 items-center justify-start gap-4 rounded-lg
            border-2 border-black bg-transparent px-10 shadow-xl hover:bg-black 
            hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-white"
          >
            <img
              src={theme === "dark" ? LeftArrowWhite : LeftArrow}
              alt="Left Arrow Icon"
              className="w-6"
            />
            <span className="text-[14px]">Back</span>
          </button>
        </div>
        <div className="flex h-full w-full flex-col gap-14 lg:flex-row lg:items-center lg:gap-20">
          <div className="w-full lg:flex lg:h-full lg:items-center">
            <div className="custom-shadow h-fit w-full">
              <img
                src={currentCountry?.flag}
                alt={`${currentCountry?.name}'s flag`}
                className="fade-in h-full w-full rounded-lg object-cover transition-transform
                duration-500 ease-out lg:object-contain xl:group-hover:scale-125"
              />
            </div>
          </div>
          <div className="flex w-full flex-col justify-start gap-3 pb-16 lg:pb-0">
            <div>
              <p className="mb-8 text-4xl font-normal tracking-[0.1em] sm:text-4.5xl lg:text-5xl">
                {currentCountry?.name
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toUpperCase()}
              </p>
            </div>
            <div className="flex w-full flex-col lg:flex-row lg:gap-8">
              <div className="flex w-full flex-col gap-4">
                <div>
                  <span className="text-3xl font-light tracking-wider lg:text-4xl">
                    Native Name:{" "}
                  </span>
                  <span className="text-3xl font-medium  tracking-widest sm:text-4xl lg:text-4xl">
                    {currentCountry?.nativeName}
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-light tracking-wider lg:text-4xl">
                    Population:{" "}
                  </span>
                  <span className="text-3xl font-medium  tracking-widest sm:text-4xl lg:text-4xl">
                    {currentCountry?.population.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-light tracking-wider lg:text-4xl">
                    Region:{" "}
                  </span>
                  <span className="text-3xl font-medium  tracking-widest sm:text-4xl lg:text-4xl">
                    {currentCountry?.region}
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-light tracking-wider lg:text-4xl">
                    Sub Region:{" "}
                  </span>
                  <span className="text-3xl font-medium  tracking-widest sm:text-4xl lg:text-4xl">
                    {currentCountry?.subregion}
                  </span>
                </div>
                <p className="mb-12 text-3xl font-light  tracking-wider transition-transform lg:text-4xl">
                  <span className="text-3xl font-light tracking-wider lg:text-4xl">
                    Capital:{" "}
                  </span>
                  {!currentCountry?.currencies ? (
                    <span className="text-3xl font-medium tracking-widest sm:text-4xl lg:text-4xl">
                      N/A
                    </span>
                  ) : (
                    <span className="text-3xl font-medium tracking-widest sm:text-4xl lg:text-4xl">
                      {currentCountry?.capital}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex w-full flex-col gap-4">
                <div>
                  <span className="text-3xl font-light tracking-wider lg:text-4xl">
                    Top Level Domain:{" "}
                  </span>
                  <span className="text-3xl font-medium tracking-widest sm:text-4xl lg:text-4xl">
                    {currentCountry?.topLevelDomain}
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-light tracking-wider lg:text-4xl">
                    Currencies:{" "}
                  </span>
                  {!currentCountry?.currencies && (
                    <span className="text-3xl font-medium tracking-widest sm:text-4xl lg:text-4xl">
                      N/A
                    </span>
                  )}
                  {currentCountry?.currencies?.map((currency, index) => (
                    <span
                      className="text-3xl font-medium tracking-widest sm:text-4xl lg:text-4xl"
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
                <p className="mb-12 text-3xl font-light tracking-wider transition-transform lg:text-4xl">
                  <span className="text-3xl font-light tracking-wider lg:text-4xl">
                    Languages:{" "}
                  </span>
                  {currentCountry?.languages?.map((currency, index) => (
                    <span
                      className="text-3xl font-light  font-medium tracking-wider tracking-widest sm:text-4xl lg:text-4xl"
                      key={index}
                    >
                      {currency.name}
                      {currentCountry?.languages &&
                      index !== currentCountry.languages.length - 1
                        ? ", "
                        : ""}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="">
              <span className="text-3xl font-semibold tracking-wider lg:text-4xl">
                Border Countries:{" "}
              </span>
              {!currentCountry?.borders && (
                <span className="text-3xl font-medium tracking-widest sm:text-4xl">
                  N/A
                </span>
              )}
              <br />
              <span className="mt-4 flex w-full flex-wrap gap-6">
                {currentCountry?.borders?.map((border, index) => (
                  <button
                    key={index}
                    onClick={() => changeCountry(border)}
                    className="flex h-20 w-40 items-center justify-center rounded-lg border-2 border-black 
                    bg-transparent px-12 py-3 text-xl font-medium tracking-widest hover:bg-black hover:text-white
                    dark:border-white"
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
