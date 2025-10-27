// Brand Colors
export const colors = {
  primaryStart: "#F97316", // Orange
  primaryEnd: "#EF4444", // Red
  accent: "#FFD54F", // Golden
  textDark: "#1F2937", // Deep gray
  textLight: "#6B7280", // Muted gray
  bgLight: "#FFF8F5", // Off-white
  bgDark: "#0F172A", // Deep navy
  success: "#10B981", // Green
  error: "#DC2626", // Red
  specialStart: "#8B5CF6", // Purple-500
  specialEnd: "#EC4899", // Pink-500
  specialText: "#7C3AED", // Purple-600
};

// Gradients
export const gradients = {
  primary: `bg-gradient-to-r from-[${colors.primaryStart}] to-[${colors.primaryEnd}]`,
  primaryText: `bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent`,
  special: `bg-gradient-to-r from-[${colors.specialStart}] to-[${colors.specialEnd}]`,
};

// Typography
export const fonts = {
  heading: "'Playfair Display', serif",
  body: "'Inter', sans-serif",
  script: "'Dancing Script', cursive",
};

// Button Styles (reusable presets)
export const buttonStyles = {
  primary:
    "px-6 py-3 rounded-full text-white font-medium shadow-lg transition-all duration-300 hover:shadow-xl bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90",
  secondary:
    "px-6 py-3 rounded-full border border-orange-400 text-orange-600 font-medium hover:bg-orange-50 transition-all duration-300",
  ghost:
    "px-4 py-2 text-gray-600 hover:text-orange-500 transition-colors duration-300",
};

// Section Layouts
export const sectionStyles = {
  container: "max-w-7xl mx-auto px-6 py-20",
  light: "bg-white text-gray-800",
  dark: "bg-gradient-to-t from-gray-900 to-gray-800 text-gray-100",
};

// Animation Defaults (for Framer Motion or utility usage)
export const motionDefaults = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  },
};

// Utility helper (for inline styles)
export const theme = {
  colors,
  gradients,
  fonts,
  buttonStyles,
  sectionStyles,
  motionDefaults,
};

export default theme;
