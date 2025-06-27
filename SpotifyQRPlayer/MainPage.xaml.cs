using ZXing.Net.Maui;
using Microsoft.Maui.Controls;
using SpotifyQRPlayer.Services;

namespace SpotifyQRPlayer;

public partial class MainPage : ContentPage
{
    private readonly SpotifyService _spotify;

    public MainPage()
    {
        InitializeComponent();
        _spotify = new SpotifyService();
    }

    private async void OnScanQrClicked(object sender, EventArgs e)
    {
        StatusLabel.Text = string.Empty;
        var scanResult = await BarcodeScanner.Default.ScanAsync();
        if (scanResult?.Value is null)
            return;

        if (!_spotify.IsSpotifyTrackUrl(scanResult.Value, out var trackId))
        {
            await DisplayAlert("Fout", "Geen geldige Spotify track", "OK");
            return;
        }

        if (!await _spotify.EnsureAuthenticated())
        {
            await DisplayAlert("Fout", "Login mislukt", "OK");
            return;
        }

        var success = await _spotify.PlayTrack(trackId);
        if (success)
            StatusLabel.Text = "\uD83C\uDF7B Track speelt af...";
        else
            await DisplayAlert("Geen apparaat", "Open Spotify op een apparaat en probeer opnieuw.", "OK");
    }
}
