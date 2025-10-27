import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowUp } from "lucide-react";
import About from "../components/About";
import MenuSection from "../components/MenuSection";
import SpecialOrdersSection from "../components/SpecialOrdersSection";
import PhotoGallery from "../components/PhotoGallery";
import CustomerTestimonials from "../components/CustomerTestimonials";
import LocationAndHourMap from "../components/LocationAndHourMap";
import CartSidebar from "../components/CartSidebar";
import { menuService } from "../services/menuService";
import { specialOrdersService } from "../services/specialOrdersService";
import { useCart } from "../context/CartContext";

// GSAP imports for inline hero
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin once
gsap.registerPlugin(ScrollTrigger);

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 right-6 bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg z-50"
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </motion.button>
  );
};

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [specialOrders, setSpecialOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { toggleCart } = useCart();

  // Hero refs
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Hero-specific effect
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Gentle zoom animation
    const zoomAnim = gsap.to(videoEl, {
      scale: 1.06,
      duration: 14,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      transformOrigin: "center center",
    });

    // Text reveal timeline
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(
      titleRef.current,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.9 }
    )
      .fromTo(
        subRef.current,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        "-=0.4"
      );

    // Scroll-triggered video control
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      onLeave: () => videoEl.pause(),
      onEnter: () => {
        try {
          videoEl.play();
        } catch (e) {}
      },
      onEnterBack: () => {
        try {
          videoEl.play();
        } catch (e) {}
      },
    });

    // Cleanup
    return () => {
      zoomAnim.kill();
      tl.kill();
      scrollTrigger.kill();
    };
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [menuData, specialData] = await Promise.all([
        menuService.getAvailableMenuItems(),
        specialOrdersService.getSpecialOrders(),
      ]);
      setMenuItems(menuData);
      setSpecialOrders(specialData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load menu data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-golden mx-auto mb-4"></div>
          <p className="text-gray-600 font-serif">
            QuickBite Kitchen is preparing your experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero section */}
      <section
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero_homekitchen.mp4"
          poster="/videos/hero_homekitchen_poster.jpg"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 text-center px-6">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight"
          >
            QuickBite Kitchen
          </h1>
          <p
            ref={subRef}
            className="mt-3 text-lg sm:text-xl md:text-2xl text-white/90 italic"
          >
            Where every meal feels like coming home.
          </p>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/80">
            Born from memories. Cooked with heart. Served with love.
          </p>

          <div ref={ctaRef} className="mt-8 flex justify-center gap-4">
            <a
              href="#menu"
              className="rounded-full px-6 py-3 border border-white/60 text-white hover:bg-white/10 transition"
            >
              View Menu
            </a>
          </div>
        </div>
      </section>

      <About />

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Error Notice */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-8 max-w-2xl mx-auto text-center shadow-sm">
            {error}
          </div>
        )}

        {/* --- TODAY’S MENU --- */}
        <section id="menu" className="relative mb-28">
          {/* Background Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-white to-transparent opacity-60 rounded-3xl -z-10" />

          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-5 tracking-tight">
              <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Today’s Fresh Menu
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Lovingly crafted with locally-sourced ingredients and served with{" "}
              <br className="hidden sm:block" />
              the warmth and aroma of home.
            </p>
          </div>

          {/* Animated Menu Section */}
          <div className="animate-fade-in-up">
            <MenuSection menuItems={menuItems} />
          </div>
        </section>

        {/* --- SPECIAL CELEBRATIONS --- */}
        <section id="special" className="relative mb-28">
          {/* Decorative Divider */}
          <div className="h-[2px] w-32 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-14 rounded-full" />

          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-5">
              <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                Special Celebrations
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Perfectly curated packages for your gatherings — made memorable{" "}
              <br className="hidden sm:block" />
              with our signature home-style touch.
            </p>
          </div>

          {/* Animated Special Orders */}
          <div className="animate-fade-in-up delay-150">
            <SpecialOrdersSection specialOrders={specialOrders} />
          </div>
        </section>
      </main>

      <PhotoGallery />
      <CustomerTestimonials />
      <LocationAndHourMap />
      {/* Footer */}
      <Footer />
      {/* Cart Sidebar */}
      <CartSidebar />
      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
};

export default Home;
