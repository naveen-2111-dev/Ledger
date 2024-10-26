export default async function CheckedIN() {
  try {
    const res = await fetch("/api/GetUsers", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("failed to fetch resorce from api");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
