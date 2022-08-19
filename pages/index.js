import Image from "next/image";
import { useState } from "react";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Temoinage from "../components/Temoinage";
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Navbar setShowModal={setShowModal} />
      <Hero />
      <Services />
      <AboutUs />
      <Temoinage />
      <ContactUs />
      <Footer />
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
