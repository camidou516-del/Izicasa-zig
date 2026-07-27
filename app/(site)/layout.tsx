import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import AnnouncementPopup from "@/components/ui/AnnouncementPopup";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_38%),_linear-gradient(to_bottom,_#ffffff,_#f9fafb)] flex flex-col">
      <Header />
      
      <main className="w-full flex-1 flex flex-col">
        {children}
      </main>
      
      <Footer />
      
      {/* Pop-up d'annonce Izicasa */}
      <AnnouncementPopup />
    </div>
  );
}