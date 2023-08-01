import { useEffect, useState } from "react";
import { Country, DialogProps } from "../utilities/Interfaces";
import { countryDictionary } from "../utilities/functions/getCountries";

const DetailsDialog = ({ isOpen, setDialogInfo, country }: DialogProps) => {
  const [currentCountry, setCurrentCountry] = useState<Country>(
    country as Country
  );
  const [prevCountries, setPrevCountries] = useState<string[]>([]);

  const changeCountry = async (countryCode: string) => {
    setPrevCountries((prev) => [...prev, currentCountry?.cca3 as string]);
    let nextCountry = countryDictionary.get(countryCode);
    setCurrentCountry(nextCountry as Country);
  };

  const goBack = async () => {
    const prevCountryCode = prevCountries.pop();

    if (prevCountryCode) {
      let prevCountry = countryDictionary.get(prevCountryCode);
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
    <dialog id="details-dialog" open={isOpen}>
      <div className="fixed left-0 top-0 z-40 flex h-full w-full items-center justify-center overflow-y-auto bg-light-mode-bg pt-[80px] dark:bg-dark-mode-bg xl:overflow-y-hidden xl:bg-black xl:bg-opacity-80 xl:backdrop-blur-lg xl:dark:bg-black xl:dark:bg-opacity-50 xl:dark:backdrop-blur-lg">
        <div
          className="h-full w-full max-w-screen-xl items-center justify-center px-14
          text-black dark:text-white xl:h-fit xl:w-3/5 xl:rounded-md"
        >
          <div className="flex h-full w-full flex-col gap-8 pt-8">
            <div>
              <button
                onClick={goBack}
                className="flex h-16 items-center justify-center gap-4 rounded-lg border-2 border-black 
                bg-light-mode-bg px-6 shadow-xl transition-colors duration-150 ease-linear hover:bg-black hover:text-white dark:border-white dark:bg-dark-mode-bg 
                dark:hover:border-black dark:hover:bg-white dark:hover:text-black"
              >
                <span className="text-[24px]">&#8592;</span>
              </button>
            </div>
            <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-14 rounded-md">
              <div className="flex h-full w-full flex-col gap-10 rounded-md dark:bg-dark-mode-bg xl:bg-light-mode-bg">
                <img
                  src={currentCountry?.flags?.svg}
                  alt={
                    currentCountry?.flags?.alt ||
                    `${currentCountry?.name.common}'s flag`
                  }
                  className="custom-shadow rounded-t-md object-contain transition-transform duration-150 ease-out xl:h-[400px] xl:w-full xl:object-cover 2xl:h-[500px]"
                />
                <div className="flex h-full flex-col justify-start gap-3 xl:px-10">
                  <div>
                    <p className="mb-5 text-4xl font-semibold tracking-wide sm:text-4.5xl lg:text-5xl">
                      {currentCountry?.name.common
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")}
                    </p>
                  </div>
                  <div className="flex w-full flex-col xl:flex-row">
                    <div className="flex w-full flex-col gap-4">
                      <div>
                        <span className="text-3xl font-medium lg:text-4xl">
                          Native Name:{" "}
                        </span>
                        <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl">
                          {currentCountry?.name.nativeName
                            ? Object.values(currentCountry.name.nativeName)[0]
                                ?.official
                            : "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="text-3xl font-medium lg:text-4xl">
                          Population:{" "}
                        </span>
                        <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl">
                          {currentCountry?.population.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-3xl font-medium lg:text-4xl">
                          Region:{" "}
                        </span>
                        <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl">
                          {currentCountry?.region}
                        </span>
                      </div>
                      <div>
                        <span className="text-3xl font-medium lg:text-4xl">
                          Sub Region:{" "}
                        </span>
                        <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl">
                          {currentCountry?.subregion}
                        </span>
                      </div>
                      <div className="mb-12">
                        <span className="text-3xl lg:text-4xl">Capital: </span>
                        {!currentCountry?.capital ? (
                          <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl">
                            N/A
                          </span>
                        ) : (
                          <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl">
                            {currentCountry?.capital}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-4">
                      <div>
                        <span className="text-3xl font-medium lg:text-4xl">
                          Top Level Domain:{" "}
                        </span>
                        <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl">
                          {currentCountry?.tld ? currentCountry.tld[0] : "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="text-3xl font-medium lg:text-4xl">
                          Currencies:{" "}
                        </span>
                        {!currentCountry?.currencies && (
                          <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl">
                            N/A
                          </span>
                        )}
                        {currentCountry?.currencies &&
                          Object.keys(currentCountry.currencies).length !== 0 &&
                          Object.keys(currentCountry.currencies).map(
                            (currency, index) => (
                              <span
                                className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl"
                                key={index}
                              >
                                {currentCountry?.currencies?.[currency]?.name}
                                {currentCountry?.currencies?.[currency]?.symbol
                                  ? ` (${currentCountry?.currencies?.[currency]?.symbol})`
                                  : ""}
                                {currentCountry?.currencies &&
                                index !==
                                  Object.keys(currentCountry.currencies)
                                    .length -
                                    1
                                  ? ", "
                                  : ""}
                              </span>
                            )
                          )}
                      </div>
                      <div>
                        <span className="text-3xl font-medium lg:text-4xl">
                          Languages:{" "}
                        </span>
                        {currentCountry?.languages &&
                          Object.keys(currentCountry.languages).length !== 0 &&
                          Object.keys(currentCountry.languages).map(
                            (language, index) => (
                              <span
                                className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl"
                                key={index}
                              >
                                {
                                  // @ts-ignore
                                  currentCountry?.languages?.[language]
                                }
                                {currentCountry?.languages &&
                                index !==
                                  Object.keys(currentCountry.languages).length -
                                    1
                                  ? ", "
                                  : ""}
                              </span>
                            )
                          )}
                      </div>
                      <div className="mb-12">
                        <span className="text-3xl font-medium lg:text-4xl">
                          Timezones:{" "}
                        </span>
                        {!currentCountry?.timezones && (
                          <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl">
                            N/A
                          </span>
                        )}
                        {currentCountry?.timezones?.map((currency, index) => (
                          <span
                            className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl"
                            key={index}
                          >
                            {currency}
                            {currentCountry?.timezones &&
                            index !== currentCountry.timezones.length - 1
                              ? ", "
                              : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pb-12">
                    <span className="text-3xl font-medium lg:text-4xl">
                      Border Countries:{" "}
                    </span>
                    {!currentCountry?.borders && (
                      <span className="text-3xl font-extralight tracking-widest sm:text-4xl">
                        N/A
                      </span>
                    )}
                    <br />
                    <span className="mt-6 flex w-full flex-wrap gap-6">
                      {currentCountry?.borders?.map((border, index) => (
                        <button
                          key={index}
                          onClick={() => changeCountry(border)}
                          className="flex h-16 items-center justify-center rounded-lg border-2 border-black bg-light-mode-bg
                          bg-transparent px-12 py-3 text-2xl font-medium tracking-widest shadow-xl transition-colors duration-150
                          ease-linear hover:bg-black hover:text-white dark:border-white dark:bg-dark-mode-bg
                          dark:hover:border-black dark:hover:bg-white dark:hover:text-black"
                        >
                          {countryDictionary.get(border)?.name.common}
                        </button>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default DetailsDialog;
