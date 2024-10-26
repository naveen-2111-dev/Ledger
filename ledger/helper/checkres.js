export default async function UserCheckout(email) {
  try {
    const data = await fetch("/api/CheckOut", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!data.ok) {
      throw new Error("failed to remove");
    }
    const dat = await data.json();
    console.log(dat);
    return await data.json();
  } catch (error) {
    throw new Error("internal server error");
  }
}
