using Api.Models;
using System.Text.Json.Serialization;

namespace Api.Models
{
    public class DestinationFishLife
    {
        public int Id { get; set; }
        public int DestinationId { get; set; }
        public int GlobalFishLifeId { get; set; }

        [JsonIgnore]
        public Destination Destination { get; set; } = null!;
        public GlobalFishLife GlobalFishLife { get; set; }
    }
}
