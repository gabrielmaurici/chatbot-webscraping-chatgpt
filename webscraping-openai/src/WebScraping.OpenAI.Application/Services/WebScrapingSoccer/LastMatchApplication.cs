using Microsoft.Extensions.Caching.Memory;
using WebScraping.OpenAI.Application.Interfaces.WebScrapingSoccer;
using WebScraping.OpenAI.Domain.Models.WebScraping;
using WebScraping.OpenAI.Infrastructure.Services.LastMatchServices.AbstractService;
using WebScraping.OpenAI.Infrastructure.Services.LastMatchServices.ConcretServices;

namespace WebScraping.OpenAI.Application.Services.WebScrapingSoccer;

public class LastMatchApplication(IMemoryCache memoryCache) : ILastMatchApplication
{
    private readonly IMemoryCache _memoryCache = memoryCache;

    public async Task<string> Get(string team)
    {
        var cacheKey = "lastMatch" + team;

        var lastMatchCache = _memoryCache.Get<LastMatchModel>(cacheKey);
        if(lastMatchCache != null)
            return lastMatchCache.ToString();

        WebScrapingLastMatchService webScrapingService = team switch {
            "Fluminense" => new FluminenseLastMatchService(),
            "Flamengo" => new FlamengoLastMatchService(),
            "Brusque" => new BrusqueLastMatchService(),
            _ => throw new Exception("Nenhum time correspondente")
        };

        var response = await webScrapingService.ExecuteScraping();
        _memoryCache.Set(cacheKey, response, TimeSpan.FromMinutes(15));

        return response.ToString();
    }
}