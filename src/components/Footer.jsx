import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 pt-16 pb-8 px-6 sm:px-10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,200,100,0.15),_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="font-serif text-3xl font-bold text-white tracking-tight">
            QuickBite
          </h2>
          <p className="text-gray-400 leading-relaxed text-sm sm:text-base max-w-sm">
            Serving warmth, flavor, and love in every bite. Home Kitchen brings
            authentic dishes straight from our heart to your home.
          </p>
          <div className="flex space-x-4 mt-4">
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="p-2 rounded-full bg-white/5 hover:bg-amber-600 transition-colors"
            >
              <Facebook className="w-5 h-5 text-gray-300 hover:text-white" />
            </motion.a>
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="p-2 rounded-full bg-white/5 hover:bg-amber-600 transition-colors"
            >
              <Instagram className="w-5 h-5 text-gray-300 hover:text-white" />
            </motion.a>
            <motion.a
              href="mailto:info@homekitchen.com"
              whileHover={{ scale: 1.2 }}
              className="p-2 rounded-full bg-white/5 hover:bg-amber-600 transition-colors"
            >
              <Mail className="w-5 h-5 text-gray-300 hover:text-white" />
            </motion.a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <h3 className="text-white font-semibold text-lg border-l-4 border-amber-500 pl-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <button
                onClick={() => (window.location.href = "/#menu")}
                className="hover:text-amber-400 transition-colors"
              >
                Today’s Menu
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "/#special")}
                className="hover:text-amber-400 transition-colors"
              >
                Special Orders
              </button>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-amber-400 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/admin/login"
                className="hover:text-amber-400 transition-colors"
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-white font-semibold text-lg border-l-4 border-amber-500 pl-3">
            Get In Touch
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
            <li className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+880 1323-376571</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>info@quickbite.com</span>
            </li>
            <li className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 mt-1 text-amber-400" />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="my-10 border-t border-white/10" />

      {/* Bottom Section */}
      <div className="text-center text-gray-500 text-sm relative z-10">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-amber-400 font-medium">QuickBite Kitchen</span>.
          All rights reserved.
        </p>
        <p className="mt-2 text-xs text-gray-600">
          Developed with ❤️ by Rabbi_Nur.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
