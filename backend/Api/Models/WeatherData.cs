using Api.Models;
using System.Text.Json.Serialization;

namespace Api.Models
{
    public class WeatherData
    {
        public int Id { get; set; }

        public int DestinationId { get; set; }
        [JsonIgnore]
        public Destination Destination { get; set; } = null!;

        public double? AvgTemp { get; set; }
        public double? AvgVisibility { get; set; }
        public double? AvgWaves { get; set; }
        public double? WindSpeed { get; set; }

    }


}
