using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SnorkelExplorer.Data;

namespace SnorkelExplorer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherDataController : ControllerBase
{
    private readonly AppDbContext _context;

    public WeatherDataController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var weather = await _context.WeatherData
.Select(w => new
{
    w.Id,
    w.DestinationId,
    w.AvgTemp,
    w.AvgVisibility,
    w.AvgWaves
})

            .ToListAsync();

        return Ok(weather);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var weather = await _context.WeatherData
            .Where(w => w.Id == id)
.Select(w => new
{
    w.Id,
    w.DestinationId,
    w.AvgTemp,
    w.AvgVisibility,
    w.AvgWaves
})

            .FirstOrDefaultAsync();

        if (weather == null)
            return NotFound();

        return Ok(weather);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] WeatherData weather)
    {
        if (weather == null)
            return BadRequest("Invalid weather data.");

        _context.WeatherData.Add(weather);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = weather.Id }, weather);
    }

}

