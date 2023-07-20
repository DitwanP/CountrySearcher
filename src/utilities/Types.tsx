export type Currency = {
  code: string;
  name: string;
  symbol: string;
};

export type Language = {
  iso639_1?: string | undefined;
  iso639_2?: string | undefined;
  name: string;
  nativeName?: string;
};

export type Translations = {
  br: string;
  pt: string;
  nl: string;
  hr: string;
  fa?: string;
  de: string;
  es: string;
  fr: string;
  ja: string;
  it: string;
  hu: string;
};

export type RegionalBloc = {
  acronym?: string;
  name: string;
  otherNames?: string[];
};

export type FilterSet = Set<string>;
