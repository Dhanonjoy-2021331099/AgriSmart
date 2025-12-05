import PropTypes from "prop-types";
import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const apiBase =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:6001/api";

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("Failed to parse user from storage", error);
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const userId = user?.id || user?._id || null;

  const authHeaders = useMemo(
    () => ({
      Authorization: token ? `Bearer ${token}` : undefined,
    }),
    [token]
  );

  const persist = (nextUser, nextToken) => {
    if (nextToken) {
      localStorage.setItem("token", nextToken);
      setToken(nextToken);
    }
    if (nextUser) {
      localStorage.setItem("user", JSON.stringify(nextUser));
      setUser(nextUser);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  }, []);

  const fetchProfile = useCallback(
    async (id = userId, activeToken = token) => {
      if (!id || !activeToken) return null;
      try {
        setLoading(true);
        const res = await axios.get(`${apiBase}/user/${id}`, {
          headers: { Authorization: `Bearer ${activeToken}` },
        });
        if (res?.data) {
          persist(res.data, activeToken);
          return res.data;
        }
      } catch (error) {
        console.error("fetchProfile failed", error?.message || error);
      } finally {
        setLoading(false);
      }
      return null;
    },
    [apiBase, token, userId]
  );

  const login = useCallback((payload) => {
    const nextToken = payload?.token;
    const nextUser = payload?.user;
    if (!nextToken || !nextUser) return;
    persist(nextUser, nextToken);
  }, []);

  const updateProfile = useCallback(
    async (updates) => {
      if (!userId || !token) return null;
      try {
        setLoading(true);
        const res = await axios.put(`${apiBase}/user/${userId}`, updates, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res?.data) {
          persist(res.data, token);
          return res.data;
        }
      } catch (error) {
        console.error("updateProfile failed", error?.message || error);
        throw error;
      } finally {
        setLoading(false);
      }
      return null;
    },
    [apiBase, token, userId]
  );

  useEffect(() => {
    if (token && userId) {
      fetchProfile(userId, token);
    }
  }, [fetchProfile, token, userId]);

  const value = useMemo(
    () => ({
      user,
      userId,
      token,
      loading,
      login,
      logout,
      fetchProfile,
      updateProfile,
      authHeaders,
    }),
    [
      authHeaders,
      fetchProfile,
      loading,
      login,
      logout,
      token,
      updateProfile,
      user,
      userId,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}
