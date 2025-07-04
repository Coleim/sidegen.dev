import "@/app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sidegen.dev - Side Project Generator",
  description: "Génère des idées de side projects et des roadmaps personnalisées pour développeurs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>{children}</body>
    </html>
  );
}
