import { HeroBlock } from "@/components/HeroBlock";
import { BrandQuote } from "@/components/BrandQuote";
import { ProductCard } from "@/components/ProductCard";
import { SectionNumber } from "@/components/SectionNumber";
import { SplitColorBlock } from "@/components/SplitColorBlock";
import { DonationsSection } from "@/components/DonationsSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FAQ_ITEMS } from "@/lib/data/faq";

const LATEST_PRODUCTS = [
  { name: "T-shirt - DEMAIN TOUT IRA MIEUX", price: 40, color: "#7A6666" },
  { name: "Marinière - KIDS HAVE DREAMS TOO", price: 55, color: "#3F3B38" },
  { name: "T-shirt - ON NE PART PAS", price: 40, color: "#A8998C" },
  { name: "Hoodie - TERRE ET MÉMOIRE", price: 75, color: "#C9C2B8" },
];

export default function Home() {
  return (
    <>
      <HeroBlock
        imageSrc="/images/IMGm427.jpg"
        imageAlt="Enfan de Palestine"
        href="/produits"
      />
      <BrandQuote
        parts={[
          { text: "Enfan de Palestine", emphasis: "bold" },
          {
            text: " est un projet créatif et solidaire qui utilise le vêtement comme moyen de ",
          },
          { text: "sensibiliser", emphasis: "underline" },
          { text: ", transmettre et agir en faveur du peuple palestinien." },
        ]}
      />

      <section className="border-t border-black/10 px-6 py-16 lg:px-16 lg:py-20">
        <h2 className="mb-8 font-tight text-xl font-bold leading-[1.15] tracking-[-0.02em] sm:text-2xl">
          Dernières sorties
        </h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {LATEST_PRODUCTS.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </section>

      <section className="grid gap-8 border-t border-black/10 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-24">
        <SectionNumber number="01" title="Notre but" />
        <div className="flex flex-col gap-6 text-base leading-relaxed lg:text-lg">
          <p>
            À travers ses collections, Enfan de Palestine utilise le vêtement
            pour raconter et transmettre la Palestine, son histoire, sa
            culture et ses symboles.
          </p>
          <p>
            Les bénéfices des ventes sont reversés à des associations
            partenaires qui agissent directement sur le terrain, afin de
            financer des actions en faveur du peuple palestinien.
          </p>
        </div>
      </section>

      <SplitColorBlock />

      <DonationsSection />

      <section className="grid gap-8 border-t border-black/10 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:h-full">
          <SectionNumber number="03" title="Notre Histoire" />
          <div
            className="aspect-[3/4] w-full lg:aspect-auto lg:flex-1"
            style={{ backgroundColor: "#B7ACA3" }}
          />
        </div>

        <div className="flex flex-col gap-6 text-base leading-relaxed lg:text-lg">
          <p>
            Enfan de Palestine naît en 2022 à l&apos;initiative de Youcef
            Kafoufi, alors âgé de 17 ans. D&apos;origine palestinienne par sa
            mère et passionné par le textile, il imagine un projet capable de
            réunir création, transmission et engagement pour la Palestine.
          </p>
          <p>
            Les premiers t-shirts sont lancés avec peu de moyens et trouvent
            rapidement leur public. Autour du projet se construit
            progressivement une communauté, puis une équipe, donnant
            naissance à de nouvelles collections, des collaborations et des
            rencontres à travers plusieurs pop-ups.
          </p>
          <p>
            Depuis ses débuts, Enfan de Palestine a grandi sans perdre son
            objectif initial : utiliser la création pour soutenir le peuple
            palestinien.{" "}
            <strong className="underline underline-offset-4">
              Plus de 228 000 €
            </strong>{" "}
            ont aujourd&apos;hui été reversés à des organisations agissant
            sur le terrain.
          </p>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white lg:px-16 lg:py-24">
        <h2 className="mb-10 font-tight text-3xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
          Question fréquent (FAQ)
        </h2>
        <FaqAccordion items={FAQ_ITEMS} />
      </section>
    </>
  );
}
