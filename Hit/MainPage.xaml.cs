using Microsoft.Maui.Controls;
using SpotifyQRPlayer.Services;
using SpotifyQRPlayer.Pages;

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
        await Navigation.PushAsync(new ScanPage(_spotify));
    }
}
