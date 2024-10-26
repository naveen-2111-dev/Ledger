export default async function Adder(
  collegename,
  teammembers,
  email,
  event,
  check,
) {
  try {
    if (!collegename || !teammembers || !email || !event || !check) {
      console.error("Missing required fields");
      return false;
    }

    const res = await fetch("/api/Participants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collegename,
        teammembers,
        email,
        event,
        check,
        time: new Date(),
      }),
    });

    const responseBody = await res.json();
    if (!res.ok) {
      throw new Error("Failed to add users: " + responseBody.message);
    }

    return true;
  } catch (error) {
    throw new Error("error in adding user");
  }
}
