import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

import "../styles/experience.css";

const Experience = () => {
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .limit(1);

      if (!error) {
        setExperience(data?.[0] || null);
      }

      setLoading(false);
    };

    fetchExperience();
  }, []);

  if (loading) {
    return (
      <section id="experience">
        <div className="container">
          <p>Loading experience...</p>
        </div>
      </section>
    );
  }

  const experiences =
    experience?.items || [
      {
        role: "Lead, Technical Operations (RPA)",
        company: "Ecobank Transnational Inc",
        duration: "Aug 2023 - Present",
        points: [
          "Lead L2/L3 support for enterprise RPA platforms",
          "Ensure high availability and resilience of automation systems",
          "Drive incident management, RCA, and preventive fixes",
          "Monitor BOT performance and infrastructure health",
        ],
      },
      {
        role: "Senior Site Reliability / Technical Support",
        company: "Moniepoint Inc",
        duration: "Sep 2022 - Aug 2023",
        points: [
          "Managed performance of mission-critical fintech systems",
          "Implemented SLIs, SLOs, and observability practices",
          "Improved monitoring with Grafana & Prometheus",
          "Supported CI/CD pipelines and deployment reliability",
        ],
      },
      {
        role: "Senior Application Support Specialist",
        company: "Access Bank Plc",
        duration: "Aug 2021 - Aug 2022",
        points: [
          "Managed omnichannel banking systems",
          "Handled deployments, patches, and release cycles",
          "Led DR failover activities",
          "Resolved critical production incidents",
        ],
      },
    ];

  return (
    <section id="experience">
      <div className="container">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {experience?.title || "Professional Experience"}
        </motion.h2>

        <div className="timeline">

          {experiences.map((item, index) => (
            <motion.div
              className="timeline-item"
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="timeline-dot"></div>

              <div className="timeline-card glass">
                <span className="duration">{item.duration}</span>

                <h3>{item.role}</h3>
                <h4>{item.company}</h4>

                <ul>
                  {item.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Experience;