using Api.DTOs;
using Api.Models;

namespace SnorkelExplorer.Api.Mappers
{
    public static class BestTimeMapper
    {
        // Model → DTO
        public static BestTimeScoreDto ToDto(this BestTimeScore b)
        {
            return new BestTimeScoreDto
            {
                Id = b.Id,
                Month = b.Month,
                Score = b.Score
            };
        }

        // DTO → Model
        public static BestTimeScore ToModel(this BestTimeScoreDto dto, int destinationId)
        {
            return new BestTimeScore
            {
                DestinationId = destinationId,
                Month = dto.Month,
                Score = dto.Score
            };
        }
    }
}
