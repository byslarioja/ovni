import { attemptLogin, verifyToken } from "./auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

export const tokenAtom = atomWithQuery(() => ({
  queryKey: ["token"],
  queryFn: async () => {
    return await AsyncStorage.getItem("token");
  },
}));

export const verifyTokenAtom = atomWithQuery((get) => ({
  queryKey: ["check-auth", get(tokenAtom)],
  queryFn: async () => {
    const { data: token } = get(tokenAtom);
    return await verifyToken(token);
  },
}));

export default function useAuth() {
  const queryClient = useQueryClient();
  const { data: tokenIsValid } = useAtomValue(verifyTokenAtom);

  const {
    mutate: loginMutation,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: attemptLogin,
    onSuccess: async (data) => {
      await AsyncStorage.setItem("token", data.token);
      queryClient.setQueryData(["token"], true);
    },
  });

  const {
    mutate: logout,
    isPending: isLoginOut,
    isSuccess: isLogedOut,
  } = useMutation({
    mutationFn: async () => {
      await AsyncStorage.removeItem("token");
      queryClient.setQueryData(["token"], null);
    },
  });

  const login = async ({ email, password }) => {
    if (tokenIsValid) {
      return;
    }
    loginMutation({ email, password });
  };

  return {
    login,
    logout,
    isPending,
    isError,
    isSuccess,
    isLoginOut,
    isLogedOut,
  };
}
