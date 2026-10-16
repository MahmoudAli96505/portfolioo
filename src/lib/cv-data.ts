import type { Version } from "./settings.functions";

export const EMAIL = "Mahmoud.ali01245@gmail.com";

export const PROFILES: Record<
  Version,
  { label: string; flag: string; location: string; phone: string; wa: string; cv: string; extras: { k: string; v: string }[] }
> = {
  uae: {
    label: "UAE",
    flag: "🇦🇪",
    location: "Ajman - United Arab Emirates",
    phone: "+971 56 541 0751",
    wa: "https://wa.me/971565410751",
    cv: "/downloads/Mahmoud_Ali_CV_UAE.pdf",
    extras: [{ k: "UAE Residency", v: "Visa valid until 18-12-2026" }],
  },
  egypt: {
    label: "Egypt",
    flag: "🇪🇬",
    location: "Alexandria - Egypt",
    phone: "+20 109 783 1301",
    wa: "https://wa.me/201097831301",
    cv: "/downloads/Mahmoud_Ali_CV_Egypt.pdf",
    extras: [
      { k: "Driving License", v: "Valid" },
      { k: "Military Service", v: "Exempt" },
    ],
  },
};

export const EXPERIENCE = [
  { role: "Cashier", company: "Elgendy Restaurant", place: "Ajman, UAE", period: "01/2025 – 09/2026", points: ["Handled all dine-in customer payments with accuracy.", "Answered calls and took orders promptly and correctly.", "Managed multiple front-of-house duties in a fast-paced environment.", "Delivered a smooth ordering and payment experience."] },
  { role: "Data Entry", company: "Smart Digital", period: "06/2023 – 12/2023", points: ["Handled large volumes of data with accuracy, following company standards.", "Contributed to database maintenance and regular quality checks."] },
  { role: "Data Entry", company: "Al Hamd Group", period: "05/2022 – 05/2023", points: ["Executed data entry tasks with precision, keeping records accurate.", "Assisted in database management and verified data consistency."] },
  { role: "Manager", company: "Computer Store", period: "08/2021 – 04/2022", points: ["Oversaw sales, repairs and customer service, improving efficiency.", "Managed inventory and vendor relations for timely restocking.", "Performed hardware repairs, software installs and tech support."] },
  { role: "Supervisor", company: "Wegzo Restaurant", period: "12/2019 – 05/2021", points: ["Supervised staff and daily operations.", "Resolved customer inquiries and complaints."] },
  { role: "Head Cashier", company: "Shawermizer Restaurant", period: "11/2018 – 10/2019", points: ["Managed daily cash transactions accurately.", "Trained junior cashiers on financial protocols."] },
  { role: "Sales Representative", company: "Nestlé Waters", period: "05/2017 – 08/2018", points: ["Promoted products and hit regional sales targets.", "Maintained strong customer relationships."] },
];

export const SKILLS = [
  { name: "Fast Typing (100+ WPM)", level: 98 },
  { name: "Data Entry & Accuracy", level: 97 },
  { name: "Microsoft Office", level: 92 },
  { name: "Database Management", level: 85 },
  { name: "HTML & CSS", level: 78 },
];
