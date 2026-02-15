/**
 * Property management hub cities for local SEO.
 * Used for /property-management hub and city pages.
 */
export const propertyManagementCities = [
  {
    slug: "mississauga",
    name: "Mississauga",
    region: "Ontario",
    neighborhoods: ["Square One", "Port Credit", "Erin Mills", "Meadowvale", "Clarkson", "Cooksville", "City Centre"],
    shortDesc: "Professional property management in Ontario's third-largest city. From condos in Square One to single-family homes in Port Credit, we serve landlords and investors across Mississauga.",
  },
  {
    slug: "toronto",
    name: "Toronto",
    region: "Ontario",
    neighborhoods: ["Downtown", "North York", "Scarborough", "Etobicoke", "Midtown"],
    shortDesc: "Investor-focused property management across Canada's largest city. We serve landlords in Downtown, North York, Scarborough, Etobicoke, and Midtown with disciplined operations and transparent reporting.",
  },
  {
    slug: "milton",
    name: "Milton",
    region: "Ontario",
    neighborhoods: ["Beaty", "Clarke", "Derry Green", "Timberlea"],
    shortDesc: "Full-service property management for Milton landlords. We handle leasing, maintenance, rent collection, and compliance across Beaty, Clarke, Derry Green, Timberlea, and surrounding areas.",
  },
  {
    slug: "oakville",
    name: "Oakville",
    region: "Ontario",
    neighborhoods: ["Bronte", "Glen Abbey", "River Oaks", "Kerr Village"],
    shortDesc: "Professional rental property management in Oakville. Tenant placement, rent collection, maintenance coordination, and transparent reporting for landlords in Bronte, Glen Abbey, River Oaks, and Kerr Village.",
  },
] as const;

export type PropertyManagementCitySlug = (typeof propertyManagementCities)[number]["slug"];
