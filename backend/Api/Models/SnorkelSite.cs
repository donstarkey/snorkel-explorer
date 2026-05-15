using Api.Models;
using System.Text.Json.Serialization;

namespace Api.Models
{
    public class SnorkelSite
    {
        public int Id { get; set; }

        public int DestinationId { get; set; }
        [JsonIgnore]
        public Destination Destination { get; set; } = null!;

        public string Name { get; set; }
        public string Description { get; set; }="";
        public string Difficulty { get; set; } = ""; // Easy, Moderate, Difficult

        public int? Depth { get; set; }
        public int? Visibility { get; set; }

        public double? Latitude { get; set; }
        public double? Longitude { get; set; }

    }
}
