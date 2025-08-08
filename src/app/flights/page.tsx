"use client";

import FlightResults from "@/components/FlightResult";
import { searchFlights } from "@/service/flights";
import { useState } from "react";

const FlightSearchHero = () => {
  const [tripType, setTripType] = useState("Return");
  const [origin, setOrigin] = useState("DAC");
  const [destination, setDestination] = useState("JFK");
  const [departureDate, setDepartureDate] = useState("2025-08-12");
  const [returnDate, setReturnDate] = useState("2025-08-19");
  const [travelers, setTravelers] = useState(1);
  const [travelClass, setTravelClass] = useState("ECONOMY");
  const [nonStop, setNonStop] = useState(false);
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchFlights({
        origin,
        destination,
        departureDate,
        returnDate: tripType === "Return" ? returnDate : undefined,
        adults: travelers,
        currency: "BDT",
        nonStop,
      });
      setFlights(results);
    } catch (error) {
      console.error("Flight search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Form */}
      <section
        className="bg-cover bg-center min-h-[80vh] flex items-center justify-center px-4"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/W4f093vh/travel.jpg')",
        }}
      >
        <div className="bg-[#05203c] text-white p-6 md:p-8 rounded-lg w-full max-w-6xl shadow-xl">
          <div className="mb-4">
            <button className="bg-blue-800 px-4 py-2 rounded-md text-sm">
              {tripType} ▼
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="bg-white text-gray-800 p-3 rounded-md">
              <label className="text-xs font-medium text-gray-500">From</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div className="bg-white text-gray-800 p-3 rounded-md">
              <label className="text-xs font-medium text-gray-500">To</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value.toUpperCase())}
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div className="bg-white text-gray-800 p-3 rounded-md">
              <label className="text-xs font-medium text-gray-500">Depart</label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div className="bg-white text-gray-800 p-3 rounded-md">
              <label className="text-xs font-medium text-gray-500">Return</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-transparent outline-none"
                disabled={tripType !== "Return"}
              />
            </div>

            <div className="bg-white text-gray-800 p-3 rounded-md">
              <label className="text-xs font-medium text-gray-500">
                Travellers and cabin class
              </label>
              <input
                type="text"
                value={`${travelers} Adult, ${travelClass}`}
                readOnly
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Add nearby airports
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Add nearby airports
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={nonStop}
                  onChange={() => setNonStop(!nonStop)}
                />
                Direct flights
              </label>
            </div>

            <button
              className="bg-[#0062e3] hover:bg-blue-600 px-6 py-2 rounded-md font-semibold"
              onClick={handleSearch}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </section>

      {/* Flight Results */}
      <FlightResults flights={flights} />
    </>
  );
};

export default FlightSearchHero;
