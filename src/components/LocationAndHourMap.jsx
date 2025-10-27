import { motion } from "framer-motion";
import theme from "../theme/Theme";

const LocationAndHourMap = () => {
  return (
    <section
      className={`relative ${theme.sectionStyles.light} py-24 border-t border-amber-100`}
    >
      <div className={theme.sectionStyles.container}>
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={`text-4xl font-bold text-center mb-12 ${theme.gradients.primaryText}`}
        >
          Visit Us or Order In
        </motion.h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900">
              Location & Contact
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>QuickBite Restaurant</strong>
              <br />
              123 Gulshan Avenue, Dhaka 1212, Bangladesh
              <br />
              Phone:{" "}
              <a
                href="tel:+8801323376571"
                className="text-orange-600 font-medium hover:underline"
              >
                +880 1323 376571
              </a>
              <br />
              Email:{" "}
              <a
                href="mailto:info@quickbite.com"
                className="text-orange-600 font-medium hover:underline"
              >
                info@quickbite.com
              </a>
            </p>

            <div className="pt-4">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Business Hours
              </h3>
              <ul className="text-gray-700 space-y-1">
                <li>
                  🕖 <strong>Open:</strong> 7:00 AM – 10:00 PM
                </li>
                <li>
                  📅 <strong>Days:</strong> Open every day (No holidays)
                </li>
                <li>
                  🚗 <strong>Home Delivery:</strong> Available daily
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-xl border border-amber-100"
          >
            <iframe
              title="QuickBite Restaurant Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.7410111477147!2d90.41316357479323!3d23.79223518716998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a1344fe415%3A0x1bc7e674d73196d1!2sGulshan%20Pink%20City%20Shopping%20Complex!5e0!3m2!1sen!2sbd!4v1761487796531!5m2!1sen!2sbd"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationAndHourMap;
