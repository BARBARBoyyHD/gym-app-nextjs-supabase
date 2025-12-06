import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Home from "@/components/section/Home";
import Classes from "@/components/section/Classes";
import PersonalTraining from "@/components/section/PersonalTraining";
import Facility from "@/components/section/Facility";
import GroupTraining from "@/components/section/GroupTraining";
export default function page() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <Classes />
        <PersonalTraining />
        <Facility />
        <GroupTraining />
        <Footer />
      </main>
    </>
  );
}
