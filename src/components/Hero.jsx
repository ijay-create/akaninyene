import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaPlay, FaChartLine } from "react-icons/fa";

import { supabase } from "../lib/supabase";
import profile from "../assets/images/profile.jpg";
import "../styles/hero.css";

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHero = async () => {
    const { data, error } = await supabase
      .from("hero")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      console.log("Hero fetch error:", error);
      setLoading(false);
      return;
    }

    setHero(data || {});
    setLoading(false);
  };

  useEffect(() => {
    fetchHero();

    const channel = supabase
      .channel("hero-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "hero",
        },
        () => fetchHero()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  if (loading) {
    return (
      <section className="hero loading-hero">
        <h2>Loading hero...</h2>
      </section>
    );
  }

  const metrics = hero?.metrics ?? [
    { number: "13+", label: "Years Experience" },
    { number: "99.9%", label: "System Uptime" },
    { number: "6x", label: "OCI Certified" },
    { number: "24/7", label: "Enterprise Support" },
  ];

  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>

      <div className="container hero-container">

        {/* LEFT */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
        >

          <div className="hero-badge glass">
            <FaChartLine />
            {hero?.badge || "Enterprise Reliability & SRE Leadership"}
          </div>

          {/* NAME ADDED HERE (ONLY CHANGE) */}
          <h2 className="hero-name">
            AKANINYENE INI UDOH
          </h2>

          <h1>
            {hero?.title || "Building"}{" "}
            <span className="gradient-text">
              {hero?.highlight || "Reliable Digital Infrastructure"}
            </span>
          </h1>

          <p className="hero-description">
            {hero?.subtitle ||
              "Senior IT Operations & SRE Leader with 13+ years experience in enterprise systems."}
          </p>

          <div className="hero-buttons">
            <a
              href={hero?.cv_url || "/cv.pdf"}
              className="primary-btn"
              download
            >
              Download CV <FaArrowRight />
            </a>

            <a href="#contact" className="secondary-btn">
              <FaPlay />
              {hero?.cta_text || "Let’s Connect"}
            </a>
          </div>

          <div className="metrics">
            {metrics.map((m, i) => (
              <div className="metric-card glass" key={i}>
                <h3>{m.number}</h3>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="hero-image-container">

            <div className="image-glow"></div>

            <div className="image-wrapper glass">
              <img
                src={hero?.image_url || profile}
                alt="profile"
              />
            </div>

            <div className="floating-card top-card glass">
              <span>{hero?.card_top_label || "System Monitoring"}</span>
              <h4>{hero?.card_top_title || "24/7 Observability"}</h4>
            </div>

            <div className="floating-card bottom-card glass">
              <span>{hero?.card_bottom_label || "Enterprise Cloud"}</span>
              <h4>{hero?.card_bottom_title || "OCI Certified Expert"}</h4>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;