import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Classes from "@/components/section/Classes";
import Home from "@/components/section/Home";
export default function page() {
  return (
    <main>
      <Navbar />
      <Home />
      <Classes />
      <Footer />
    </main>
  );
}
