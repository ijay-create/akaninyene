import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

import "../styles/about.css";

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      const { data, error } = await supabase
        .from("about")
        .select("*")
        .limit(1);

      if (!error) {
        setAbout(data?.[0] || null);
      }

      setLoading(false);
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <section id="about">
        <div className="container">
          <p>Loading About...</p>
        </div>
      </section>
    );
  }

  const cards =
    about?.cards || [
      "Incident Response & RCA Leadership",
      "Cloud & Enterprise Infrastructure",
      "Automation & RPA Optimization",
      "Observability & System Monitoring",
      "Technical Team Leadership",
    ];

  return (
    <section id="about">
      <div className="container">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {about?.title || "Professional Summary"}
        </motion.h2>

        <motion.div
          className="about-summary glass"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
        >

          <p>
            {about?.summary ||
              "Senior IT Operations & Site Reliability Engineering Leader with over 13 years of experience supporting enterprise-scale systems."}
          </p>

          <div className="summary-points">
            {(about?.points || []).map((item, index) => (
              <div className="summary-item" key={index}>
                {item}
              </div>
            ))}
          </div>

          <p className="summary-bottom">
            {about?.footer ||
              "Adept at bridging business requirements with engineering execution and ensuring system reliability at scale."}
          </p>

        </motion.div>

        <div className="about-grid">
          {cards.map((card, index) => (
            <motion.div
              className="about-card glass"
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <h3>{card}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="quote glass"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p>
            {about?.quote ||
              "“Reliability is not a feature — it is the foundation of trust.”"}
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default About;