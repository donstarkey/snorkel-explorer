using System;

namespace Api.DTOs
{
    public class FieldReportDto
    {

        //public int Id { get; set; }
        public string UserName { get; set; }
        public string ReportText { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}

