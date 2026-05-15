export interface SnorkelSite {
  name: string;
  description: string;
  difficulty: string;
  depth: number | null;
  visibility: number | null;
  latitude: number | null;
  longitude: number | null;
}
