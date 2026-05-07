import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cafecomzakia.com.br"),
  title: "Café com Zákia • Podcast de Negócios com Daniel Zákia",
  description:
    "Café com Zákia é o podcast de negócios conduzido por Daniel Zákia, com entrevistas para empresários, líderes e especialistas que desejam construir autoridade, visibilidade e posicionamento premium.",
  keywords: [
    "Café com Zákia",
    "Daniel Zákia",
    "podcast de negócios",
    "entrevistas com empresários",
    "podcast empresarial",
    "Mercavejo Consultoria",
  ],
  openGraph: {
    title: "Café com Zákia • Podcast de Negócios com Daniel Zákia",
    description:
      "Entrevistas premium para empresários, líderes e especialistas que desejam construir autoridade.",
    type: "website",
    url: "https://www.cafecomzakia.com.br",
    images: [
      {
        url: "/assets/hero-cafe-zakia-final.jpg",
        alt: "Café com Zákia",
      },
    ],
  },
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
