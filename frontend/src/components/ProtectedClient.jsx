import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthProvider";

export default function ProtectedClient({ children }) {
  const navigate = useNavigate();
  const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading && !token) {
      navigate("/login");
    }
  }, [loading, navigate, token]);

  if (loading) return null;
  return <>{children}</>;
}
