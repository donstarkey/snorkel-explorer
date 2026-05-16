using System.Collections.Generic;

namespace Api.DTOs
{
    public class DestinationDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }

        // Flattened image sets
        public string PrimaryImage { get; set; }
        public List<string> HeroImages { get; set; }
        public List<string> Gallery { get; set; }

        // Full safe DTO list of images
        public List<DestinationImageDto> Images { get; set; }

        // Other properties
        public List<string> Species { get; set; }
        public List<string> Videos { get; set; }
        public string Guide { get; set; }

        public List<SnorkelSiteDto> Sites { get; set; }
        public FishLifeScoreDto FishLife { get; set; }
        public List<StormRecordDto> StormHistory { get; set; }
        public WeatherDataDto Weather { get; set; }

        public List<BestTimeScoreDto> BestTime { get; set; }

        public string MapEmbed { get; set; }
        public List<FieldReportDto> Reports { get; set; }
    }
}

