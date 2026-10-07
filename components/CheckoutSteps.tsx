interface CheckoutStepsProps {
  currentStep: 1 | 2 | 3;
}

const STEPS = [
  { number: 1, label: "Livraison" },
  { number: 2, label: "Paiement" },
  { number: 3, label: "Vérification" },
];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <ol className="flex items-center gap-2 text-sm sm:gap-3" role="list">
      {STEPS.map((step, index) => {
        const isActive = step.number === currentStep;
        return (
          <li key={step.number} className="flex items-center gap-2 sm:gap-3">
            {index > 0 ? (
              <span aria-hidden="true" className="h-px w-4 shrink-0 bg-black/15 sm:w-8" />
            ) : null}
            <span className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                  isActive ? "bg-[#F97316] text-white" : "bg-black/10 text-black/40"
                }`}
              >
                {step.number}
              </span>
              <span className={`hidden sm:inline ${isActive ? "text-black" : "text-black/40"}`}>
                {step.label}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
