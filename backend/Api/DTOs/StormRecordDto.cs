namespace Api.DTOs
{
    public class StormRecordDto
    {
        public string Name { get; set; }
        public int Year { get; set; }
        public string Severity { get; set; }
        public string? Notes { get; set; }

        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }

}

