export const SERVICES_MENU = [
  {
    id: "real-estate",
    label: "Real Estate",
    href: "/services/real-estate",
    description: "Buying, selling, luxury, pre-construction & assignments in Mississauga & GTA.",
    subItems: [
      { label: "Buying", href: "/services/real-estate#buying" },
      { label: "Selling", href: "/services/real-estate#selling" },
      { label: "Luxury", href: "/services/real-estate#luxury" },
      { label: "Pre-Construction", href: "/services/real-estate#pre-construction" },
      { label: "Assignments", href: "/services/real-estate#assignments" },
    ],
  },
  {
    id: "property-management",
    label: "Property Management",
    href: "/property-management",
    description: "Tenant screening, rent collection, maintenance & reporting for landlords.",
    subGroups: [
      {
        label: "Services",
        items: [
          { label: "Tenant Screening", href: "/property-management" },
          { label: "Rent Collection", href: "/property-management" },
          { label: "Maintenance", href: "/property-management" },
          { label: "Reporting", href: "/property-management" },
        ],
      },
      {
        label: "By City",
        items: [
          { label: "Toronto", href: "/property-management/toronto" },
          { label: "Mississauga", href: "/property-management/mississauga" },
          { label: "Oakville", href: "/property-management/oakville" },
          { label: "Milton", href: "/property-management/milton" },
        ],
      },
    ],
    subItems: [
      { label: "Tenant Screening", href: "/property-management" },
      { label: "Rent Collection", href: "/property-management" },
      { label: "Maintenance", href: "/property-management" },
      { label: "Reporting", href: "/property-management" },
      { label: "Toronto", href: "/property-management/toronto" },
      { label: "Mississauga", href: "/property-management/mississauga" },
      { label: "Oakville", href: "/property-management/oakville" },
      { label: "Milton", href: "/property-management/milton" },
    ],
  },
  {
    id: "investments",
    label: "Investments",
    href: "/services/investments",
    description: "Off-market deals, JV opportunities & portfolio strategy for investors.",
    subItems: [
      { label: "Off-Market Deals", href: "/services/investments#off-market-deals" },
      { label: "JV Opportunities", href: "/services/investments#jv-opportunities" },
      { label: "Portfolio Strategy", href: "/services/investments#portfolio-strategy" },
    ],
  },
  {
    id: "developments",
    label: "Developments",
    href: "/services/developments",
    description: "Current projects, pipeline & strategic partnerships in the GTA.",
    subItems: [
      { label: "Current Projects", href: "/services/developments#current-projects" },
      { label: "Upcoming Pipeline", href: "/services/developments#upcoming-pipeline" },
      { label: "Vision", href: "/services/developments#vision" },
      { label: "Partnership Inquiries", href: "/services/developments#partnership-inquiries" },
    ],
  },
] as const;
