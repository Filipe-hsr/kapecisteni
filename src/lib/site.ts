export const site = {
  name: "KAPE čištění s.r.o.",
  shortName: "KAPE",
  tagline: "Nic není tak vysoké, abychom tam nedosáhli.",
  title: "KAPE čištění | Výškové mytí oken, fasád a opláštění hal ze země",
  description:
    "Myjeme okna, fasády a opláštění průmyslových budov ze země, do 18 m bez vysokozdvižné techniky. PuraQleen, SpaceVac a horkovodní vysokotlak Kränzle + Oertzen.",
  url: "https://www.kapecisteni.cz",
  email: "info@kapecisteni.cz",
  ico: "06930077",
  foundingYear: 2018,
  address: {
    street: "Skupova 569/19",
    city: "Teplice-Trnovany",
    postalCode: "415 01",
    country: "CZ",
    countryName: "Česko",
  },
  geo: {
    latitude: 50.6508,
    longitude: 13.8547,
  },
  social: {
    facebook: "https://www.facebook.com/kapecisteni/",
    instagram: "https://www.instagram.com/kape_cisteni/",
    youtube: "https://www.youtube.com/channel/UCr339rxe3vyLsTf5jvct3AA",
  },
  googleReviews:
    "https://www.google.com/maps/search/?api=1&query=KAPE%20%C4%8Di%C5%A1t%C4%9Bn%C3%AD%20s.r.o.%20Teplice&query_place_id=ChIJkYOdw2mPCUcRDGE-bnGdJAs",
  people: [
    {
      name: "Kamil Jůzl",
      role: "Jednatel",
      phone: "+420 777 150 909",
      tel: "+420777150909",
    },
    {
      name: "Petr Jileček",
      role: "Jednatel",
      phone: "+420 732 686 010",
      tel: "+420732686010",
    },
    {
      name: "Martina Pokorná",
      role: "Vedoucí personálního oddělení",
      phone: "+420 727 868 585",
      tel: "+420727868585",
    },
  ],
  primaryPhone: {
    display: "+420 732 686 010",
    tel: "+420732686010",
  },
} as const;

export const nav = [
  { href: "#technologie", label: "Technologie" },
  { href: "#tym", label: "Kdo jsme" },
  { href: "#sluzby", label: "Co čistíme" },
  { href: "#reference", label: "Reference" },
  { href: "#recenze", label: "Recenze" },
] as const;
