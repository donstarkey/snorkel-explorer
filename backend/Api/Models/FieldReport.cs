using Api.Models;
using System;
using System.Text.Json.Serialization;

namespace Api.Models
{
    public class FieldReport
    {
        public int Id { get; set; }

        public int DestinationId { get; set; }
        [JsonIgnore]
        public Destination Destination { get; set; } = null!;

        // NEW PROPERTIES (match DTO + mapper + controllers)
        public string UserName { get; set; }
        public string ReportText { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
