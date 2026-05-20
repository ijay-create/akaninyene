import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { supabase } from "../lib/supabase";

import "../styles/navbar.css";

const ALLOWED_EMAIL = "akaninyeneini.udoh@gmail.com";

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navLinks = [
    "home",
    "about",
    "skills",
    "experience",
    "certifications",
    "contact",
  ];

  // GET USER
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className={scrolled ? "navbar glass scrolled" : "navbar"}>
      <div className="container nav-container">

        {/* LOGO */}
        <motion.h2 className="logo">AIU</motion.h2>

        {/* LINKS */}
        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          {navLinks.map((link) => (
            <li key={link}>
              <a href={`#${link}`} onClick={() => setMenuOpen(false)}>
                {link}
              </a>
            </li>
          ))}

          {/* ADMIN ONLY */}
          {user?.email === ALLOWED_EMAIL && (
            <li>
              <a href="/admin" onClick={() => setMenuOpen(false)}>
                admin
              </a>
            </li>
          )}

          {/* LOGIN / LOGOUT */}
          {!user ? (
            <li>
              <a href="/login" onClick={() => setMenuOpen(false)}>
                login
              </a>
            </li>
          ) : (
            <li>
              <button className="logout-btn" onClick={logout}>
                logout
              </button>
            </li>
          )}
        </ul>

        {/* MOBILE TOGGLE */}
        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;