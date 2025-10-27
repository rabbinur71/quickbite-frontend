import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";

const About = () => {
  return (
    <div className="bg-white text-gray-900">
      <Navbar />
      <main>
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
};

export default About;
