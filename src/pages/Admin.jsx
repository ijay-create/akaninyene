import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

const Admin = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState("dashboard");

  const [hero, setHero] = useState({});
  const [about, setAbout] = useState({});
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // ================= AUTH =================
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        navigate("/login", { replace: true });
        return;
      }

      setAuthChecked(true);
    };

    checkAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) navigate("/login", { replace: true });
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  // ================= LOAD ALL =================
  useEffect(() => {
    if (!authChecked) return;
    loadAll();
  }, [authChecked]);

  const loadAll = async () => {
    const [heroRes, aboutRes, expRes, skillRes] = await Promise.all([
      supabase.from("hero").select("*").eq("id", "hero_main").single(),
      supabase.from("about").select("*").eq("id", "about_main").single(),
      supabase.from("experience").select("*").order("created_at", { ascending: true }),
      supabase.from("skills").select("*").order("created_at", { ascending: true }),
    ]);

    setHero(heroRes.data || {});
    setAbout(aboutRes.data || {});
    setExperience(expRes.data || []);
    setSkills(skillRes.data || []);
  };

  // ================= HERO =================
  const saveHero = async () => {
    setLoading(true);

    await supabase.from("hero").upsert({
      id: "hero_main",
      ...hero,
    });

    setLoading(false);
    alert("Hero updated!");
  };

  // ================= ABOUT =================
  const saveAbout = async () => {
    setLoading(true);

    await supabase.from("about").upsert({
      id: "about_main",
      ...about,
    });

    setLoading(false);
    alert("About updated!");
  };

  // ================= EXPERIENCE =================
  const updateExperience = (index, field, value) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    setExperience(updated);
  };

  const saveExperience = async () => {
    setLoading(true);

    await Promise.all(
      experience.map((item) =>
        supabase.from("experience").upsert(item)
      )
    );

    setLoading(false);
    alert("Experience updated!");
  };

  // ================= SKILLS =================
  const updateSkills = (index, field, value) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    setSkills(updated);
  };

  const saveSkills = async () => {
    setLoading(true);

    await Promise.all(
      skills.map((item) =>
        supabase.from("skills").upsert(item)
      )
    );

    setLoading(false);
    alert("Skills updated!");
  };

  // ================= LOGOUT =================
  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true }); // GO HOME AFTER LOGOUT 🚀
  };

  // ================= HOME BUTTON =================
  const goHome = () => {
    navigate("/");
  };

  if (!authChecked) {
    return <div className="admin">Checking authentication...</div>;
  }

  return (
    <div className="admin">

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <h2>SaaS CMS</h2>

        <button onClick={() => setTab("dashboard")}>Dashboard</button>
        <button onClick={() => setTab("hero")}>Hero</button>
        <button onClick={() => setTab("about")}>About</button>
        <button onClick={() => setTab("experience")}>Experience</button>
        <button onClick={() => setTab("skills")}>Skills</button>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

        <button className="home-btn" onClick={goHome}>
          ⬅ Go Back Home
        </button>
      </div>

      {/* CONTENT */}
      <div className="admin-content">

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div className="panel glass">
            <h2>Welcome 🚀 SaaS CMS Level 2</h2>
            <p>Manage all portfolio content dynamically via Supabase.</p>
          </div>
        )}

        {/* HERO */}
        {tab === "hero" && (
          <div className="panel glass">
            <h3>Hero</h3>

            <input
              value={hero.title || ""}
              onChange={(e) =>
                setHero({ ...hero, title: e.target.value })
              }
              placeholder="Title"
            />

            <input
              value={hero.subtitle || ""}
              onChange={(e) =>
                setHero({ ...hero, subtitle: e.target.value })
              }
              placeholder="Subtitle"
            />

            <button onClick={saveHero} disabled={loading}>
              {loading ? "Saving..." : "Save Hero"}
            </button>
          </div>
        )}

        {/* ABOUT */}
        {tab === "about" && (
          <div className="panel glass">
            <h3>About</h3>

            <input
              value={about.title || ""}
              onChange={(e) =>
                setAbout({ ...about, title: e.target.value })
              }
              placeholder="Title"
            />

            <textarea
              value={about.summary || ""}
              onChange={(e) =>
                setAbout({ ...about, summary: e.target.value })
              }
              placeholder="Summary"
            />

            <input
              value={about.footer || ""}
              onChange={(e) =>
                setAbout({ ...about, footer: e.target.value })
              }
              placeholder="Footer"
            />

            <input
              value={about.quote || ""}
              onChange={(e) =>
                setAbout({ ...about, quote: e.target.value })
              }
              placeholder="Quote"
            />

            <button onClick={saveAbout} disabled={loading}>
              {loading ? "Saving..." : "Save About"}
            </button>
          </div>
        )}

        {/* EXPERIENCE */}
        {tab === "experience" && (
          <div className="panel glass">
            <h3>Experience</h3>

            {experience.map((item, i) => (
              <div key={item.id || i} className="cms-card">

                <input
                  value={item.role || ""}
                  onChange={(e) =>
                    updateExperience(i, "role", e.target.value)
                  }
                  placeholder="Role"
                />

                <input
                  value={item.company || ""}
                  onChange={(e) =>
                    updateExperience(i, "company", e.target.value)
                  }
                  placeholder="Company"
                />

                <input
                  value={item.duration || ""}
                  onChange={(e) =>
                    updateExperience(i, "duration", e.target.value)
                  }
                  placeholder="Duration"
                />
              </div>
            ))}

            <button onClick={saveExperience} disabled={loading}>
              {loading ? "Saving..." : "Save Experience"}
            </button>
          </div>
        )}

        {/* SKILLS */}
        {tab === "skills" && (
          <div className="panel glass">
            <h3>Skills</h3>

            {skills.map((item, i) => (
              <div key={item.id || i} className="cms-card">

                <input
                  value={item.title || ""}
                  onChange={(e) =>
                    updateSkills(i, "title", e.target.value)
                  }
                  placeholder="Category"
                />

                <textarea
                  value={(item.items || []).join(", ")}
                  onChange={(e) =>
                    updateSkills(i, "items", e.target.value.split(","))
                  }
                  placeholder="Skills (comma separated)"
                />

              </div>
            ))}

            <button onClick={saveSkills} disabled={loading}>
              {loading ? "Saving..." : "Save Skills"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;