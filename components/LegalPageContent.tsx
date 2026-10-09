interface LegalPageContentProps {
  title: string;
}

export function LegalPageContent({ title }: LegalPageContentProps) {
  return (
    <div className="px-6 py-10 lg:px-16 lg:py-14">
      <h1 className="font-tight text-3xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-black/70">
        Contenu à reprendre de l&apos;ancien site.
      </p>
    </div>
  );
}
