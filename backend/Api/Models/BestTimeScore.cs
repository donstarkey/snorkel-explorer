using Api.Models;
using System.Text.Json.Serialization;

namespace Api.Models
{
    public class BestTimeScore
    {
        public int Id { get; set; }

        public int DestinationId { get; set; }

        [JsonIgnore]
        public Destination Destination { get; set; } = null!;

        public string Month { get; set; }="";
        public int Score { get; set; }
    }
}
