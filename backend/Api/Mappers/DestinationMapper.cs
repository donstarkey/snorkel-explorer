using Api.DTOs;
using Api.Models;

namespace SnorkelExplorer.Api.Mappers
{
    public static class DestinationMapper
    {
        // ---------------------------------------------------------
        // MODEL → DTO
        // ---------------------------------------------------------
        public static DestinationDto ToDto(this Destination d)
        {
            return new DestinationDto
            {
                Id = d.Id,
                Name = d.Name,
                Country = d.Country,
                Description = d.Description,
                Guide = d.Guide,
                MapEmbed = d.MapEmbed,

                Species = d.Species?.ToList() ?? new List<string>(),
                Videos = d.Videos?.ToList() ?? new List<string>(),

                // Flattened image sets
                PrimaryImage = d.Images?
                    .FirstOrDefault(i => i.Type != null &&
                        i.Type.Equals("Primary", StringComparison.OrdinalIgnoreCase))
                    ?.Url,

                HeroImages = d.Images?
                    .Where(i => i.Type != null &&
                        i.Type.Equals("Hero", StringComparison.OrdinalIgnoreCase))
                    .Select(i => i.Url)
                    .ToList() ?? new List<string>(),

                Gallery = d.Images?
                    .Where(i => i.Type != null &&
                        i.Type.Equals("Gallery", StringComparison.OrdinalIgnoreCase))
                    .Select(i => i.Url)
                    .ToList() ?? new List<string>(),

                // Full safe image DTO list
                Images = d.Images?
                    .Select(i => i.ToDto())
                    .ToList() ?? new List<DestinationImageDto>(),

                Sites = d.Sites?
                    .Select(s => s.ToDto())
                    .ToList() ?? new List<SnorkelSiteDto>(),

                FishLife = d.FishLife?.ToDto(),

                StormHistory = d.StormHistory?
                    .Select(s => s.ToDto())
                    .ToList() ?? new List<StormRecordDto>(),

                Weather = d.Weather?.ToDto(),

                BestTime = d.BestTime?
                    .Select(b => b.ToDto())
                    .ToList() ?? new List<BestTimeScoreDto>(),

                Reports = d.Reports?
                    .Select(r => r.ToDto())
                    .ToList() ?? new List<FieldReportDto>()
            };
        }

        // ---------------------------------------------------------
        // DTO → MODEL
        // ---------------------------------------------------------
        public static Destination ToModel(this DestinationDto dto, int? existingId = null)
        {
            var destination = new Destination
            {
                Id = existingId ?? 0,
                Name = dto.Name,
                Country = dto.Country,
                Description = dto.Description,
                Guide = dto.Guide,
                MapEmbed = dto.MapEmbed,

                Species = dto.Species?.ToList() ?? new List<string>(),
                Videos = dto.Videos?.ToList() ?? new List<string>()
            };

            // CHILD COLLECTIONS — SAFE LIST REPLACEMENT

            destination.Images = dto.Images?
                .Select(i => i.ToModel(destination.Id))
                .ToList() ?? new List<DestinationImage>();

            destination.Sites = dto.Sites?
                .Select(s => s.ToModel(destination.Id))
                .ToList() ?? new List<SnorkelSite>();

            destination.FishLife = dto.FishLife != null
                ? dto.FishLife.ToModel(destination.Id)
                : null;

            destination.StormHistory = dto.StormHistory?
                .Select(s => s.ToModel(destination.Id))
                .ToList() ?? new List<StormRecord>();

            destination.Weather = dto.Weather != null
                ? dto.Weather.ToModel(destination.Id)
                : null;

            destination.BestTime = dto.BestTime?
                .Select(b => b.ToModel(destination.Id))
                .ToList() ?? new List<BestTimeScore>();

            destination.Reports = dto.Reports?
                .Select(r => r.ToModel(destination.Id))
                .ToList() ?? new List<FieldReport>();

            return destination;
        }
    }
}
