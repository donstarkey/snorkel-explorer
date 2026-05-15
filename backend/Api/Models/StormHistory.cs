using Api.Models;
using System;
using System.Text.Json.Serialization;

namespace Api.Models
{
    public class StormHistory
    {
        public int Id { get; set; }
        public int DestinationId { get; set; }
        public string StormName { get; set; }
        public int Year { get; set; }
        public string Category { get; set; }
        public string Impact { get; set; }
       
        [JsonIgnore]

        public Destination Destination { get; set; } = null!;
    }
}
