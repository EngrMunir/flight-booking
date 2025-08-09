import { getAccessToken } from "@/utils/amadeus";

export async function lookupLocations(keyword: string) {
  if (!keyword?.trim()) return [];
  const token = await getAccessToken();
  if (!token) throw new Error("Auth token failed");

  const params = new URLSearchParams({
    subType: "CITY,AIRPORT",
    keyword,
    "page[limit]": "10",
    "page[offset]": "0",
    sort: "analytics.travelers.score",
  });

  const res = await fetch(
    `https://test.api.amadeus.com/v1/reference-data/locations?${params.toString()}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) return [];
  const data = await res.json();

  return (data?.data || []).map((it: any) => ({
    label: `${it.name} (${it.iataCode}) — ${it.address?.countryName ?? ""}`,
    code: it.iataCode,          // <-- Use this for searchFlights
    type: it.subType,           // CITY or AIRPORT
    countryCode: it.address?.countryCode,
  }));
}
