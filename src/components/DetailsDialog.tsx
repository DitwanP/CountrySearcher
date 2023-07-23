import { useEffect, useState } from "react";
import { Country, DialogProps } from "../utilities/Interfaces";
import LeftArrow from "../assets/images/left-arrow.svg";
import getCountryFromCode from "../utilities/functions/getCountriesFromCode";

const DetailsDialog = ({ isOpen, setDialogInfo, country }: DialogProps) => {
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
    console.log("In dialog!!");
    document.body.setAttribute("class", "modal-open");
  }, [isOpen]);

  return (
    <dialog
      id="details-dialog"
      open={isOpen}
      className="fixed top-[95px] z-20 mb-24 h-[calc(100dvh-95px)] w-full 
    bg-gray-200 transition-all"
    >
      <div
        className="flex h-full w-full flex-col items-center justify-start 
        overflow-x-hidden overflow-y-scroll px-10 pb-20 pt-16"
      >
        <div className="w-full">
          <button
            onClick={goBack}
            className="mb-16 flex h-20 items-center justify-start gap-4 rounded-md
            bg-white px-10 text-white shadow-xl hover:bg-gray-200"
          >
            <img src={LeftArrow} alt="Left Arrow Icon" className="w-6" />
            <span className="text-[14px] text-very-dark-blueT">Back</span>
          </button>
        </div>
        <img
          src={currentCountry?.flag}
          alt={`${currentCountry?.name}'s flag`}
          className="fade-in mb-16 h-[250px] w-full rounded-md object-cover shadow-xl
          transition-transform duration-500 ease-out xl:group-hover:scale-125"
        />
        <div className="flex w-full flex-col justify-start">
          <p className="mb-8 text-4.5xl font-bold text-very-dark-blueT">
            {currentCountry?.name}
          </p>
          <p className="mb-4 text-[16px] font-semibold transition-transform">
            Native Name:{" "}
            <span className="text-[16px] font-normal text-dark-blue">
              {currentCountry?.nativeName}
            </span>
          </p>
          <p className="mb-4 text-[16px] font-semibold transition-transform">
            Population:{" "}
            <span className="text-[16px] font-normal text-dark-blue">
              {currentCountry?.population.toLocaleString()}
            </span>
          </p>
          <p className="mb-4 text-[16px] font-semibold transition-transform">
            Region:{" "}
            <span className="text-[16px] font-normal text-dark-blue">
              {currentCountry?.region}
            </span>
          </p>
          <p className="mb-4 text-[16px] font-semibold transition-transform">
            Sub Region:{" "}
            <span className="text-[16px] font-normal text-dark-blue">
              {currentCountry?.subregion}
            </span>
          </p>
          <p className="mb-12 text-[16px] font-semibold transition-transform">
            Capital:{" "}
            {!currentCountry?.currencies ? (
              <span className="text-[16px] font-normal text-dark-blue">
                N/A
              </span>
            ) : (
              <span className="text-[16px] font-normal text-dark-blue">
                {currentCountry?.capital}
              </span>
            )}
          </p>
          <p className="mb-4 text-[16px] font-semibold transition-transform">
            Top Level Domain:{" "}
            <span className="text-[16px] font-normal text-dark-blue">
              {currentCountry?.topLevelDomain}
            </span>
          </p>
          <p className="mb-4 text-[16px] font-semibold transition-transform">
            Currencies:{" "}
            {!currentCountry?.currencies && (
              <span className="text-[16px] font-normal text-dark-blue">
                N/A
              </span>
            )}
            {currentCountry?.currencies?.map((currency, index) => (
              <span
                className="text-[16px] font-normal text-dark-blue"
                key={index}
              >
                {currency.name}
                {currentCountry?.currencies &&
                index !== currentCountry.currencies.length - 1
                  ? ", "
                  : ""}
              </span>
            ))}
          </p>
          <p className="mb-12 text-[16px] font-semibold transition-transform">
            Languages:{" "}
            {currentCountry?.languages?.map((currency, index) => (
              <span
                className="text-[16px] font-normal text-dark-blue"
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
          <p className="mb-4 text-3xl font-semibold transition-transform">
            Border Countries:{" "}
            {!currentCountry?.borders && (
              <span className="text-[16px] font-normal text-dark-blue">
                N/A
              </span>
            )}
            <br />
            <span className="mt-8 flex w-full flex-wrap gap-6">
              {currentCountry?.borders?.map((border, index) => (
                <button
                  key={index}
                  onClick={() => changeCountry(border)}
                  className="flex w-40 items-center justify-center rounded-sm bg-white 
                  px-12 py-3 text-xl font-normal text-dark-blue"
                >
                  {border}
                </button>
              ))}
            </span>
          </p>
        </div>
      </div>
    </dialog>
  );
};

export default DetailsDialog;
