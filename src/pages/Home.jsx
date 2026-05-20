import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Certifications from "../components/Certifications";
import Achievements from "../components/Achievements";
import TechStack from "../components/TechStack";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import FloatingSocials from "../components/FloatingSocials";
import Education from "../components/Education";

const Home = () => {
  return (
    <>
      <ScrollProgress />
      <FloatingSocials />

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Certifications />
      <Achievements />
      <TechStack />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;