import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../api/supabaseClient";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get the current session on mount
    async function fetchSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    }

    fetchSession();

    // Subscribe to session changes (login/logout)
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    // Cleanup listener on unmount
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  // Redirect to login if no session
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise render protected component
  return children;
}
