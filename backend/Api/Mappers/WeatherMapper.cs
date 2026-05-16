using Api.DTOs;
using Api.Models;

namespace SnorkelExplorer.Api.Mappers
{
    public static class WeatherDataMapper
    {
        public static WeatherDataDto ToDto(this WeatherData w)
        {
            return new WeatherDataDto
            {
                AvgTemp = w.AvgTemp,
                AvgVisibility = w.AvgVisibility,
                AvgWaves = w.AvgWaves,
                WindSpeed = w.WindSpeed
            };
        }

        public static WeatherData ToModel(this WeatherDataDto dto, int destinationId)
        {
            return new WeatherData
            {
                DestinationId = destinationId,
                AvgTemp = dto.AvgTemp,
                AvgVisibility = dto.AvgVisibility,
                AvgWaves = dto.AvgWaves,
                WindSpeed = dto.WindSpeed
            };
        }
    }

}
