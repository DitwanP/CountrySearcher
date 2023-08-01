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
    <dialog
      id="details-dialog"
      open={isOpen}
      className="fixed left-0 top-0 z-40 flex h-full w-full justify-center
      overflow-y-scroll bg-light-mode-bg px-14 pt-[80px] text-black 
      transition-all dark:bg-dark-mode-bg dark:text-white"
    >
      <div className="relative flex h-full w-full max-w-screen-2xl flex-col gap-16 pt-20">
        <div className="">
          <button
            onClick={goBack}
            className="flex h-16 items-center justify-center gap-4 rounded-lg 
            border-2 border-black bg-transparent px-6 shadow-xl transition-colors 
            duration-150 ease-linear hover:bg-black hover:text-white dark:border-white 
            dark:hover:bg-black dark:hover:text-white"
          >
            <span className="text-[24px]">&#8592;</span>
          </button>
        </div>
        <div className="mx-auto flex flex-col items-center justify-center gap-14 rounded-md md:gap-16">
          <div className="flex flex-col gap-16 pb-20">
            <img
              src={currentCountry?.flags?.svg}
              alt={
                currentCountry?.flags?.alt ||
                `${currentCountry?.name.common}'s flag`
              }
              className="custom-shadow w-[400px] rounded-md
                object-contain transition-transform duration-150 ease-out"
            />
            <div className="flex flex-col justify-start gap-3 ">
              <div>
                <p className="mb-8 text-4xl font-normal tracking-wide sm:text-4.5xl lg:text-7xl">
                  {currentCountry?.name.common
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toUpperCase()}
                </p>
              </div>
              <div className="flex h-full w-full flex-col">
                <div className="flex w-full flex-col gap-4">
                  <div>
                    <span className="text-3xl font-medium lg:text-4xl xl:text-5xl">
                      Native Name:{" "}
                    </span>
                    <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl xl:text-5xl">
                      {currentCountry?.name.nativeName
                        ? currentCountry.name.nativeName[0]?.official
                        : "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-3xl font-medium lg:text-4xl xl:text-5xl">
                      Population:{" "}
                    </span>
                    <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl xl:text-5xl">
                      {currentCountry?.population.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-3xl font-medium lg:text-4xl xl:text-5xl">
                      Region:{" "}
                    </span>
                    <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl xl:text-5xl">
                      {currentCountry?.region}
                    </span>
                  </div>
                  <div>
                    <span className="text-3xl font-medium lg:text-4xl xl:text-5xl">
                      Sub Region:{" "}
                    </span>
                    <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl xl:text-5xl">
                      {currentCountry?.subregion}
                    </span>
                  </div>
                  <div className="mb-12">
                    <span className="text-3xl lg:text-4xl xl:text-5xl">
                      Capital:{" "}
                    </span>
                    {!currentCountry?.capital ? (
                      <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl xl:text-5xl">
                        N/A
                      </span>
                    ) : (
                      <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl xl:text-5xl">
                        {currentCountry?.capital}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex w-full flex-col gap-4">
                  <div>
                    <span className="text-3xl font-medium lg:text-4xl xl:text-5xl">
                      Top Level Domain:{" "}
                    </span>
                    <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl xl:text-5xl">
                      {currentCountry?.tld ? currentCountry.tld[0] : "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-3xl font-medium lg:text-4xl xl:text-5xl">
                      Currencies:{" "}
                    </span>
                    {!currentCountry?.currencies && (
                      <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl xl:text-5xl">
                        N/A
                      </span>
                    )}
                    {currentCountry?.currencies &&
                      Object.keys(currentCountry.currencies).length !== 0 &&
                      Object.keys(currentCountry.currencies).map(
                        (currency, index) => (
                          <span
                            className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl xl:text-5xl"
                            key={index}
                          >
                            {currentCountry?.currencies?.[currency]?.name}
                            {currentCountry?.currencies?.[currency]?.symbol
                              ? ` (${currentCountry?.currencies?.[currency]?.symbol})`
                              : ""}
                            {currentCountry?.currencies &&
                            index !==
                              Object.keys(currentCountry.currencies).length - 1
                              ? ", "
                              : ""}
                          </span>
                        )
                      )}
                  </div>
                  {/* <div>
                    <span className="text-3xl font-medium lg:text-4xl xl:text-5xl">
                      Languages:{" "}
                    </span>
                    {currentCountry?.languages?.map((currency, index) => (
                      <span
                        className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl xl:text-5xl"
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
                  <div>
                    <span className="text-3xl font-medium lg:text-4xl xl:text-5xl">
                      Calling Codes:{" "}
                    </span>
                    {!currentCountry?.callingCodes && (
                      <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl xl:text-5xl">
                        N/A
                      </span>
                    )}
                    {currentCountry?.callingCodes?.map((currency, index) => (
                      <span
                        className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl xl:text-5xl"
                        key={index}
                      >
                        {`(${currency})`}
                        {currentCountry?.callingCodes &&
                        index !== currentCountry.callingCodes.length - 1
                          ? ", "
                          : ""}
                      </span>
                    ))}
                  </div> */}
                  <div className="mb-12">
                    <span className="text-3xl font-medium lg:text-4xl xl:text-5xl">
                      Timezones:{" "}
                    </span>
                    {!currentCountry?.timezones && (
                      <span className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl xl:text-5xl">
                        N/A
                      </span>
                    )}
                    {currentCountry?.timezones?.map((currency, index) => (
                      <span
                        className="text-3xl font-extralight tracking-normal sm:text-4xl lg:text-4xl xl:text-5xl"
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
              <div className="">
                <span className="text-3xl font-medium lg:text-4xl xl:text-5xl">
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
                      className="flex h-16 w-40 items-center justify-center rounded-lg border-2 border-black 
                      bg-transparent px-12 py-3 text-2xl font-medium tracking-widest shadow-xl transition-colors
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
      </div>
    </dialog>
  );
};

export default DetailsDialog;
