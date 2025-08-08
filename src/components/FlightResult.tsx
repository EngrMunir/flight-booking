"use client";

interface FlightResultsProps {
  flights: any[];
}

const FlightResults: React.FC<FlightResultsProps> = ({ flights }) => {
  if (!flights.length) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Showing {flights.length} flight result{flights.length > 1 && "s"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {flights.map((flight) => {
          const itinerary = flight.itineraries[0];
          const firstSegment = itinerary.segments[0];
          const lastSegment = itinerary.segments[itinerary.segments.length - 1];

          return (
            <div
              key={flight.id}
              className="bg-white border border-gray-200 p-4 rounded-lg shadow-md"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div>
                  <p className="font-semibold text-blue-800">
                    {flight.validatingAirlineCodes?.join(", ")}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {firstSegment.departure.iataCode} → {lastSegment.arrival.iataCode}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Duration: {itinerary.duration.replace("PT", "").toLowerCase()}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Stops: {itinerary.segments.length - 1}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    {flight.price.total} {flight.price.currency}
                  </p>
                  <p className="text-xs text-gray-500">Per person</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlightResults;
