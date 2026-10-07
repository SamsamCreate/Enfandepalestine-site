export interface AboutItem {
  slug: string;
  title: string;
  paragraphs: string[];
  link?: { label: string; href: string };
  image?: string;
}

export const ABOUT_INTRO =
  "Enfan de Palestine est un projet humanitaire visant à aider les enfants palestiniens par le biais de vêtements. Les produits que nous vendons permettent en premier lieu de soutenir financièrement des ONG humanitaires.";

export const ABOUT_SECTION_LABEL = "NOTRE PROJET";

export const ABOUT_ITEMS: AboutItem[] = [
  {
    slug: "notre-but",
    title: "Notre but",
    paragraphs: [
      "À travers ses collections, Enfan de Palestine utilise le vêtement pour raconter et transmettre la Palestine, son histoire, sa culture et ses symboles.",
      "Les bénéfices des ventes sont reversés à des associations partenaires qui agissent directement sur le terrain, afin de financer des actions en faveur du peuple palestinien.",
    ],
  },
  {
    slug: "notre-histoire",
    title: "Notre histoire",
    paragraphs: [
      "Enfan de Palestine naît en 2022 à l'initiative de Youcef Kafoufi, alors âgé de 17 ans. D'origine palestinienne par sa mère et passionné par le textile, il imagine un projet capable de réunir création, transmission et engagement pour la Palestine.",
      "Les premiers t-shirts sont lancés avec peu de moyens et trouvent rapidement leur public. Autour du projet se construit progressivement une communauté, puis une équipe, donnant naissance à de nouvelles collections, des collaborations et des rencontres à travers plusieurs pop-ups.",
      "Depuis ses débuts, Enfan de Palestine a grandi sans perdre son objectif initial : utiliser la création pour soutenir le peuple palestinien. Plus de 228 000 € ont aujourd'hui été reversés à des organisations agissant sur le terrain.",
    ],
  },
  {
    slug: "notre-direction-artistique",
    title: "Notre direction artistique",
    paragraphs: [
      "Notre direction artistique met l'accent sur les fautes d'orthographe et les dessins négligés, afin d'évoquer l'innocence des enfants. Il s'agit donc également d'un projet de sensibilisation.",
    ],
  },
  {
    slug: "nos-donations",
    title: "Nos donations",
    paragraphs: [
      "Plus de 228 000 € ont aujourd'hui été reversés à des organisations agissant sur le terrain.",
    ],
    link: { label: "Voir l'historique des donations →", href: "/donations" },
  },
];
