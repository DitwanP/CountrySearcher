import { Currency, Language, Translations, RegionalBloc } from "./Types";

export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital?: string;
  altSpellings?: string[];
  subregion: string;
  region: string;
  population: number;
  latlng?: number[];
  demonym: string;
  area?: number;
  timezones: string[];
  borders?: string[];
  nativeName: string;
  numericCode: string;
  flags: {
    svg: string;
    png: string;
  };
  currencies?: Currency[];
  languages: Language[];
  translations: Translations;
  flag: string;
  regionalBlocs?: RegionalBloc[];
  cioc?: string;
  independent: boolean;
}

export interface DialogStateInterface {
  isOpen: boolean;
  country: Country | undefined;
}

export interface DialogProps {
  country: Country | undefined;
  isOpen: boolean;
  setDialogInfo: React.Dispatch<React.SetStateAction<DialogStateInterface>>;
}
