import { useCallback, useState } from "react";
import { attemptLogin } from "./auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {
  const [, setToken] = useState();
  const [state, setState] = useState({
    loading: false,
    error: false,
    logged: false,
  });

  const checkAuth = useCallback(async () => {
    const jwt = await AsyncStorage.getItem("token");

    //should call a check auth api endpoint to ensure that the token is valid

    return !!jwt;
  }, [AsyncStorage.getItem]);

  const login = useCallback(
    async ({ email, password }) => {
      if (checkAuth()) {
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
      attemptLogin({ email, password })
        .then(async (jwt) => {
          await AsyncStorage.setItem("token", jwt);
          setToken(jwt);
          setState({
            loading: false,
            error: false,
            logged: true,
          });
        })
        .catch((error) => {
          setState({
            loading: false,
            error: true,
            logged: false,
          });
        });
    },
    [setToken]
  );

  return {
    checkAuth,
    login,
    isLoading: state.loading,
    loginHasErrors: state.error,
    isLogged: state.logged,
  };
}
