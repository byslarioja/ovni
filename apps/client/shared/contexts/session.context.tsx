import { useMutation } from "@tanstack/react-query";
import { useStorageState } from "Shared/hooks/useStorageState";
import { UserCredentials, attemptLogin } from "Shared/services/auth.service";
import Toast from "react-native-toast-message";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Routes } from "Shared/routes";
import { AxiosError } from "axios";
import { translate } from "Shared/utils/translate";
import { translation } from "Shared/translation";

const lang = translate(translation);

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
    onError: (response: AxiosError) => {
      const { status } = response;
      if (status === 422 || status === 404) {
        Toast.show({
          text1: lang.t("ERRORS.INVALID_CREDENTIALS.TITLE"),
          type: "error",
        });
      } else {
        Toast.show({
          text1: lang.t("ERRORS.GENERIC_ERROR.TITLE"),
          text2: lang.t("ERRORS.GENERIC_ERROR.BODY"),
          type: "error",
        });
      }
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
