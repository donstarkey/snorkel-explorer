
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SnorkelExplorer.Services
{
    public class FileSystemImageStorageService : IImageStorageService
    {
        private readonly string _imagesRoot;

        public FileSystemImageStorageService(IWebHostEnvironment env)
        {
            var webRoot = env.WebRootPath ?? "wwwroot";
            _imagesRoot = Path.Combine(webRoot, "images");
            Directory.CreateDirectory(_imagesRoot);
        }

        public async Task<string> SaveImageAsync(IFormFile file, string destinationName, string type)
        {
            if (file == null || file.Length == 0)
                throw new InvalidOperationException("Empty file.");

            var ext = Path.GetExtension(file.FileName).ToLower();
            var allowed = new[] { ".jpg", ".jpeg", ".png", ".webp" };
            if (!allowed.Contains(ext))
                throw new InvalidOperationException("Unsupported file type.");

            var safeName = destinationName
                .ToLower()
                .Replace(" ", "-")
                .Replace("'", "");

            var safeType = type.ToLower();

            var fileName = $"{safeName}-{safeType}-{Guid.NewGuid()}{ext}";
            var fullPath = Path.Combine(_imagesRoot, fileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"/images/{fileName}";
        }

        public Task<bool> DeleteImageAsync(string relativePath)
        {
            if (string.IsNullOrWhiteSpace(relativePath))
                return Task.FromResult(false);

            if (relativePath.StartsWith("/"))
                relativePath = relativePath.TrimStart('/');

            var fullPath = Path.Combine("wwwroot", relativePath.Replace('/', Path.DirectorySeparatorChar));

            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
                return Task.FromResult(true);
            }

            return Task.FromResult(false);
        }
    }
}
