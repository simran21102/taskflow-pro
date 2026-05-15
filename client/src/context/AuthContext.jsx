import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { api, messageFromError } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('taskflow_user') || 'null'));
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('taskflow_token')));

  useEffect(() => {
    const token = localStorage.getItem('taskflow_token');
    if (!token) return;

    api.get('/auth/me')
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem('taskflow_user', JSON.stringify(data));
      })
      .catch(() => logout(false))
      .finally(() => setLoading(false));
  }, []);

  const saveSession = (data) => {
    localStorage.setItem('taskflow_token', data.token);
    localStorage.setItem('taskflow_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (payload) => {
    try {
      const { data } = await api.post('/auth/login', payload);
      saveSession(data);
      toast.success('Welcome back');
      return true;
    } catch (error) {
      toast.error(messageFromError(error));
      return false;
    }
  };

  const register = async (payload) => {
    try {
      const { data } = await api.post('/auth/register', payload);
      saveSession(data);
      toast.success('Account created');
      return true;
    } catch (error) {
      toast.error(messageFromError(error));
      return false;
    }
  };

  const logout = (notify = true) => {
    localStorage.removeItem('taskflow_token');
    localStorage.removeItem('taskflow_user');
    setUser(null);
    if (notify) toast.success('Logged out');
  };

  const value = useMemo(() => ({ user, loading, login, register, logout, isAdmin: user?.role === 'ADMIN' }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
