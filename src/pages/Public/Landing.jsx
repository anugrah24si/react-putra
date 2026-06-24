import HeroSection from "@/components/public/HeroSection";
import TrustBar from "@/components/public/TrustBar";
import ServicesSection from "@/components/public/ServicesSection";
import WhyChooseUs from "@/components/public/WhyChooseUs";
import MembershipSection from "@/components/public/MembershipSection";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import FAQSection from "@/components/public/FAQSection";
import CTASection from "@/components/public/CTASection";
import ContactSection from "@/components/public/ContactSection";

/**
 * Landing - Halaman publik utama (perakit/orchestrator).
 * Menyusun seluruh section landing secara berurutan.
 * Setiap section adalah komponen mandiri di components/public/.
 */
export default function Landing() {
    return (
        <div>
            <HeroSection />
            <TrustBar />
            <ServicesSection />
            <WhyChooseUs />
            <MembershipSection />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
            <ContactSection />
        </div>
    );
}
