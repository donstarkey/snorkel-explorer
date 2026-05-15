export interface StormRecord {
  name: string;
  year: number;
  severity: string;
  notes: string | null;
  latitude: number | null;
  longitude: number | null;
}
