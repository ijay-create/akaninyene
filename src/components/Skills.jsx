import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/skills.css";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error) {
        setSkills(data || []);
      }

      setLoading(false);
    };

    fetchSkills();

    // realtime updates (IMPORTANT 🔥)
    const channel = supabase
      .channel("skills-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "skills" },
        () => fetchSkills()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  if (loading) {
    return (
      <section id="skills">
        <div className="container">
          <p>Loading skills...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills">
      <div className="container">

        <h2 className="section-title">
          Core Skills
        </h2>

        <div className="skills-grid">

          {skills.map((group) => (
            <div className="skill-card glass" key={group.id}>
              <h3>{group.category}</h3>

              <ul>
                {group.items?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Skills;