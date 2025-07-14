using Microsoft.Maui;

namespace SpotifyQRPlayer;

public class Program : MauiApplication
{
    public Program() : base()
    {
    }

    protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp();

    static void Main(string[] args)
    {
        var app = new Program();
        app.Run(args);
    }
}
