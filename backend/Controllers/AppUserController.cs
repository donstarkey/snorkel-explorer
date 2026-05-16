using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SnorkelExplorer.Data;

namespace SnorkelExplorer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppUserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppUserController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/appuser
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.AppUsers.ToListAsync());
        }

        // POST: api/appuser/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(AppUser user)
        {
            // TODO: hash password
            _context.AppUsers.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        // POST: api/appuser/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest req)
        {
            var user = await _context.AppUsers
                .FirstOrDefaultAsync(u => u.Email == req.Email);

            if (user == null)
                return Unauthorized();

            // TODO: verify password hash
            return Ok(user);
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}


