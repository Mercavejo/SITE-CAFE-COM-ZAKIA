import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Testimonials } from "@/components/testimonials";
import { Features } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { ContactCTA } from "@/components/contact-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Testimonials />
      <Features />
      <Pricing />
      <ContactCTA />
      <Footer />
    </main>
  );
}
