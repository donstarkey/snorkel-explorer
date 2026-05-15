using System.Text.Json.Serialization;

namespace Api.DTOs
{
    public class BestTimeScoreDto
    {

        public int Id { get; set; }
        public int DestinationId { get; set; }
        [JsonIgnore]

        public string Month { get; set; }   // e.g. "January", "Feb", or "01"
        public int Score { get; set; }      // 1–10 rating for that month
    }
}

