import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import theme from "../theme/Theme";

const testimonials = [
  {
    name: "Aarif Rahman",
    title: "Food Blogger, Dhaka",
    quote:
      "Absolutely delightful! The flavors were authentic, and the presentation was elegant. Easily one of my favorite dining experiences.",
    image: "/images/testimonial1.jpg",
  },
  {
    name: "Nadia Hasan",
    title: "Marketing Executive",
    quote:
      "Every dish feels like home. The aroma, the texture, the warmth — everything tells a story. Perfect comfort food!",
    image: "/images/testimonial2.jpg",
  },
  {
    name: "Tanvir Ahmed",
    title: "Travel Enthusiast",
    quote:
      "From ambiance to taste — top notch! It’s not just a restaurant, it’s an experience I want to relive.",
    image: "/images/testimonial3.jpg",
  },
];

const CustomerTestimonials = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section
      className={`relative ${theme.sectionStyles.light} py-24 overflow-hidden`}
    >
      <div className={theme.sectionStyles.container}>
        <h2
          className={`text-4xl font-bold text-center mb-12 ${theme.gradients.primaryText}`}
        >
          What Our Guests Say
        </h2>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-10 border border-amber-100"
            >
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 shadow-md border-4 border-orange-100">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-lg md:text-xl font-serif text-gray-700 italic mb-6 leading-relaxed">
                  “{testimonials[current].quote}”
                </p>
                <h4 className="font-semibold text-gray-900 text-lg">
                  {testimonials[current].name}
                </h4>
                <p className="text-sm text-gray-500">
                  {testimonials[current].title}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-2xl text-gray-700 hover:text-orange-500 transition-all"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-2xl text-gray-700 hover:text-orange-500 transition-all"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-orange-500 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
