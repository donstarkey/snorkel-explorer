using Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SnorkelExplorer.Data
{
    public class AppDbContext : IdentityDbContext<AppUser, AppRole, int>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // DESTINATION → IMAGES (1-to-many)
            builder.Entity<Destination>()
                .HasMany(d => d.Images)
                .WithOne(i => i.Destination)
                .HasForeignKey(i => i.DestinationId)
                .OnDelete(DeleteBehavior.Cascade);

            // DESTINATION → SITES (1-to-many)
            builder.Entity<Destination>()
                .HasMany(d => d.Sites)
                .WithOne(s => s.Destination)
                .HasForeignKey(s => s.DestinationId)
                .OnDelete(DeleteBehavior.Cascade);

            // DESTINATION → STORM HISTORY (1-to-many)
            builder.Entity<Destination>()
                .HasMany(d => d.StormHistory)
                .WithOne(s => s.Destination)
                .HasForeignKey(s => s.DestinationId)
                .OnDelete(DeleteBehavior.Cascade);

            // DESTINATION → REPORTS (1-to-many)
            builder.Entity<Destination>()
                .HasMany(d => d.Reports)
                .WithOne(r => r.Destination)
                .HasForeignKey(r => r.DestinationId)
                .OnDelete(DeleteBehavior.Cascade);

            // DESTINATION → FISHLIFE (1-to-1)
            builder.Entity<Destination>()
                .HasOne(d => d.FishLife)
                .WithOne(f => f.Destination)
                .HasForeignKey<FishLifeScore>(f => f.DestinationId)
                .OnDelete(DeleteBehavior.Cascade);

            // DESTINATION → WEATHER (1-to-1)
            builder.Entity<Destination>()
                .HasOne(d => d.Weather)
                .WithOne(w => w.Destination)
                .HasForeignKey<WeatherData>(w => w.DestinationId)
                .OnDelete(DeleteBehavior.Cascade);

            // DestinationImage → AppUser (optional uploader)
            builder.Entity<DestinationImage>()
                .HasOne(i => i.UploadedBy)
                .WithMany()
                .HasForeignKey(i => i.UploadedById)
                .OnDelete(DeleteBehavior.SetNull);

            // Prevent duplicate images per destination
            builder.Entity<DestinationImage>()
                .HasIndex(di => new { di.DestinationId, di.Url })
                .IsUnique();

            builder.Entity<Destination>()
                .HasMany(d => d.BestTime)
                .WithOne(b => b.Destination)
                .HasForeignKey(b => b.DestinationId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<Destination> Destinations { get; set; }
        public DbSet<DestinationImage> DestinationImages { get; set; }
        public DbSet<SnorkelSite> SnorkelSites { get; set; }
        public DbSet<StormRecord> StormRecords { get; set; }
        public DbSet<WeatherData> WeatherData { get; set; }
        public DbSet<FieldReport> FieldReports { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<AppRole> AppRoles { get; set; }
    }
}
