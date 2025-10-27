import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Menu, X, Utensils, Gift, Home, Info } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCart();
  const location = useLocation();
  const cartItemsCount = getTotalItems();

  useEffect(() => {
    setIsScrolled(window.scrollY > 50);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMenuDropdownOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    {
      name: "Today's Menu",
      path: "#menu",
      icon: <Utensils className="w-4 h-4" />,
      hasDropdown: true,
      dropdownItems: ["Breakfast", "Lunch", "Dinner"],
    },
    {
      name: "Special Orders",
      path: "#special",
      icon: <Gift className="w-4 h-4" />,
    },
    { name: "About", path: "/about", icon: <Info className="w-4 h-4" /> },
  ];

  const handleMenuClick = (path) => {
    if (path.startsWith("#")) {
      // scroll to section
      const section = document.getElementById(path.substring(1));
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      // route navigation
      window.location.href = path;
    }
    setIsMobileMenuOpen(false);
  };

  const handleMenuDropdownClick = (category) => {
    const menuSection = document.getElementById("menu");
    if (menuSection) menuSection.scrollIntoView({ behavior: "smooth" });
    setIsMenuDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
          ${
            isScrolled
              ? "bg-gradient-to-r from-amber-50/95 via-white/70 to-amber-100/95 shadow-lg border-b border-amber-200/50"
              : "bg-white/10 backdrop-blur-xl border-b border-white/30"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center space-x-2"
              >
                <div className="relative">
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <h1
                    className={`font-serif font-bold tracking-tight text-2xl sm:text-3xl ${
                      isScrolled
                        ? "bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent"
                        : "text-gray-800"
                    }`}
                  >
                    QuickBite
                  </h1>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div
                      onMouseEnter={() => setIsMenuDropdownOpen(true)}
                      onMouseLeave={() => setIsMenuDropdownOpen(false)}
                      className="relative"
                    >
                      <motion.button
                        whileHover={{ y: -2 }}
                        className={`flex items-center space-x-1 font-medium transition-all ${
                          isScrolled
                            ? "bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent hover:from-red-600 hover:to-orange-500"
                            : "text-gray-700 hover:text-amber-600"
                        }`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </motion.button>

                      <AnimatePresence>
                        {isMenuDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-48 bg-white/10 backdrop-blur-xl rounded-lg shadow-xl border border-amber-100/30"
                          >
                            {item.dropdownItems.map((dropdownItem) => (
                              <button
                                key={dropdownItem}
                                onClick={() =>
                                  handleMenuDropdownClick(
                                    dropdownItem.toLowerCase()
                                  )
                                }
                                className="w-full px-4 py-3 text-left text-gray-700 hover:bg-amber-50/20 hover:text-amber-600 transition first:rounded-t-lg last:rounded-b-lg"
                              >
                                {dropdownItem}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ y: -2 }}
                      onClick={() => handleMenuClick(item.path)}
                      className={`flex items-center space-x-1 font-medium transition-all ${
                        isScrolled
                          ? "bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent hover:from-red-600 hover:to-orange-500"
                          : "text-gray-700 hover:text-amber-600"
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </motion.button>
                  )}
                </div>
              ))}

              {/* Desktop Cart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCart}
                className="relative flex items-center space-x-2 p-2 rounded-full"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`p-2 rounded-full transition ${
                    isScrolled
                      ? "bg-gradient-to-r from-red-500 to-orange-400 text-white hover:from-red-600 hover:to-orange-500"
                      : "bg-amber-100/20 text-amber-600 hover:bg-amber-600 hover:text-white"
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                </motion.div>
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleCart}
                className="relative p-2 rounded-full"
              >
                <div
                  className={`p-2 rounded-full transition ${
                    isScrolled
                      ? "bg-gradient-to-r from-red-500 to-orange-400 text-white"
                      : "bg-amber-100/20 text-amber-600"
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                </div>
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition ${
                  isScrolled
                    ? "text-white"
                    : "text-gray-700 hover:text-amber-600"
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-lg z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 w-80 bg-white/30 backdrop-blur-xl shadow-2xl z-50 md:hidden border-l border-amber-200/30"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-amber-200/30">
                    <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                      QuickBite
                    </h2>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-full bg-amber-100/20 text-gray-600 hover:bg-amber-200/20 transition"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Menu Items */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[400px]">
                    {navItems.map((item) => (
                      <div key={item.name} className="group">
                        {item.hasDropdown ? (
                          <div className="rounded-lg bg-white/10 backdrop-blur-sm border border-amber-100/30 mb-3">
                            <button
                              onClick={() =>
                                setIsMenuDropdownOpen(!isMenuDropdownOpen)
                              }
                              className="flex items-center space-x-3 w-full p-4 text-left rounded-lg transition group-hover:bg-amber-50/20"
                            >
                              <span className="text-amber-600">
                                {item.icon}
                              </span>
                              <span className="font-medium bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                                {item.name}
                              </span>
                            </button>
                            <AnimatePresence>
                              {isMenuDropdownOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pb-2 px-4 space-y-2">
                                    {item.dropdownItems.map((dropdownItem) => (
                                      <motion.button
                                        key={dropdownItem}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        onClick={() =>
                                          handleMenuDropdownClick(
                                            dropdownItem.toLowerCase()
                                          )
                                        }
                                        className="w-full p-4 text-left text-gray-600 hover:bg-amber-50/20 hover:text-amber-600 rounded-lg transition"
                                      >
                                        {dropdownItem}
                                      </motion.button>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleMenuClick(item.path)}
                            className="flex items-center space-x-3 w-full p-4 text-left rounded-lg bg-white/10 backdrop-blur-sm border border-amber-100/30 transition hover:bg-amber-50/20 mb-3"
                          >
                            <span className="text-amber-600">{item.icon}</span>
                            <span className="font-medium bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                              {item.name}
                            </span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-amber-200/30">
                    <div className="text-center text-sm text-orange-500">
                      Enjoy your meal! 🍽️
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-20" />
    </>
  );
};

export default Navbar;
