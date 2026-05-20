import { motion } from "framer-motion";

import "../styles/achievements.css";

const Achievements = () => {
  const stats = [
    {
      number: "13+",
      text: "Years Experience",
    },

    {
      number: "99.9%",
      text: "System Uptime",
    },

    {
      number: "6x",
      text: "OCI Certified",
    },

    {
      number: "100+",
      text: "Critical Incidents Resolved",
    },
  ];

  return (
    <section id="achievements">
      <div className="container">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Achievements
        </motion.h2>

        <div className="achievements-grid">

          {stats.map((item, index) => (
            <motion.div
              className="achievement-card glass"
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <h2>{item.number}</h2>
              <p>{item.text}</p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Achievements;