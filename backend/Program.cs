using Microsoft.EntityFrameworkCore;
using SnorkelExplorer.Data;
using SnorkelExplorer.Seed;
using SnorkelExplorer.Services;
using SnorkelExplorer.Settings;

var builder = WebApplication.CreateBuilder(args);

// Database with retry logic
builder.Services.AddDbContext<AppDbContext>(options =>
{
    var cs = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseMySql(cs, ServerVersion.AutoDetect(cs));
});


// Image storage service
builder.Services.AddScoped<IImageStorageService, FileSystemImageStorageService>();

// Image upload settings
builder.Services.Configure<ImageUploadSettings>(
    builder.Configuration.GetSection("ImageUpload"));

// Controllers + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Authentication / Authorization
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

// ⭐ CORS — allow localhost + production frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:5173",
                "https://happy-desert-0d8f8a910.7.azurestaticapps.net"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

var app = builder.Build();

// ⭐ Apply CORS before anything that handles requests
app.UseCors("AllowFrontend");

app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

// Controllers
app.MapControllers();

// Seed database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    SeedData.Initialize(db);
}

app.Run();
