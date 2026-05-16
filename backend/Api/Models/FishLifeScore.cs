using Api.Models;
using System.Text.Json.Serialization;

namespace Api.Models
{
    public class FishLifeScore
    {
        public int Id { get; set; }

        public int DestinationId { get; set; }
        [JsonIgnore]
        public Destination Destination { get; set; } = null!;

        public int Score { get; set; }
        public string Notes { get; set; }="";
    }
}
