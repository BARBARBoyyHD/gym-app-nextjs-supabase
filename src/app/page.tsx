import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Home from "@/components/section/Home";
import Classes from "@/components/section/Classes";
import Coaches from "@/components/section/Coaches";
export default function page() {
  return (
    <main>
      <Navbar />
      <Home />
      <Classes />
      <Coaches />
      <Footer />
    </main>
  );
}
