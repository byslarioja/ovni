const BASE_URI = "https://ovni.onrender.com/api/auth";

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
      throw new Error("Something went wrong");
    }
    const response = await res.json();
    const { token } = response;

    return token;
  } catch (error) {
    console.error({ error });
  }
}
