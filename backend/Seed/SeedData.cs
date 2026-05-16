using Api.Models;
using Microsoft.EntityFrameworkCore;
using SnorkelExplorer.Data;

namespace SnorkelExplorer.Seed
{
    public static class SeedData
    {
        public static void Initialize(AppDbContext db)
        {
            // Ensure DB exists
            db.Database.Migrate();

            // Prevent double-seeding
            if (db.Destinations.Any())
                return;

            // -------------------------
            // 1. Roatán
            // -------------------------
            var roatan = new Destination
            {
                Name = "Roatán",
                Country = "Honduras",
                Description = "A Caribbean island known for world-class snorkeling, coral reefs, and calm turquoise waters.",
                Guide = "Roatán offers some of the best shallow reefs in the Caribbean.",
                MapEmbed = "<iframe>...</iframe>",

                Species = new() { "Parrotfish", "Angelfish", "Sea Turtles", "Eagle Rays" },
                Videos = new() { "https://www.youtube.com/watch?v=roatan1" },

                Images = new()
                {
                    new DestinationImage { Url = "/images/roatan/primary.jpg", Type = "Primary" },
                    new DestinationImage { Url = "/images/roatan/hero1.jpg", Type = "Hero" },
                    new DestinationImage { Url = "/images/roatan/hero2.jpg", Type = "Hero" },
                    new DestinationImage { Url = "/images/roatan/gallery1.jpg", Type = "Gallery" },
                    new DestinationImage { Url = "/images/roatan/gallery2.jpg", Type = "Gallery" }
                },

                Sites = new()
                {
                    new SnorkelSite { Name = "West Bay", Description = "Calm waters, shallow reefs.", Depth = 15, Visibility = 75, Latitude =   16.276478, Longitude = -86.596840, Difficulty = "Moderate"},
                    new SnorkelSite { Name = "Blue Channel", Description = "Deep channel with vibrant coral.", Depth = 40, Visibility = 70, Latitude=16.3833, Longitude=86.400,Difficulty="Moderate" }
                },

                FishLife = new FishLifeScore
                {
                    Score = 9,
                    Notes = "Extremely active reef life."
                },

                StormHistory = new()
                {
                    new StormRecord { Name = "Storm A", Year = 2020, Severity = "Moderate" },
                    new StormRecord { Name = "Storm B", Year = 2022, Severity = "High" }
                },

                Weather = new WeatherData
                {
                    AvgTemp = 82,
                    AvgVisibility = 70,
                    AvgWaves = 2,
                    WindSpeed = 7
                },

                BestTime = new()
                {
                    new BestTimeScore { Month = "Jan", Score = 8 },
                    new BestTimeScore { Month = "Feb", Score = 9 }
                },

                Reports = new()
                {
                    new FieldReport { UserName = "ExplorerJoe", ReportText = "Amazing coral and calm water.", CreatedAt = DateTime.UtcNow.AddDays(-10) },
                    new FieldReport { UserName = "AquaGirl", ReportText = "Saw turtles and rays!", CreatedAt = DateTime.UtcNow.AddDays(-3) }
                }
            };

            // -------------------------
            // 2. Bonaire
            // -------------------------
            var bonaire = new Destination
            {
                Name = "Bonaire",
                Country = "Netherlands Antilles",
                Description = "A diver’s paradise with pristine reefs and unmatched water clarity.",
                Guide = "Bonaire is known for shore-access snorkeling.",
                MapEmbed = "<iframe>...</iframe>",

                Species = new() { "Trumpetfish", "Butterflyfish", "Moray Eels" },
                Videos = new() { "https://www.youtube.com/watch?v=bonaire1" },

                Images = new()
                {
                    new DestinationImage { Url = "/images/bonaire/primary.jpg", Type = "Primary" },
                    new DestinationImage { Url = "/images/bonaire/hero1.jpg", Type = "Hero" },
                    new DestinationImage { Url = "/images/bonaire/gallery1.jpg", Type = "Gallery" }
                },

                Sites = new()
                {
                    new SnorkelSite { Name = "1000 Steps", Description = "Crystal clear water and turtles.", Depth = 25, Visibility=85, Latitude = 12.21063,  Longitude = -68.32168, Difficulty="Moderate" },
                    new SnorkelSite { Name = "Salt Pier", Description = "Iconic pier with huge schools of fish.", Depth = 35, Visibility=85, Latitude = 12.08339,  Longitude = -68.28156, Difficulty="Advanced" },
                    new SnorkelSite { Name = "Karpata", Description = "Very mature snorkel area, best soft corral on island", Depth = 35, Visibility=85, Latitude = 12.21950,  Longitude = -68.35198, Difficulty="Advanced"  }

                },

                FishLife = new FishLifeScore
                {
                    Score = 10,
                    Notes = "Some of the healthiest reefs in the world."
                },

                StormHistory = new()
                {
                    new StormRecord { Name = "Storm C", Year = 2017, Severity = "Low" }
                },

                Weather = new WeatherData
                {
                    AvgTemp = 84,
                    AvgVisibility = 90,
                    AvgWaves = 1
                },

                BestTime = new()
                {
                    new BestTimeScore { Month = "Jan", Score = 9 },
                    new BestTimeScore { Month = "Feb", Score = 9 }
                },

                Reports = new()
                {
                    new FieldReport { UserName = "ReefMaster", ReportText = "Best visibility I've ever seen.", CreatedAt = DateTime.UtcNow.AddDays(-20) }
                }
            };

            // -------------------------
            // 3. Turks & Caicos
            // -------------------------
            var turks = new Destination
            {
                Name = "Turks & Caicos",
                Country = "United Kingdom",
                Description = "Crystal-clear waters, shallow reefs, and some of the best visibility in the Caribbean.",
                Guide = "Grace Bay and Smith’s Reef offer world-class snorkeling.",
                MapEmbed = "<iframe>...</iframe>",

                Species = new() { "Reef Sharks", "Turtles", "Angelfish" },
                Videos = new() { "https://www.youtube.com/watch?v=turks1" },

                Images = new()
                {
                    new DestinationImage { Url = "/images/turks/primary.jpg", Type = "Primary" },
                    new DestinationImage { Url = "/images/turks/hero1.jpg", Type = "Hero" },
                    new DestinationImage { Url = "/images/turks/gallery1.jpg", Type = "Gallery" }
                },

                Sites = new()
                {
                    new SnorkelSite { Name = "Smith’s Reef", Description = "Beginner-friendly reef with turtles.  Be aware of marina boats", Depth = 20, Visibility = 80, Latitude =21.7865 , Longitude = 72.2296, Difficulty="Moderate" },
                    new SnorkelSite { Name = "Grace Bay", Description = "By boat but Excellent coral growth and big fish including sharks.", Depth = 20, Visibility = 80,  Latitude =21.7997 , Longitude = 72.1683, Difficulty="Moderate" }
                },

                FishLife = new FishLifeScore
                {
                    Score = 9,
                    Notes = "Excellent visibility and active reef life."
                },

                StormHistory = new()
                {
                    new StormRecord { Name = "Hurricane Irma", Year = 2017, Severity = "High" }
                },

                Weather = new WeatherData
                {
                    AvgTemp = 83,
                    AvgVisibility = 85,
                    AvgWaves = 2
                },

                BestTime = new()
                {
                    new BestTimeScore { Month = "Jan", Score = 8 },
                    new BestTimeScore { Month = "Feb", Score = 9 }
                }
            };

            // -------------------------
            // 4. Curaçao
            // -------------------------
            var curacao = new Destination
            {
                Name = "Curaçao",
                Country = "Netherlands Antilles",
                Description = "Colorful reefs, calm bays, and some of the best shore snorkeling in the Caribbean.",
                Guide = "Playa Lagun and Tugboat are must‑snorkel sites.",
                MapEmbed = "<iframe>...</iframe>",

                Species = new() { "Parrotfish", "Moray Eels", "Turtles" },
                Videos = new() { "https://www.youtube.com/watch?v=curacao1" },

                Images = new()
                {
                    new DestinationImage { Url = "/images/curacao/primary.jpg", Type = "Primary" },
                    new DestinationImage { Url = "/images/curacao/hero1.jpg", Type = "Hero" },
                    new DestinationImage { Url = "/images/curacao/gallery1.jpg", Type = "Gallery" }
                },

                Sites = new()
                {
                    new SnorkelSite { Name = "Tugboat", Description = "Shallow wreck with vibrant coral.", Depth = 15, Visibility = 70, Latitude=12.0694, Longitude=68.8619, Difficulty="Easy" },
                    new SnorkelSite { Name = "Directors Bay", Description = "Long swim from Tugboat or via car. Excellent coral growth best on island", Depth = 20, Visibility = 80,  Latitude =12.0658 , Longitude = 68.8602, Difficulty="Moderate" }
                },

                FishLife = new FishLifeScore
                {
                    Score = 8,
                    Notes = "Healthy reefs and great shore access."
                },

                Weather = new WeatherData
                {
                    AvgTemp = 84,
                    AvgVisibility = 75,
                    AvgWaves = 1
                },

                BestTime = new()
                {
                    new BestTimeScore { Month = "Jan", Score = 9 },
                    new BestTimeScore { Month = "Feb", Score = 9 }
                }
            };

            // -------------------------
            // 5. Cayman Islands
            // -------------------------
            var cayman = new Destination
            {
                Name = "Cayman Islands",
                Country = "United Kingdom",
                Description = "World‑famous clarity, stingrays, and dramatic drop‑offs.",
                Guide = "Stingray City and Eden Rock are iconic.",
                MapEmbed = "<iframe>...</iframe>",

                Species = new() { "Stingrays", "Tarpon", "Turtles" },
                Videos = new() { "https://www.youtube.com/watch?v=cayman1" },

                Images = new()
                {
                    new DestinationImage { Url = "/images/cayman/primary.jpg", Type = "Primary" },
                    new DestinationImage { Url = "/images/cayman/hero1.jpg", Type = "Hero" },
                    new DestinationImage { Url = "/images/cayman/gallery1.jpg", Type = "Gallery" }
                },

                Sites = new()
                {
                    new SnorkelSite { Name = "Eden Rock", Description = "Deep caverns and tarpon schools.", Depth = 40, Visibility = 90, Latitude = 19.293630, Longitude = -81.387270 },
                    new SnorkelSite { Name = "Sting Ray City", Description = "Friendly schools of sting rays, via boat", Depth = 5, Visibility = 40, Latitude = 19.3757, Longitude = -81.37783 }

                },

                FishLife = new FishLifeScore
                {
                    Score = 10,
                    Notes = "Some of the clearest water on Earth."
                },

                Weather = new WeatherData
                {
                    AvgTemp = 82,
                    AvgVisibility = 90,
                    AvgWaves = 1
                },

                BestTime = new()
                {
                    new BestTimeScore { Month = "Jan", Score = 8 },
                    new BestTimeScore { Month = "Feb", Score = 9 }
                }
            };

            // -------------------------
            // 6. Maui
            // -------------------------
            var maui = new Destination
            {
                Name = "Maui",
                Country = "United States",
                Description = "Sea turtles, volcanic reefs, and calm bays perfect for beginners.",
                Guide = "Honolua Bay and Black Rock are top snorkel spots.",
                MapEmbed = "<iframe>...</iframe>",

                Species = new() { "Green Sea Turtles", "Butterflyfish", "Reef Sharks" },
                Videos = new() { "https://www.youtube.com/watch?v=maui1" },

                Images = new()
                {
                    new DestinationImage { Url = "/images/maui/primary.jpg", Type = "Primary" },
                    new DestinationImage { Url = "/images/maui/hero1.jpg", Type = "Hero" },
                    new DestinationImage { Url = "/images/maui/gallery1.jpg", Type = "Gallery" }
                },

                Sites = new()
                {
                    new SnorkelSite { Name = "Black Rock", Description = "Turtles and calm water.  Beware of people jumping off the cliff", Depth = 25, Visibility = 50, Latitude = 20.926540, Longitude= -156.696807, Difficulty= "Easy"}
                },

                FishLife = new FishLifeScore
                {
                    Score = 9,
                    Notes = "Excellent turtle activity! Plus my favorite fish Moorish Idol. Brain Coral.  "
                },

                Weather = new WeatherData
                {
                    AvgTemp = 80,
                    AvgVisibility = 65,
                    AvgWaves = 2
                },

                BestTime = new()
                {
                    new BestTimeScore { Month = "Jan", Score = 7 },
                    new BestTimeScore { Month = "Feb", Score = 8 }
                }
            };

            // Add all destinations
            db.Destinations.AddRange(roatan, bonaire, turks, curacao, cayman, maui);

            db.SaveChanges();
        }
    }
}
