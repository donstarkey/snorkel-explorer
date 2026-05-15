using Api.DTOs;
using Api.Models;

namespace SnorkelExplorer.Api.Mappers
{
    public static class SnorkelSiteMapper
    {
        public static SnorkelSiteDto ToDto(this SnorkelSite s)
        {
            return new SnorkelSiteDto
            {
                Name = s.Name,
                Description = s.Description,
                Difficulty = s.Difficulty,
                Depth = s.Depth,
                Visibility = s.Visibility,
                Latitude = s.Latitude,
                Longitude = s.Longitude
            };
        }

        public static SnorkelSite ToModel(this SnorkelSiteDto dto, int destinationId)
        {
            return new SnorkelSite
            {
                DestinationId = destinationId,
                Name = dto.Name,
                Description = dto.Description,
                Difficulty = dto.Difficulty,
                Depth = dto.Depth,
                Visibility = dto.Visibility,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude
            };
        }
    }

}
