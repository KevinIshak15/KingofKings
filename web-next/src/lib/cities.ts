/**
 * GTA and cottage country cities for property management local SEO pages.
 * Each city gets a pre-rendered page at /management/[city]
 */
export const cities = [
  { slug: "toronto", name: "Toronto", region: "Greater Toronto Area" },
  { slug: "mississauga", name: "Mississauga", region: "Greater Toronto Area" },
  { slug: "brampton", name: "Brampton", region: "Greater Toronto Area" },
  { slug: "markham", name: "Markham", region: "Greater Toronto Area" },
  { slug: "vaughan", name: "Vaughan", region: "Greater Toronto Area" },
  { slug: "richmond-hill", name: "Richmond Hill", region: "Greater Toronto Area" },
  { slug: "oakville", name: "Oakville", region: "Greater Toronto Area" },
  { slug: "burlington", name: "Burlington", region: "Greater Toronto Area" },
  { slug: "milton", name: "Milton", region: "Greater Toronto Area" },
  { slug: "pickering", name: "Pickering", region: "Durham Region" },
  { slug: "ajax", name: "Ajax", region: "Durham Region" },
  { slug: "whitby", name: "Whitby", region: "Durham Region" },
  { slug: "oshawa", name: "Oshawa", region: "Durham Region" },
  { slug: "newmarket", name: "Newmarket", region: "York Region" },
  { slug: "aurora", name: "Aurora", region: "York Region" },
  { slug: "georgina", name: "Georgina", region: "Cottage Country" },
  { slug: "muskoka", name: "Muskoka", region: "Cottage Country" },
  { slug: "kawartha-lakes", name: "Kawartha Lakes", region: "Cottage Country" },
] as const;

export type CitySlug = (typeof cities)[number]["slug"];
