using Microsoft.Maui.Controls;
using ZXing.Net.Maui;
using ZXing.Net.Maui.Controls;
using SpotifyQRPlayer.Services;

namespace SpotifyQRPlayer.Pages;

public partial class ScanPage : ContentPage
{
    private readonly SpotifyService _spotify;
    public ScanPage(SpotifyService spotify)
    {
        InitializeComponent();
        _spotify = spotify;
        ScannerView.Options = new BarcodeReaderOptions
        {
            Formats = BarcodeFormats.QrCode
        };
    }

    private async void OnDetected(object sender, BarcodeDetectionEventArgs e)
    {
        var result = e.Results.FirstOrDefault();
        if (result == null)
            return;

        ScannerView.IsDetecting = false;
        if (!_spotify.IsSpotifyTrackUrl(result.Value, out var trackId))
        {
            await DisplayAlert("Fout", "Geen geldige Spotify track", "OK");
            await Navigation.PopAsync();
            return;
        }

        if (!await _spotify.EnsureAuthenticated())
        {
            await DisplayAlert("Fout", "Login mislukt", "OK");
            await Navigation.PopAsync();
            return;
        }

        var success = await _spotify.PlayTrack(trackId);
        if (success)
            await DisplayAlert("", "\uD83C\uDF7B Track speelt af...", "OK");
        else
            await DisplayAlert("Geen apparaat", "Open Spotify op een apparaat en probeer opnieuw.", "OK");
        await Navigation.PopAsync();
    }
}
