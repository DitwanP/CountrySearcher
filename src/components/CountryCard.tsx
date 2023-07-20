import { Country } from "../utilities/Interfaces";

interface CountryCardProps {
  countryInfo: Country;
  lastCountryRef?: (element: any) => void;
}

const CountryCard = (props: CountryCardProps) => {
  const { countryInfo, lastCountryRef } = props;

  return (
    <div
      className="flex h-[420px] w-full flex-col rounded-lg bg-white shadow-md"
      ref={lastCountryRef}
    >
      <img
        src={countryInfo.flag}
        alt={`${countryInfo.name}'s flag`}
        className="h-80 w-full rounded-t-lg object-cover drop-shadow-md"
      />
      <div className="flex w-full flex-grow flex-col justify-center gap-6 px-8">
        <span className="text-4.5xl font-bold leading-tight tracking-wider text-very-dark-blueT">
          {countryInfo.name}
        </span>
        <div className="flex flex-col gap-4 text-very-dark-blueT">
          <p className="text-3xl font-semibold">
            Population:{" "}
            <span className="text-3xl font-normal text-dark-blue">
              {countryInfo.population.toLocaleString()}
            </span>
          </p>
          <p className="text-3xl font-semibold">
            Region:{" "}
            <span className="text-3xl font-normal text-dark-blue">
              {countryInfo.region}
            </span>
          </p>
          <p className="text-3xl font-semibold">
            Capital:{" "}
            <span className="text-3xl font-normal text-dark-blue">
              {countryInfo.capital || "N/A"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
