import { useMutation } from "@tanstack/react-query";
import { useStorageState } from "Shared/hooks/useStorageState";
import { UserCredentials, attemptLogin } from "Shared/services/auth.service";
import Toast from "react-native-toast-message";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Routes } from "Shared/routes";

const AuthContext = React.createContext<AuthContext>({
  signIn: () => null,
  isSigningIn: null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationFn: attemptLogin,
    onMutate: () => setIsSigningIn(true),
    onSuccess: ({ token }) => {
      setSession(token);
      push(Routes.Camera);
    },
    onError: (error) => {
      Toast.show({
        text1: "Algo falló",
        text2: error.message,
        type: "error",
      });
    },
    onSettled: () => {
      setIsSigningIn(false);
    },
  });

  const signIn = (data: UserCredentials) => mutate(data);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isSigningIn,
        signOut: () => setSession(null),
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

type AuthContext = {
  signIn: (data: UserCredentials) => void;
  isSigningIn: boolean;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
};
