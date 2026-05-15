using Api.Models;

namespace SnorkelExplorer.Api.DTOs
{
    public class ImageDto
    {
        public int Id { get; set; }

        public string Url { get; set; }
        public string Type { get; set; }

        // Optional uploader (null for system-seeded images)
        public int? UploadedById { get; set; }
        public AppUser? UploadedBy { get; set; }

        // Required FK to Destination
        public int DestinationId { get; set; }
        public Destination Destination { get; set; }

        // Required for upload limits + moderation
    }
}
