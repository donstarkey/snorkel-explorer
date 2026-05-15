
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace SnorkelExplorer.Services
{
    public interface IImageStorageService
    {
        Task<string> SaveImageAsync(IFormFile file, string destinationName, string type);
        Task<bool> DeleteImageAsync(string relativePath);
    }
}
