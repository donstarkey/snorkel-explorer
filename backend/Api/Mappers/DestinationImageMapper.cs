using Api.DTOs;
using Api.Models;

namespace SnorkelExplorer.Api.Mappers
{
    public static class DestinationImageMapper
    {
        public static DestinationImageDto ToDto(this DestinationImage img)
        {
            return new DestinationImageDto
            {
                Url = img.Url,
                Type = img.Type
            };
        }

        public static DestinationImage ToModel(this DestinationImageDto dto, int destinationId)
        {
            return new DestinationImage
            {
                Url = dto.Url,
                Type = dto.Type
            };
        }
    }

}
