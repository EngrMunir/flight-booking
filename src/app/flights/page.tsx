"use client";

import FlightResults from "@/components/FlightResult";
import useDebounce from "@/hooks/useDebounce";
import { searchFlights } from "@/service/flights";
import { lookupLocations } from "@/service/location/location";
import { useEffect, useState } from "react";

type AirportOption = { label: string; code: string; type?: string };

const FlightSearchHero = () => {
  // Core search state
  const [origin, setOrigin] = useState("DAC");
  const [destination, setDestination] = useState("JFK");
  const [departureDate, setDepartureDate] = useState("2025-08-12");
  const [travelers] = useState(1);
  const [travelClass] = useState("ECONOMY");
  const [nonStop, setNonStop] = useState(false);
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Typeahead state (airports only)
  const [originQuery, setOriginQuery] = useState("Dhaka");
  const [destQuery, setDestQuery] = useState("New York");
  const [originOpts, setOriginOpts] = useState<AirportOption[]>([]);
  const [destOpts, setDestOpts] = useState<AirportOption[]>([]);
  const dOrigin = useDebounce(originQuery, 300);
  const dDest = useDebounce(destQuery, 300);

  // Fetch airports for origin input
  useEffect(() => {
    (async () => {
      const q = dOrigin.trim();
      if (q.length < 2) return setOriginOpts([]);
      try {
        const res = await lookupLocations(q);
        // keep AIRPORT only
        const airports = (res || []).filter((x: any) => x.type === "AIRPORT");
        setOriginOpts(airports);
      } catch {
        setOriginOpts([]);
      }
    })();
  }, [dOrigin]);

  // Fetch airports for destination input
  useEffect(() => {
    (async () => {
      const q = dDest.trim();
      if (q.length < 2) return setDestOpts([]);
      try {
        const res = await lookupLocations(q);
        const airports = (res || []).filter((x: any) => x.type === "AIRPORT");
        setDestOpts(airports);
      } catch {
        setDestOpts([]);
      }
    })();
  }, [dDest]);

  // Search handler
  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchFlights({
        origin,
        destination,
        departureDate,
        adults: 1,
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
          backgroundImage: "url('https://i.ibb.co/W4f093vh/travel.jpg')",
        }}
      >
        <div className="bg-[#05203c] text-white p-6 md:p-8 rounded-lg w-full max-w-6xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            {/* From (Airport only) */}
            <div className="bg-white text-gray-800 p-3 rounded-md relative">
              <label className="text-xs font-medium text-gray-500">From (Airport)</label>
              <input
                type="text"
                value={originQuery}
                onChange={(e) => setOriginQuery(e.target.value)}
                className="w-full bg-transparent outline-none"
                placeholder="Type airport/city to find airports"
                autoComplete="off"
              />
              {!!originOpts.length && (
                <ul className="absolute z-10 left-0 right-0 mt-2 bg-white border rounded max-h-60 overflow-auto shadow">
                  {originOpts.map((o, idx) => (
                    <li
                      key={idx}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                      onClick={() => {
                        setOrigin(o.code);       // IATA for API
                        setOriginQuery(o.label); // show label in input
                        setOriginOpts([]);
                      }}
                    >
                      <span>{o.label}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-200">Airport</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* To (Airport only) */}
            <div className="bg-white text-gray-800 p-3 rounded-md relative">
              <label className="text-xs font-medium text-gray-500">To (Airport)</label>
              <input
                type="text"
                value={destQuery}
                onChange={(e) => setDestQuery(e.target.value)}
                className="w-full bg-transparent outline-none"
                placeholder="Type airport/city to find airports"
                autoComplete="off"
              />
              {!!destOpts.length && (
                <ul className="absolute z-10 left-0 right-0 mt-2 bg-white border rounded max-h-60 overflow-auto shadow">
                  {destOpts.map((o, idx) => (
                    <li
                      key={idx}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                      onClick={() => {
                        setDestination(o.code);
                        setDestQuery(o.label);
                        setDestOpts([]);
                      }}
                    >
                      <span>{o.label}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-200">Airport</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Depart date */}
            <div className="bg-white text-gray-800 p-3 rounded-md">
              <label className="text-xs font-medium text-gray-500">Depart</label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>

            {/* Travellers & class (read-only for now) */}
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
              disabled={loading}
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
