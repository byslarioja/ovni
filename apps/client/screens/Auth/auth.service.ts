import { translate } from "Shared/utils/translate";
import { translation } from "./translation";

const BASE_URI = `${process.env.EXPO_PUBLIC_API_URL}/auth`;

const lang = translate(translation);

export async function attemptLogin(credentials: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${BASE_URI}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      throw new Error(lang.t("AUTH_SERVICE.ERROR"));
    }
    const response = await res.json();
    const { token } = response;

    return token;
  } catch (error) {
    console.error({ error });
  }
}

export async function verifyToken(token: string) {
  try {
    const res = await fetch(`${BASE_URI}/check-auth`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(lang.t("AUTH_SERVICE.ERROR"));
    }
    const status = res.status;

    return status === 200;
  } catch (error) {
    console.error({ error });
  }
}
