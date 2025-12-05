import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Home from "@/components/section/Home";
import Classes from "@/components/section/Classes";
import Coaches from "@/components/section/Coaches";
import Facility from "@/components/section/Facility";
export default function page() {
  return (
    <main>
      <Navbar />
      <Home />
      <Classes />
      <Coaches />
      <Facility />
      <Footer />
    </main>
  );
}
