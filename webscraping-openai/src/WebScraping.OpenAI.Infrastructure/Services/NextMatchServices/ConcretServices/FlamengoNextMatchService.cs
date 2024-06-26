using WebScraping.OpenAI.Infrastructure.Services.NextMatchServices.AbstractService;

namespace WebScraping.OpenAI.Infrastructure.Services.NextMatchServices.ConcretServices;

public class FlamengoNextMatchService : WebScrapingNextMatchService
{
    private const string urlCalendarFlamengo = "https://www.flashscore.com.br/equipe/flamengo/WjxY29qB/calendario/";
    public FlamengoNextMatchService() : base(urlCalendarFlamengo)
    {
    }
}
