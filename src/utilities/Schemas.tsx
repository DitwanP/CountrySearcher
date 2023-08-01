import { z } from "zod";

export const TranslationSchema = z.object({
  official: z.string(),
  common: z.string(),
});

export const DemonymSchema = z.object({
  f: z.string(),
  m: z.string(),
});

export const CurrencySchema = z.object({
  name: z.string(),
  symbol: z.string().optional(),
});

export const NameSchema = z.object({
  common: z.string(),
  official: z.string(),
  nativeName: z
    .record(
      z.object({
        official: z.string(),
        common: z.string(),
      })
    )
    .optional(),
});

export const IddSchema = z.object({
  root: z.string(),
  suffixes: z.array(z.string()),
});

export const CarSchema = z.object({
  side: z.string(),
  signs: z.array(z.string()).optional(),
});

export const PostalCodeSchema = z.object({
  format: z.string(),
  regex: z.string().optional(),
});

export const CapitalInfoSchema = z.object({
  latlng: z.array(z.number()),
});

export const LanguagesSchema = z.record(z.string());

export const MapsSchema = z.record(z.string());

export const FlagsSchema = z.object({
  png: z.string(),
  svg: z.string(),
  alt: z.string().optional(),
});

export const CountrySchema = z.object({
  name: NameSchema,
  tld: z.array(z.string()).optional(),
  cca2: z.string(),
  cca3: z.string(),
  ccn3: z.string().optional(),
  cioc: z.string().optional(),
  independent: z.boolean().optional(),
  status: z.string(),
  unMember: z.boolean(),
  currencies: z.record(CurrencySchema).optional(),
  idd: IddSchema.or(z.object({})),
  capital: z.array(z.string()).optional(),
  altSpellings: z.array(z.string()),
  region: z.string(),
  subregion: z.string().optional(),
  languages: LanguagesSchema.or(z.object({})).optional(),
  translations: z.record(TranslationSchema),
  latlng: z.array(z.number()),
  landlocked: z.boolean(),
  area: z.number(),
  demonyms: z.record(DemonymSchema).optional(),
  flag: z.string(),
  maps: MapsSchema,
  population: z.number(),
  fifa: z.string().optional(),
  car: CarSchema,
  timezones: z.array(z.string()),
  continents: z.array(z.string()),
  flags: FlagsSchema.optional(),
  coatOfArms: FlagsSchema.or(z.object({})),
  startOfWeek: z.string(),
  capitalInfo: CapitalInfoSchema.or(z.object({})),
  borders: z.array(z.string()).optional(),
  postalCode: PostalCodeSchema.optional(),
});

export const CountryListSchema = z.array(CountrySchema);

export interface DialogStateInterface {
  isOpen: boolean;
  country: z.infer<typeof CountrySchema> | undefined;
}

export interface DialogProps {
  country: z.infer<typeof CountrySchema> | undefined;
  isOpen: boolean;
  setDialogInfo: React.Dispatch<React.SetStateAction<DialogStateInterface>>;
}
