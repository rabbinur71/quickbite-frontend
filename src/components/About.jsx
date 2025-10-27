import { motion } from "framer-motion";
import theme from "../theme/Theme";

export default function About() {
  // Destructure with fallbacks matching Theme.js
  const {
    bgLight = "#FFF8F5",
    bgDark = "#0F172A",
    textDark = "#1F2937",
    textLight = "#6B7280",
    accent = "#FFD54F",
    primaryStart = "#F97316",
    primaryEnd = "#EF4444",
  } = theme.colors || {};

  // Create a real CSS gradient for inline styles
  const primaryGradient = `linear-gradient(135deg, ${primaryStart}, ${primaryEnd})`;
  const shadowLg = "0 8px 24px rgba(0,0,0,0.15)";

  return (
    <section
      className="relative overflow-hidden py-20"
      style={{
        backgroundColor: bgLight, // bgDark if prefer dark mode
        color: textDark,
      }}
    >
      {/* Gradient overlay using CSS gradient */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: primaryGradient,
          zIndex: 0,
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-lg"
        >
          <img
            src="/images/chef.jpg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=60";
            }}
            alt="Our Chef"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.1))",
            }}
          ></div>
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-sm uppercase tracking-wide opacity-80">
              Since 2010
            </p>
            <h3 className="text-2xl font-semibold mt-1">
              The Art of Taste & Passion
            </h3>
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl sm:text-4xl font-semibold mb-4"
            style={{ color: textDark }}
          >
            A Culinary Journey Worth Savoring
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed mb-6"
            style={{ color: textLight }}
          >
            At <strong>QuickBite</strong>, every dish is a story — a blend of
            authentic recipes, fresh ingredients, and heartfelt craftsmanship.
            From local favorites to international delights, our kitchen
            celebrates flavor in its purest form.
          </p>

          <p
            className="text-base sm:text-lg leading-relaxed mb-10"
            style={{ color: textLight }}
          >
            Our mission is simple: to bring people together through food that
            excites the senses and comforts the soul. Whether you’re here for a
            cozy meal, a family gathering, or a quick bite on the go — you’ll
            always find warmth in our hospitality.
          </p>

          <motion.a
            href="#menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-full text-white font-medium shadow-md"
            style={{
              background: primaryGradient,
              boxShadow: shadowLg,
            }}
          >
            Explore Our Menu
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
