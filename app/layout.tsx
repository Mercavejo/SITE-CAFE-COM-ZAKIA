import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cafecomzakia.com.br"),
  applicationName: "Café com Zákia",
  title: {
    default: "Café com Zákia | Podcast de Negócios com Daniel Zákia",
    template: "%s | Café com Zákia",
  },
  description:
    "Café com Zákia é o podcast de negócios conduzido por Daniel Zákia, com entrevistas premium para empresários, líderes e especialistas que desejam construir autoridade, visibilidade e posicionamento.",
  keywords: [
    "Café com Zákia",
    "Daniel Zákia",
    "Daniel Devitto Zákia",
    "podcast de negócios",
    "entrevistas com empresários",
    "podcast empresarial",
    "participar de podcast",
    "entrevista premium",
    "Mercavejo Consultoria",
  ],
  authors: [{ name: "Mercavejo Consultoria", url: "https://www.mercavejo.com.br" }],
  creator: "Mercavejo Consultoria",
  publisher: "Mercavejo Consultoria",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Café com Zákia | Podcast de Negócios com Daniel Zákia",
    description:
      "Entrevistas premium para empresários, líderes e especialistas que desejam construir autoridade, visibilidade e reputação.",
    type: "website",
    url: "https://www.cafecomzakia.com.br",
    siteName: "Café com Zákia",
    locale: "pt_BR",
    images: [
      {
        url: "/assets/hero-cafe-zakia-final.jpg",
        alt: "Café com Zákia",
        width: 1920,
        height: 1080,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Café com Zákia | Podcast de Negócios com Daniel Zákia",
    description:
      "Entrevistas premium para empresários, líderes e especialistas que desejam construir autoridade.",
    images: ["/assets/hero-cafe-zakia-final.jpg"],
  },
  category: "business",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/favicon-z.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/assets/favicon-z.png",
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
