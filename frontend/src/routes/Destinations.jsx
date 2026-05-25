import { useQuery } from "@tanstack/react-query";
import { getDestinations } from "../api/client";
import DestinationCard from "../components/DestinationCard";
import SkeletonGrid from "../components/SkeletonGrid";
import "../styles/Destinations.css";
import "../styles/global.css";

export default function Destinations() {
  const {
    data: destinations = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["destinations"],
    queryFn: getDestinations,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return (
    <div className="page-wrapper destinations fade-in">
      <h1 className="fade-in-slow">Destinations</h1>

      {isLoading && (
        <div className="grid fade-in-stagger">
          <SkeletonGrid />
        </div>
      )}

      {isError && (
        <p className="no-results fade-in">
          Failed to load destinations: {error.message}
        </p>
      )}

      {!isLoading && !isError && (
        <div className="grid fade-in-stagger">
          {destinations.map((d) => (
            <DestinationCard
              key={d.id}
              destination={d}
              className="fade-in"
            />
          ))}
        </div>
      )}

      {!isLoading && destinations.length === 0 && (
        <p className="no-results fade-in">No destinations found.</p>
      )}
    </div>
  );
}
