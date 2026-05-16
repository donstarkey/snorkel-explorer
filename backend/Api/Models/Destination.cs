using Api.Models;

namespace Api.Models
{
    public class Destination
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }

        public List<string> Species { get; set; } = new();
        public List<string> Videos { get; set; } = new();

        public string Guide { get; set; }
        public string MapEmbed { get; set; }

        public List<DestinationImage> Images { get; set; } = new();
        public List<SnorkelSite> Sites { get; set; } = new();
        public FishLifeScore FishLife { get; set; }
        public List<StormRecord> StormHistory { get; set; } = new();
        public WeatherData Weather { get; set; }
        public List<FieldReport> Reports { get; set; } = new();
        public List<BestTimeScore> BestTime { get; set; } = new();

    }
}