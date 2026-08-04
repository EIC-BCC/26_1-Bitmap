import { useDispatch, useSelector } from "react-redux";
import api from "../lib/axios";
import { setAuth, clearAuth } from "../store/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.auth);

  async function login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    dispatch(setAuth(data));
  }

  async function register(name, email, password) {
    const { data } = await api.post("/auth/register", { name, email, password });
    dispatch(setAuth(data));
  }

  function logout() {
    dispatch(clearAuth());
  }

  return { auth: state.token ? state : null, login, register, logout };
}
