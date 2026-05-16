using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SnorkelExplorer.Data;

namespace SnorkelExplorer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SnorkelSitesController : ControllerBase
{
    private readonly AppDbContext _context;

    public SnorkelSitesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var sites = await _context.SnorkelSites
            .Select(s => new
            {
                s.Id,
                s.Name,
                s.Description,
               // s.Latitude,
               // s.Longitude,
                s.DestinationId
            })
            .ToListAsync();

        return Ok(sites);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var site = await _context.SnorkelSites
            .Where(s => s.Id == id)
            .Select(s => new
            {
                s.Id,
                s.Name,
                s.Description,
               // s.Latitude,
               // s.Longitude,
                s.DestinationId
            })
            .FirstOrDefaultAsync();

        if (site == null)
            return NotFound();

        return Ok(site);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] SnorkelSite site)
    {
        if (site == null)
            return BadRequest("Invalid site data.");

        _context.SnorkelSites.Add(site);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = site.Id }, site);
    }

}
