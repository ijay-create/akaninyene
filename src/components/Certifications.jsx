import { motion } from "framer-motion";

import "../styles/certifications.css";

const Certifications = () => {
  const certs = [
    "Oracle Cloud Infrastructure Foundations Associate",
    "Oracle Cloud Infrastructure Architect Associate",
    "Oracle Cloud Infrastructure Observability Professional",
    "Oracle Cloud Infrastructure Autonomous Database Professional",
    "Oracle Cloud Infrastructure Migration Architect Professional",
    "Oracle Cloud Infrastructure MultiCloud Architect Professional",
    "ITIL v4 Foundation Certification",
    "ServiceNow IT Leadership Certificate",
    "DevOps Professional Certificate",
    "Blue Prism Foundation Training",
  ];

  return (
    <section id="certifications">
      <div className="container">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Certifications & Professional Training
        </motion.h2>

        <p className="cert-subtitle">
          Cloud, DevOps, IT Service Management, and Enterprise Automation certifications across Oracle Cloud Infrastructure and industry tools.
        </p>

        <div className="cert-grid">

          {certs.map((cert, index) => (
            <motion.div
              className="cert-card glass"
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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