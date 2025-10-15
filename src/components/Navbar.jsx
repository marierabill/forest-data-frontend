import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../api/supabaseClient";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch current user on mount
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();

    // Subscribe to auth state changes (login/logout)
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    // Cleanup listener on unmount
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side: logo + nav */}
        <div className="flex items-center space-x-3">
          <div className="text-green-700 font-bold">KFS • BFDI</div>
          <nav className="flex gap-3 text-sm">
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/data-entry" className="hover:underline">
              Data Entry
            </Link>
            <Link to="/verify" className="hover:underline">
              Verify Permit
            </Link>
          </nav>
        </div>

        {/* Right side: user info / login */}
        <div className="text-sm">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-slate-600">{user.email}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-50 border rounded text-red-600 text-sm hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 bg-blue-50 border rounded text-blue-600 hover:bg-blue-100"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
