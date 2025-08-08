export const getAccessToken = async (): Promise<string | null> => {
  try {
    const res = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.NEXT_PUBLIC_AMADEUS_API_KEY!,
        client_secret: process.env.NEXT_PUBLIC_AMADEUS_API_SECRET!,
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.access_token;
  } catch (err) {
    console.error("Token error:", err);
    return null;
  }
};
