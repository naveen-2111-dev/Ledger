export default async function Logger(username, password) {
  try {
    const res = await fetch("/api/User", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (!res.ok) {
      throw new Error("login failed");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("failed to login", error);
  }
}
