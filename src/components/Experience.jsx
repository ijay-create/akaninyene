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
          "Drive incident management, root cause analysis, and preventive resolutions",
          "Monitor BOT performance and infrastructure health across production systems",
        ],
      },

      {
        role: "Senior Site Reliability / Technical Support Engineer",
        company: "Moniepoint Inc",
        duration: "Sep 2022 - Aug 2023",
        points: [
          "Managed reliability and performance of mission-critical fintech systems",
          "Implemented SRE practices including SLIs, SLOs, and observability",
          "Enhanced monitoring using Grafana and Prometheus dashboards",
          "Supported CI/CD pipelines and deployment reliability processes",
        ],
      },

      {
        role: "Senior Application Support Specialist",
        company: "Access Bank Plc",
        duration: "Aug 2021 - Aug 2022",
        points: [
          "Managed enterprise omnichannel banking applications",
          "Handled deployments, patches, releases, and production support activities",
          "Led disaster recovery failover and business continuity operations",
          "Resolved critical incidents impacting customer-facing banking systems",
        ],
      },

      {
        role: "Electronic Channels Support Engineer",
        company: "Haggai Mortgage Bank",
        duration: "Jul 2018 - Jul 2021",
        points: [
          "Supported digital banking and electronic payment platforms",
          "Maintained SLA-driven uptime across enterprise banking systems",
          "Generated system performance reports and operational analytics",
          "Collaborated with vendors and internal stakeholders for issue resolution",
        ],
      },

      {
        role: "Channel Service Monitoring Officer",
        company: "United Bank for Africa (UBA)",
        duration: "Jul 2012 - Jun 2018",
        points: [
          "Monitored ATM, POS, card, and transaction switching platforms",
          "Resolved transaction failures and escalated critical production incidents",
          "Improved proactive monitoring processes for banking services",
          "Performed root cause analysis and service recovery procedures",
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
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="timeline-dot"></div>

              <div className="timeline-card glass">

                <span className="duration">
                  {item.duration}
                </span>

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