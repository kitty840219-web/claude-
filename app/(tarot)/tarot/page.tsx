import TarotDivination from "@/components/tarot/TarotDivination";
import TarotServiceMenu from "@/components/tarot/TarotServiceMenu";
import TarotTestimonials from "@/components/tarot/TarotTestimonials";

export default function TarotPage() {
  return (
    <div className="theme-invariant-dark">
      <TarotDivination />
      <TarotServiceMenu />
      <TarotTestimonials />
    </div>
  );
}
