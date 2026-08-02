// Video Game Palooza, Inc. — primary navigation.
// The parent 501(c)(3); Hope Training Academy and EverVerify are its d/b/a programs
// (linked out to their own sites). The Retro Charity Arcade is a 10-year flagship program.
export const nav = [
  {
    label: 'What We Do',
    href: '/programs/',
    children: [
      { label: 'Hope Training Academy ↗', href: 'https://hopetrainingacademy.org/', external: true },
      { label: 'EverVerify ↗', href: 'https://eververify.org/', external: true },
      { label: 'Retro Charity Arcade', href: '/retro-charity-arcade/' },
      { label: 'STEM & Youth Programs', href: '/programs/' },
    ],
  },
  { label: 'Retro Charity Arcade', href: '/retro-charity-arcade/' },
  { label: 'Impact', href: '/impact/' },
  {
    label: 'Get Involved',
    href: '/get-involved/',
    children: [
      { label: 'Donate', href: '/get-involved/#donate' },
      { label: 'Volunteer', href: '/get-involved/#volunteer' },
      { label: 'Partner With Us', href: '/get-involved/#partner' },
    ],
  },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Donate', href: '/get-involved/#donate', cta: true },
];
