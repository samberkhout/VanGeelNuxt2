using Microsoft.Maui.Controls;

namespace SpotifyQRPlayer;

public partial class App : Application
{
    public App()
    {
        InitializeComponent();
        MainPage = new NavigationPage(new MainPage());
    }
}
