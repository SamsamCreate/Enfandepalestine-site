import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enfan de Palestine",
  description:
    "Enfan de Palestine est un projet créatif et solidaire qui utilise le vêtement comme moyen de sensibiliser, transmettre et agir en faveur du peuple palestinien.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${interTight.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-white text-black lg:flex-row">
        <CartProvider>
          <Header />
          <div className="flex min-w-0 flex-1 flex-col pt-[calc(56px+env(safe-area-inset-top))] lg:pt-0">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
