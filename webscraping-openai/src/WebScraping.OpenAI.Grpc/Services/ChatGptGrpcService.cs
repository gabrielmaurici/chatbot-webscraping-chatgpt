using Grpc.Core;
using WebScraping.OpenAI.Application.Interfaces.OpenAI;

namespace WebScraping.OpenAI.Grpc.Services;

public class ChatGptGrpcService(IChatGptApllication chatGptApplication) : ChatGpt.ChatGptBase
{
    private readonly IChatGptApllication _chatGptApplication = chatGptApplication;

    public override async Task<AskQuestionReply> AskQuestion(AskQuestionRequest request, ServerCallContext context)
    {
        var response = await _chatGptApplication.AskQuestion(request.Ask);
        return new AskQuestionReply {
            ResponseIA = response
        };
    }

}