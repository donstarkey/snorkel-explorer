using Api.DTOs;
using Api.Models;

namespace SnorkelExplorer.Api.Mappers
{
    public static class FishLifeMapper
    {
        public static FishLifeScoreDto ToDto(this FishLifeScore f)
        {
            return new FishLifeScoreDto
            {
                Score = f.Score,
                Notes = f.Notes
            };
        }

        public static FishLifeScore ToModel(this FishLifeScoreDto dto, int destinationId)
        {
            return new FishLifeScore
            {
                DestinationId = destinationId,
                Score = dto.Score,
                Notes = dto.Notes
            };
        }
    }




}
