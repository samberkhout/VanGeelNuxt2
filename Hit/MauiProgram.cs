using Microsoft.Maui;
using Microsoft.Maui.Hosting;
using ZXing.Net.Maui.Controls;
using ZXing.Net.Maui;

namespace SpotifyQRPlayer;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .UseBarcodeReader();
        return builder.Build();
    }
}
