import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Home from "@/components/section/Home";
import Classes from "@/components/section/Classes";
import PersonalTraining from "@/components/section/PersonalTraining";
import Facility from "@/components/section/Facility";
import GroupTraining from "@/components/section/GroupTraining";
import CallToAction from "@/components/CallToAction";
import Coaches from "@/components/section/Coaches";
import GetStarted from "@/components/section/GetStarted";
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
        <CallToAction
          title="GET YOUR FIRST CLASS FOR FREE!"
          description=" Schedule your visit to LiftUp and attend any group training for free on this day."
        />
        <Coaches />
        <GetStarted />
        <Footer />
      </main>
    </>
  );
}
