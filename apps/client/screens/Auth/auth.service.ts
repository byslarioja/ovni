import axios from "axios";

const BASE_URI = `${process.env.EXPO_PUBLIC_API_URL}/auth`;

export async function attemptLogin(credentials: {
  email: string;
  password: string;
}) {
  const response = await axios.post<LoggedUser>(
    `${BASE_URI}/login`,
    { ...credentials },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function verifyToken(token: string) {
  if (!token) return false;

  const response = await axios.get(`${BASE_URI}/check-auth`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const status = response.status;

  return status === 200;
}

type LoggedUser = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
};
