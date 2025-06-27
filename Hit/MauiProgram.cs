using Microsoft.Maui;
using Microsoft.Maui.Hosting;
using ZXing.Net.Maui.Controls;

namespace SpotifyQRPlayer;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .ConfigureMauiHandlers(h =>
            {
                h.AddHandler(typeof(CameraBarcodeReaderView), typeof(CameraBarcodeReaderViewHandler));
                h.AddHandler(typeof(BarcodeGeneratorView), typeof(BarcodeGeneratorViewHandler));
            });
        return builder.Build();
    }
}
