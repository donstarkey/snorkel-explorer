using Api.DTOs;
using Api.Models;

namespace SnorkelExplorer.Api.Mappers
{
    public static class StormRecordMapper
    {
        public static StormRecordDto ToDto(this StormRecord s)
        {
            return new StormRecordDto
            {
                Name = s.Name,
                Year = s.Year,
                Severity = s.Severity,
                Notes = s.Notes,
                Latitude = s.Latitude,
                Longitude = s.Longitude
            };
        }

        public static StormRecord ToModel(this StormRecordDto dto, int destinationId)
        {
            return new StormRecord
            {
                DestinationId = destinationId,
                Name = dto.Name,
                Year = dto.Year,
                Severity = dto.Severity,
                Notes = dto.Notes,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude
            };
        }
    }

}
