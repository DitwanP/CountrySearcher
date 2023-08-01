import { Translation, Demonym, Currency } from "./Types";

export interface Country {
  name: Name;
  tld?: string[];
  cca2: string;
  cca3: string;
  ccn3?: string;
  cioc?: string;
  independent?: boolean;
  status: string;
  unMember: boolean;
  currencies?: Currencies;
  idd: Idd | {};
  capital?: string[];
  altSpellings: string[];
  region: string;
  subregion?: string;
  languages?: Languages | {};
  translations: Translations;
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms?: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  fifa?: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags?: Flags;
  coatOfArms: Flags | {};
  startOfWeek: string;
  capitalInfo: CapitalInfo | {};
  borders?: string[];
  postalCode?: PostalCode;
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

export interface NativeNames {
  [key: string]: { official: string; common: string } | undefined;
}

export interface Name {
  common: string;
  official: string;
  nativeName?: NativeNames | undefined;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface Car {
  side: string;
  signs?: string[];
}
export interface PostalCode {
  format: string;
  regex?: string;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Languages {
  [key: string]: string;
}

export interface Maps {
  [key: string]: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Translations {
  [key: string]: Translation | undefined;
}

export interface Demonyms {
  [key: string]: Demonym | undefined;
}

export interface Currencies {
  [key: string]: Currency;
}
