import { motion } from "framer-motion";

import "../styles/education.css";

const Education = () => {
  return (
    <section id="education">
      <div className="container">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Education
        </motion.h2>

        <div className="education-grid">

          <motion.div
            className="education-card glass"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <span className="edu-year">
              2016 — 2019
            </span>

            <h3>
              Master of Science (M.Sc.)
              — Information Technology
            </h3>

            <h4>
              University of Lagos, Nigeria
            </h4>

            <p>
              Graduated with Distinction
            </p>
          </motion.div>

          <motion.div
            className="education-card glass"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <span className="edu-year">
              2006 — 2010
            </span>

            <h3>
              Bachelor of Science (B.Sc.)
              — Computer Science
            </h3>

            <h4>
              University of Calabar, Nigeria
            </h4>

            <p>
              Strong academic foundation in
              computing systems and software.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Education;