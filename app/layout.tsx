import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cafecomzakia.com.br"),
  title: "Café com Zakia | Sua Autoridade Digital Começa Aqui",
  description:
    "Transforme sua história em estratégia de posicionamento. Cortes virais, tráfego pago e liderança de mercado. Gravado nos estúdios Mercavejo.",
  keywords: [
    "podcast empresarial",
    "autoridade digital",
    "posicionamento de marca",
    "Café com Zakia",
    "Mercavejo",
    "marketing digital",
    "cortes virais",
  ],
  openGraph: {
    title: "Café com Zakia | Sua Autoridade Digital Começa Aqui",
    description:
      "Transforme sua história em estratégia de posicionamento. Gravado nos estúdios Mercavejo.",
    type: "website",
    url: "https://www.cafecomzakia.com.br",
    images: [{ url: "/og-image.jpg", alt: "Café com Zakia" }],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
