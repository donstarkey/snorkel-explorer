namespace Api.DTOs
{
    public class SnorkelSiteDto
    {
        public string Name { get; set; }
        public string Description { get; set; } = "";
        public string Difficulty { get; set; } = ""; // Easy, Moderate, Difficult

        public int? Depth { get; set; }
        public int? Visibility { get; set; }

        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}
