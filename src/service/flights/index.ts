import { getAccessToken } from "@/utils/amadeus";


export const searchFlights = async (params: {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  currency?: string;
  nonStop?: boolean;
}) => {
  const token = await getAccessToken();
  if (!token) throw new Error("Auth token failed");

  const query = new URLSearchParams({
    originLocationCode: params.origin,
    destinationLocationCode: params.destination,
    departureDate: params.departureDate,
    adults: params.adults.toString(),
    ...(params.returnDate ? { returnDate: params.returnDate } : {}),
    ...(params.currency ? { currencyCode: params.currency } : {}),
    ...(params.nonStop ? { nonStop: "true" } : {}),
    max: "10",
  });

  const res = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Search error:", error);
    return [];
  }

  const data = await res.json();
  return data.data;
};
