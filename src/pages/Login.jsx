import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // 🔐 redirect if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/admin");
      }
    };

    checkUser();
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="login">
      <form onSubmit={login}>
        <h2>Admin Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMsg && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            {errorMsg}
          </p>
        )}

        <button disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* 👇 HOME BUTTON */}
        <button
          type="button"
          className="home-btn"
          onClick={() => navigate("/")}
        >
          Go back to Home
        </button>
      </form>
    </div>
  );
};

export default Login;