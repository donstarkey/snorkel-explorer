using Api.Models;
using System.Text.Json.Serialization;

namespace Api.Models
{
    public class StormRecord
    {
        public int Id { get; set; }
        public string Name { get; set; }  

        public int DestinationId { get; set; }
        [JsonIgnore]
        public Destination Destination { get; set; } = null!;

        public int Year { get; set; }
        public string Severity { get; set; }="";
        public string Notes { get; set; }="";
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}
