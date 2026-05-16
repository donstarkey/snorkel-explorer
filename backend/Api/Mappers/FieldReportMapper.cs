using Api.DTOs;
using Api.Models;

namespace SnorkelExplorer.Api.Mappers
{
    public static class FieldReportMapper
    {
        public static FieldReportDto ToDto(this FieldReport r)
        {
            return new FieldReportDto
            {
                UserName = r.UserName,
                ReportText = r.ReportText,
                CreatedAt = r.CreatedAt
            };
        }

        public static FieldReport ToModel(this FieldReportDto dto, int destinationId)
        {
            return new FieldReport
            {
                DestinationId = destinationId,
                UserName = dto.UserName,
                ReportText = dto.ReportText,
                CreatedAt = dto.CreatedAt
            };
        }
    }


}
