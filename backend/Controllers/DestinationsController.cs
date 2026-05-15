using Api.DTOs;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SnorkelExplorer.Api.Mappers;
using SnorkelExplorer.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SnorkelExplorer.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DestinationsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public DestinationsController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/destinations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DestinationDto>>> GetAll()
        {
            var destinations = await _db.Destinations
                .Include(d => d.Images)
                .Include(d => d.Sites)
                .Include(d => d.FishLife)
                .Include(d => d.StormHistory)
                .Include(d => d.Weather)
                .Include(d => d.BestTime)
                .Include(d => d.Reports)
                .ToListAsync();

            return destinations.Select(d => d.ToDto()).ToList();
        }

        // GET: api/destinations/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<DestinationDto>> GetById(int id)
        {
            var destination = await _db.Destinations
                .Include(d => d.Images)
                .Include(d => d.Sites)
                .Include(d => d.FishLife)
                .Include(d => d.StormHistory)
                .Include(d => d.Weather)
                .Include(d => d.BestTime)
                .Include(d => d.Reports)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (destination == null)
                return NotFound();

            return destination.ToDto();
        }

        // POST: api/destinations
        [HttpPost]
        public async Task<ActionResult<DestinationDto>> Create(DestinationDto dto)
        {
            // Build aggregate from DTO (Id = 0 for new)
            var destination = dto.ToModel();

            _db.Destinations.Add(destination);
            await _db.SaveChangesAsync();

            // Reload with children to return full DTO
            var created = await _db.Destinations
                .Include(d => d.Images)
                .Include(d => d.Sites)
                .Include(d => d.FishLife)
                .Include(d => d.StormHistory)
                .Include(d => d.Weather)
                .Include(d => d.BestTime)
                .Include(d => d.Reports)
                .FirstAsync(d => d.Id == destination.Id);

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created.ToDto());
        }

        // PUT: api/destinations/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, DestinationDto dto)
        {
            if (id != dto.Id)
                return BadRequest("ID in URL and body must match.");

            var existing = await _db.Destinations
                .Include(d => d.Images)
                .Include(d => d.Sites)
                .Include(d => d.FishLife)
                .Include(d => d.StormHistory)
                .Include(d => d.Weather)
                .Include(d => d.BestTime)
                .Include(d => d.Reports)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (existing == null)
                return NotFound();

            // Update scalar fields
            existing.Name = dto.Name;
            existing.Country = dto.Country;
            existing.Description = dto.Description;
            existing.Guide = dto.Guide;
            existing.MapEmbed = dto.MapEmbed;
            existing.Species = dto.Species?.ToList() ?? new List<string>();
            existing.Videos = dto.Videos?.ToList() ?? new List<string>();

            // Replace child collections (pattern A: rebuild lists)
            existing.Images = dto.Images?
                .Select(i => i.ToModel(existing.Id))
                .ToList() ?? new List<DestinationImage>();

            existing.Sites = dto.Sites?
                .Select(s => s.ToModel(existing.Id))
                .ToList() ?? new List<SnorkelSite>();

            existing.FishLife = dto.FishLife != null
                ? dto.FishLife.ToModel(existing.Id)
                : null;

            existing.StormHistory = dto.StormHistory?
                .Select(s => s.ToModel(existing.Id))
                .ToList() ?? new List<StormRecord>();

            existing.Weather = dto.Weather != null
                ? dto.Weather.ToModel(existing.Id)
                : null;

            existing.BestTime = dto.BestTime?
                .Select(b => b.ToModel(existing.Id))
                .ToList() ?? new List<BestTimeScore>();

            existing.Reports = dto.Reports?
                .Select(r => r.ToModel(existing.Id))
                .ToList() ?? new List<FieldReport>();

            await _db.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/destinations/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _db.Destinations.FindAsync(id);
            if (existing == null)
                return NotFound();

            _db.Destinations.Remove(existing);
            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}
