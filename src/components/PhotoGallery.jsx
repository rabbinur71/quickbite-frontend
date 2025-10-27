import { motion } from "framer-motion";
import theme from "../theme/Theme";

const { colors, gradients, sectionStyles, motionDefaults } = theme;

export default function PhotoGallery() {
  const images = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
    "/images/gallery5.jpg",
    "/images/gallery6.jpg",
  ];

  return (
    <section
      id="gallery"
      className={`${sectionStyles.container} ${sectionStyles.light}`}
      style={{ backgroundColor: colors.bgLight }}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2
          className={`text-4xl md:text-5xl font-serif font-bold mb-4 ${gradients.primaryText}`}
          style={{ fontFamily: theme.fonts.heading }}
        >
          Moments from Our Kitchen
        </h2>
        <p
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          style={{ fontFamily: theme.fonts.body }}
        >
          A glimpse into our passion for food — freshly made, beautifully
          served, and full of flavor.
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <motion.div
            key={index}
            {...motionDefaults.fadeUp}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-500"
          >
            <img
              src={src}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60";
              }}
              alt={`Gallery ${index + 1}`}
              className="w-full h-72 object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-4">
              <p className="text-white text-sm font-medium">
                {index % 2 === 0 ? "Chef’s Special" : "Guest Favorite"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
