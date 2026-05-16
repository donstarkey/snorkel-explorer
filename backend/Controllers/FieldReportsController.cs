using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SnorkelExplorer.Data;
using System;
using System.Threading.Tasks;

namespace SnorkelExplorer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FieldReportsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FieldReportsController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var report = await _context.FieldReports
                .FirstOrDefaultAsync(r => r.Id == id);

            if (report == null)
                return NotFound();

            return Ok(report);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] FieldReport report)
        {
            if (report == null)
                return BadRequest("Invalid report data.");

            report.CreatedAt = DateTime.UtcNow;

            _context.FieldReports.Add(report);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = report.Id }, report);
        }

    }
}
