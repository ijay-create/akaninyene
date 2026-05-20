import {
  FaDocker,
  FaJenkins,
  FaCloud,
} from "react-icons/fa";

import {
  SiKubernetes,
  SiGrafana,
  SiPrometheus,
} from "react-icons/si";

import "../styles/techstack.css";

const TechStack = () => {
  const techs = [
    {
      icon: <FaCloud />,
      name: "Oracle Cloud",
    },

    {
      icon: <FaDocker />,
      name: "Docker",
    },

    {
      icon: <SiKubernetes />,
      name: "Kubernetes",
    },

    {
      icon: <SiGrafana />,
      name: "Grafana",
    },

    {
      icon: <SiPrometheus />,
      name: "Prometheus",
    },

    {
      icon: <FaJenkins />,
      name: "CI/CD",
    },
  ];

  return (
    <section id="techstack">
      <div className="container">

        <h2 className="section-title">
          Tech Stack
        </h2>

        <div className="tech-grid">

          {techs.map((tech, index) => (
            <div className="tech-card glass" key={index}>
              <div className="tech-icon">
                {tech.icon}
              </div>

              <h3>{tech.name}</h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default TechStack;