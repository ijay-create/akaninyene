import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Navigate } from "react-router-dom";

const ALLOWED_EMAIL = "akaninyeneini.udoh@gmail.com";

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (mounted) {
        setSession(data.session);
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          setSession(session);
        }
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  // ❌ not logged in
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // ❌ wrong email (auto logout)
  if (session.user.email !== ALLOWED_EMAIL) {
    supabase.auth.signOut();
    return <Navigate to="/login" replace />;
  }

  // ✅ allowed
  return children;
};

export default ProtectedRoute;