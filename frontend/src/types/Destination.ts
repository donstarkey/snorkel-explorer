import { SnorkelSite } from "./SnorkelSite";
import { StormRecord } from "./StormRecord ";
import { WeatherData } from "./WeatherData ";
import { FishLifeScore } from "./FishLifeScore ";
import { FieldReport } from "./FieldReport ";
import { DestinationImage } from "./DestinationImage";
import { BestTimeScore } from "./BestTimeScore";

export interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;

  primaryImage: string | null;
  heroImages: string[];
  gallery: string[];
  images: DestinationImage[];

  species: string[];
  videos: string[];
  guide: string;

  sites: SnorkelSite[];
  fishLife: FishLifeScore | null;
  stormHistory: StormRecord[];
  weather: WeatherData | null;

  bestTime: BestTimeScore[];

  mapEmbed: string;
  reports: FieldReport[];
}
