import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutSteps } from "@/components/CheckoutSteps";
import { CheckoutOrderSummary } from "@/components/CheckoutOrderSummary";

export const metadata: Metadata = {
  title: "Commande — Enfan de Palestine",
};

const REGIONS = [
  "Île-de-France",
  "Auvergne-Rhône-Alpes",
  "Provence-Alpes-Côte d'Azur",
  "Occitanie",
  "Nouvelle-Aquitaine",
  "Autre",
];

const COUNTRIES = ["France", "Belgique", "Suisse", "Luxembourg"];

export default function CheckoutPage() {
  return (
    <div className="px-6 py-8 lg:px-16 lg:py-10">
      <div className="flex items-center justify-between text-sm">
        <Link href="/panier" className="underline underline-offset-4 hover:opacity-60">
          ← Retour au panier
        </Link>
        <p className="text-black/60">🔒 Paiement sécurisé</p>
      </div>

      <h1 className="mt-8 font-tight text-2xl font-bold leading-[1.15] tracking-[-0.02em] sm:text-3xl">
        Commande
      </h1>

      <div className="mt-6">
        <CheckoutSteps currentStep={1} />
      </div>

      <div className="mt-10 lg:flex lg:items-start lg:gap-12">
        <div className="lg:flex-1">
          <form className="flex flex-col gap-10">
            <section className="flex flex-col gap-4">
              <h2 className="text-sm font-bold uppercase tracking-widest">
                Informations de contact
              </h2>
              <Field
                label="Adresse email"
                type="email"
                name="email"
                placeholder="votreemail@exemple.com"
              />
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-sm font-bold uppercase tracking-widest">
                Adresse de livraison
              </h2>
              <Field label="Nom complet" name="fullName" />
              <Field label="Adresse (ligne 1)" name="address1" placeholder="Numéro et nom de rue" />
              <Field
                label="Adresse (ligne 2 - optionnel)"
                name="address2"
                placeholder="Appartement, etc."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Ville" name="city" />
                <SelectField label="Région" name="region" options={REGIONS} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Code postal" name="postalCode" />
                <SelectField
                  label="Pays"
                  name="country"
                  options={COUNTRIES}
                  defaultValue="France"
                />
              </div>
            </section>

            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                name="saveInfo"
                defaultChecked
                className="h-4 w-4 accent-black"
              />
              Enregistrer ces informations pour la prochaine fois
            </label>

            <button
              type="button"
              className="w-full bg-black py-4 text-sm uppercase tracking-widest text-white hover:opacity-85"
            >
              Continuer vers le paiement →
            </button>
          </form>
        </div>

        <aside className="mt-10 lg:mt-0 lg:w-[380px] lg:shrink-0">
          <CheckoutOrderSummary />
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-black/60">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="border border-black/20 px-4 py-3 text-sm outline-none focus:border-black"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-black/60">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="border border-black/20 bg-white px-4 py-3 text-sm outline-none focus:border-black"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
