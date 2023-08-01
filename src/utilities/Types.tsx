export type Currency = {
  name: string;
  symbol?: string;
};

export type Translation = {
  official: string;
  common: string;
};

export type Demonym = {
  f: string;
  m: string;
};

export type FilterSet = Set<string>;
