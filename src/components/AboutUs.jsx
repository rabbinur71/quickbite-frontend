import { motion } from "framer-motion";
import theme from "../theme/Theme";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  const handleExploreMenu = () => {
    // Navigate to homepage
    navigate("/", { replace: false });

    // Scroll to menu section after a tiny delay
    setTimeout(() => {
      const menuSection = document.getElementById("menu");
      if (menuSection) menuSection.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <section
      className={`py-20 ${theme.sectionStyles.light} overflow-hidden relative`}
      style={{
        fontFamily: theme.fonts.body,
        backgroundColor: theme.colors.bgLight,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              fontFamily: theme.fonts.heading,
              color: theme.colors.textDark,
            }}
          >
            About <span className={theme.gradients.primaryText}>QuickBite</span>
          </h2>
          <p
            className="text-lg text-gray-600 leading-relaxed mb-6"
            style={{ fontFamily: theme.fonts.body }}
          >
            Welcome to <strong>QuickBite</strong> — where fresh flavors meet
            everyday comfort. Our mission is simple: to bring you delicious,
            handcrafted meals made with passion, served with warmth, and
            delivered fast.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            From early morning breakfasts to cozy evening dinners, we craft each
            dish using locally sourced ingredients and authentic recipes.
            Whether you’re grabbing a quick meal or celebrating something
            special, QuickBite makes every bite memorable.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={theme.buttonStyles.primary}
            onClick={handleExploreMenu}
          >
            Explore Our Menu
          </motion.button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/images/about-chef.jpg"
              alt="QuickBite chef preparing fresh dishes"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white shadow-lg p-4 rounded-xl border-l-4 border-orange-500">
            <p className="text-sm text-gray-700 italic">
              “Good food brings people together — and that’s what we do best.”
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
