import Link from "next/link";
import { Logo } from "@/components/Logo";
import { priorityCategories } from "@/config/categories-new";
import Image from "next/image";
import { getCountryByCode, slugify } from "@/lib/url-utils";
import { headers } from "next/headers";

const DEFAULT_LOCATION_PATH = "/united-states/california/los-angeles";

const serviceLinks = priorityCategories.slice(0, 6).map((category) => ({
  label: category.title,
  href: `${DEFAULT_LOCATION_PATH}/${category.key}`,
}));

const growthLinks = priorityCategories.slice(6, 12).map((category) => ({
  label: category.title,
  href: `${DEFAULT_LOCATION_PATH}/${category.key}`,
}));

/* --------------------------------
/* --------------------------------
 * FALLBACK LOCATION
 * -------------------------------- */
function getDefaultLocation(): {
  countryName: string;
  countrySlug: string;
  stateName: string;
  stateSlug: string;
  cityName: string;
  citySlug: string;
} | null {
  const fallbackCountry = getCountryByCode("us");
  const fallbackState = fallbackCountry?.states[0];
  const fallbackCity = fallbackState?.cities[0];

  if (!fallbackCountry || !fallbackState || !fallbackCity) return null;

  return {
    countryName: fallbackCountry.name,
    countrySlug: fallbackCountry.slug,
    stateName: fallbackState.name,
    stateSlug: fallbackState.slug,
    cityName: fallbackCity.name,
    citySlug: fallbackCity.slug,
  };
}
const companyLinks = [
  { label: "Home", href: "/" },
  { label: "Compare Services", href: "/compare" },
  { label: "Blog", href: "/blog" },
  {
    label: "Email Us",
    href: "/contact",
    external: true,
  },
];

const getCitySpecificLinks = (
  cityName?: string,
  countrySlug?: string,
  stateSlug?: string
) => {
  const basePath =
    countrySlug && stateSlug
      ? `/${countrySlug}/${stateSlug}`
      : "/united-states/california";
  const citySlug = cityName
    ? cityName.toLowerCase().replace(/\s+/g, "-")
    : "los-angeles";

  return [
    {
      label: `${cityName || "Local"} Services`,
      href: `${basePath}/${citySlug}`,
    },
    {
      label: `${cityName || "Local"} SEO`,
      href: `${basePath}/${citySlug}/seo-services`,
    },
    {
      label: `${cityName || "Local"} Web Design`,
      href: `${basePath}/${citySlug}/web-design`,
    },
    {
      label: `${cityName || "Local"} Digital Marketing`,
      href: `${basePath}/${citySlug}/digital-marketing`,
    },
  ];
};

const resourceLinks = [
  { label: "SEO Playbooks", href: "/blog" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const docsLinks = [
  { label: "Docs", href: "https://docs.moydus.com", external: true },
  { label: "Choose Package", href: "https://app.moydus.com", external: true },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/moydus",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/moydus",
  },
  {
    label: "GitHub",
    href: "https://github.com/moydus",
  },
];

const renderLink = (
  link:
    | { label: string; href: string; external?: false }
    | { label: string; href: string; external: true },
  index: number
) => {
  if ("external" in link && link.external) {
    return (
      <li
        key={`${link.label}-${index}`}
        className="font-medium hover:text-primary"
      >
        <Link href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      key={`${link.label}-${index}`}
      className="font-medium hover:text-primary"
    >
      <Link href={link.href}>{link.label}</Link>
    </li>
  );
};

type Location = {
  cityName?: string;
  countryName?: string;
  stateName?: string;
};

export default function Footer({ location }: { location?: Location }) {
  return (
    <section className=" container mx-auto px-4 sm:py-20 mt-5 sm:mt-15 lg:mt-20">
      <div className="container mx-auto max-w-6xl px-4 py-5">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-7">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Link href="/" className="flex max-h-8 items-center gap-3">
                  <Logo variant="dark" />
                </Link>
              </div>
              <p className="mt-4 max-w-xs text-sm font-semibold text-muted-foreground">
                We are everywhere, including{" "}
                {location?.cityName || (
                    <span className="font-bold underline text-[#ff4d00]">
                      {getDefaultLocation()?.cityName}
                    </span>
                  ) || <span className="font-bold">your city</span>}{" "}
                - Growth playbooks, technical delivery, and analytics built for
                operators who need measurable outcomes.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">Core Services</h3>
              <ul className="space-y-4 text-muted-foreground">
                {serviceLinks.map(({ label, href }, index) => (
                  <li
                    key={`${label}-${index}`}
                    className="font-medium hover:text-primary"
                  >
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold">Specialist Playbooks</h3>
              <ul className="space-y-4 text-muted-foreground">
                {growthLinks.map(({ label, href }, index) => (
                  <li
                    key={`${label}-${index}`}
                    className="font-medium hover:text-primary"
                  >
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold">Company</h3>
              <ul className="space-y-4 text-muted-foreground">
                {companyLinks.map((link, index) => renderLink(link, index))}
              </ul>
            </div>

            {location?.cityName && (
              <div>
                <h3 className="mb-4 font-bold">{location.cityName} Services</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {getCitySpecificLinks(
                    location.cityName,
                    location.countryName,
                    location.stateName
                  ).map(({ label, href }, index) => (
                    <li
                      key={`${label}-${index}`}
                      className="font-medium hover:text-primary"
                    >
                      <Link href={href}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="mb-4 font-bold">Platform</h3>
              <ul className="space-y-4 text-muted-foreground">
                {docsLinks.map(({ label, href }, index) => (
                  <li
                    key={`${label}-${index}`}
                    className="font-medium hover:text-primary"
                  >
                    {href.startsWith("http") ? (
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {label}
                      </Link>
                    ) : (
                      <Link href={href}>{label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold">Resources</h3>
              <ul className="space-y-4 text-muted-foreground">
                {resourceLinks.map(({ label, href }, index) => (
                  <li
                    key={`${label}-${index}`}
                    className="font-medium hover:text-primary"
                  >
                    {href.startsWith("http") ? (
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {label}
                      </Link>
                    ) : (
                      <Link href={href}>{label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold">Follow Moydus</h3>
              <ul className="space-y-4 text-muted-foreground">
                {socialLinks.map(({ label, href }, index) => (
                  <li
                    key={`${label}-${index}`}
                    className="font-medium hover:text-primary"
                  >
                    <Link href={href} target="_blank" rel="noopener noreferrer">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Status Badge */}
            </div>

            <div className="mt-6">
              <Link
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-medium text-[13px] px-3 py-1 bg-gray-100 text-gray-700 border border-transparent hover:bg-gray-200 transition-colors duration-100"
              >
                <svg
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 text-green-500"
                  aria-hidden="true"
                >
                  <path
                    d="M5.00001 15.352C4.89601 15.352 4.79101 15.331 4.69001 15.285C1.84101 13.988 0.00100708 11.129 0.00100708 8C0.00100708 4.871 1.84101 2.012 4.68901 0.715004C5.06601 0.543004 5.51001 0.710004 5.68201 1.087C5.85301 1.464 5.68701 1.909 5.31001 2.08C2.99501 3.134 1.49901 5.457 1.49901 7.999C1.49901 10.541 2.99501 12.865 5.31001 13.918C5.68701 14.089 5.85301 14.534 5.68201 14.911C5.55601 15.187 5.28401 15.35 4.99901 15.35L5.00001 15.352Z"
                    fill="currentColor"
                  />
                  <path
                    d="M11 15.352C10.715 15.352 10.443 15.189 10.317 14.913C10.146 14.536 10.312 14.091 10.689 13.92C13.004 12.866 14.5 10.543 14.5 8.00101C14.5 5.45901 13.004 3.13501 10.689 2.08201C10.312 1.91101 10.146 1.46601 10.317 1.08901C10.49 0.713011 10.935 0.546011 11.31 0.717011C14.159 2.01401 15.999 4.87301 15.999 8.00201C15.999 11.131 14.158 13.99 11.31 15.287C11.209 15.333 11.104 15.354 11 15.354V15.352Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
                    fill="currentColor"
                  />
                </svg>
                All systems normal
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} Moydus. All rights reserved.</p>
            <ul className="flex gap-4  ">
              <li className="underline hover:text-primary">
                <Link
                  href="https://www.linkedin.com/company/moydus"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Work With Us
                </Link>
              </li>
              <li className="underline hover:text-primary">
                <Link href="mailto:info@moydus.com">info@moydus.com</Link>
              </li>
            </ul>
          </div>
        </footer>
        <div className="text-center text-sm text-muted-foreground">
          <Image
            src="/moydus.png"
            alt="Moydus Logo"
            width={800}
            height={800}
            className="mx-auto object-contain w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
