using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SnorkelExplorer.Data;
using Api.Models;
using SnorkelExplorer.Services;
using SnorkelExplorer.Settings;
using System;
using System.Threading.Tasks;

namespace SnorkelExplorer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IImageStorageService _storage;
        private readonly ImageUploadSettings _settings;

        public ImagesController(
            AppDbContext context,
            IImageStorageService storage,
            IOptions<ImageUploadSettings> settings)
        {
            _context = context;
            _storage = storage;
            _settings = settings.Value;
        }

        public class UploadImageRequest
        {
            public int DestinationId { get; set; }
            public string Type { get; set; } // "Primary", "Hero", "Gallery"
            public IFormFile File { get; set; }
        }

        [HttpPost("upload")]
        [Authorize(Roles = "Admin,Verified")]
        [RequestSizeLimit(10_000_000)]
        public async Task<IActionResult> Upload([FromForm] UploadImageRequest request)
        {
            var destination = await _context.Destinations
                .FirstOrDefaultAsync(d => d.Id == request.DestinationId);

            if (destination == null)
                return NotFound("Destination not found.");

            if (string.IsNullOrWhiteSpace(request.Type))
                return BadRequest("Type is required.");

            var type = request.Type.Trim();

            // Only Admin can upload Primary
            if (type == "Primary" && !User.IsInRole("Admin"))
                return Forbid();

            // Only one Primary per destination
            if (type == "Primary")
            {
                var exists = await _context.DestinationImages
                    .AnyAsync(i => i.DestinationId == request.DestinationId && i.Type == "Primary");

                if (exists)
                    return BadRequest("This destination already has a primary image. Delete it first before uploading a new one.");
            }

            // Verified user daily upload limit (configurable)
            if (User.IsInRole("Verified"))
            {
                var userId = User.FindFirst("sub")?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Forbid();

                var today = DateTime.UtcNow.Date;

                var uploadsToday = await _context.DestinationImages
                    .CountAsync(i =>
                        i.UploadedById == null &&
                        i.CreatedAt.Date == today);

                if (uploadsToday >= _settings.DailyLimit)
                    return BadRequest($"Daily upload limit reached. You can upload {_settings.DailyLimit} images per day. Come back tomorrow!");
            }

            var url = await _storage.SaveImageAsync(request.File, destination.Name, type);

            var uploaderId = User.FindFirst("sub")?.Value;

            var image = new DestinationImage
            {
                DestinationId = destination.Id,
                Url = url,
                Type = type,
                UploadedById = null,
                CreatedAt = DateTime.UtcNow
            };

            _context.DestinationImages.Add(image);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return BadRequest("Duplicate image detected for this destination.");
            }

            return Ok(image);
        }

        [HttpPost("uploadtest")]
        [AllowAnonymous]
        [RequestSizeLimit(10_000_000)]
        public async Task<IActionResult> UploadTest([FromForm] UploadImageRequest request)
        {
            var destination = await _context.Destinations
                .FirstOrDefaultAsync(d => d.Id == request.DestinationId);

            if (destination == null)
                return NotFound("Destination not found.");

            var url = await _storage.SaveImageAsync(request.File, destination.Name, request.Type);

            var image = new DestinationImage
            {
                DestinationId = destination.Id,
                Url = url,
                Type = request.Type,
                UploadedById = null,
                CreatedAt = DateTime.UtcNow
            };

            _context.DestinationImages.Add(image);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                image.Id,
                image.DestinationId,
                image.Url,
                image.Type,
                image.CreatedAt
            });
        }


        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var image = await _context.DestinationImages
                .FirstOrDefaultAsync(i => i.Id == id);

            if (image == null)
                return NotFound();

            if (image.Type == "Primary")
            {
                var primaryCount = await _context.DestinationImages
                    .CountAsync(i => i.DestinationId == image.DestinationId && i.Type == "Primary");

                if (primaryCount <= 1)
                    return BadRequest("Cannot delete the last primary image for this destination.");
            }

            _context.DestinationImages.Remove(image);
            await _context.SaveChangesAsync();

            await _storage.DeleteImageAsync(image.Url);

            return NoContent();
        }
    }
}
