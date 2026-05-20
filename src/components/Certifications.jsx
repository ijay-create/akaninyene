import { motion } from "framer-motion";

import "../styles/certifications.css";

const Certifications = () => {
  const certs = [
    "ITIL V4",
    "ServiceNow IT Leadership Certificate",
    "DevOps Professional Certificate",
    "BluePrism Foundation Training",
    "6x Oracle Cloud Infrastructure Certifications",
  ];

  return (
    <section id="certifications">
      <div className="container">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Certifications & Training
        </motion.h2>

        <div className="cert-grid">

          {certs.map((cert, index) => (
            <motion.div
              className="cert-card glass"
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="shine"></div>

              <h3>{cert}</h3>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Certifications;