using Api.Models;
using System.Text.Json.Serialization;

namespace Api.Models;

public class DestinationImage
{
    public int Id { get; set; }

    public string Url { get; set; }
    public string Type { get; set; }

    // Optional uploader (null for system-seeded images)
    public int? UploadedById { get; set; }
    public AppUser? UploadedBy { get; set; }

    // Required FK to Destination
    public int DestinationId { get; set; } 
    [JsonIgnore]
    public Destination Destination { get; set; } = null!;

    // Required for upload limits + moderation
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
