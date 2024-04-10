import { useCallback, useEffect, useState } from "react";
import { attemptLogin, verifyToken } from "./auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Routes } from "Shared/routes";

export default function useAuth() {
  const [token, setToken] = useState<string>();
  const [state, setState] = useState({
    loading: false,
    error: false,
    logged: false,
  });

  useEffect(() => {
    checkAuth().then((isAuthenticated) => {
      setState((prev) => ({
        ...prev,
        logged: isAuthenticated,
      }));
    });
  }, [state]);

  const checkAuth = async () => {
    const jwt = await AsyncStorage.getItem("token");

    if (!jwt) return false;

    const tokenIsValid = await verifyToken(jwt);

    if (tokenIsValid) {
      setToken(jwt);
    }

    return tokenIsValid;
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    router.navigate(Routes.Login);
    setState((prev) => ({ ...prev, logged: false }));
    setToken(null);
  };

  const login = useCallback(
    async ({ email, password }) => {
      const isAuthenticated = await checkAuth();

      if (isAuthenticated) {
        setState((prev) => ({
          ...prev,
          logged: true,
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        loading: true,
      }));

      try {
        const jwt = await attemptLogin({ email, password });
        await AsyncStorage.setItem("token", jwt);
        setToken(jwt);
        setState({
          loading: false,
          error: false,
          logged: true,
        });
      } catch (error) {
        setState({
          loading: false,
          error: true,
          logged: false,
        });
      }
    },
    [setToken]
  );

  return {
    login,
    logout,
    isLoading: state.loading,
    loginHasErrors: state.error,
    isLogged: state.logged,
    token,
  };
}
