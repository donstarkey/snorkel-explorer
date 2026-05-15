using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SnorkelExplorer.Data;

namespace SnorkelExplorer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StormRecordsController : ControllerBase
{
    private readonly AppDbContext _context;

    public StormRecordsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/StormRecords
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var storms = await _context.StormRecords
            .Select(s => new
            {
                s.Id,
                s.DestinationId,
                s.Year,
                s.Severity,
                s.Notes
            })
            .ToListAsync();

        return Ok(storms);
    }

    // GET: api/StormRecords/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var storm = await _context.StormRecords
            .Where(s => s.Id == id)
            .Select(s => new
            {
                s.Id,
                s.DestinationId,
                s.Year,
                s.Severity,
                s.Notes
            })
            .FirstOrDefaultAsync();

        if (storm == null)
            return NotFound();

        return Ok(storm);
    }

    // POST: api/StormRecords
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] StormRecord storm)
    {
        if (storm == null)
            return BadRequest("Invalid storm data.");

        _context.StormRecords.Add(storm);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = storm.Id }, storm);
    }
}
