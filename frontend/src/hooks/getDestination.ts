import { useQuery } from "@tanstack/react-query";
import { Destination } from "../types/Destination";

export function getDestination(id: number) {
  return useQuery<Destination>({
    queryKey: ["destination", id],
    queryFn: async () => {
      const res = await fetch(`/api/destinations/${id}`);
      if (!res.ok) throw new Error("Failed to fetch destination");
      return res.json();
    }
  });
}
