export function scrollToId(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const hadTabIndex = el.hasAttribute("tabindex");
  if (!hadTabIndex) el.setAttribute("tabindex", "-1");

  el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  el.focus({ preventScroll: true });

  if (!hadTabIndex) {
    el.addEventListener("blur", () => el.removeAttribute("tabindex"), { once: true });
  }

  return true;
}
