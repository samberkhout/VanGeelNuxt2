using System.Text.Json;
using Microsoft.Maui.Authentication;

namespace SpotifyQRPlayer.Services;

public class SpotifyService
{
    private const string ClientId = "YOUR_SPOTIFY_CLIENT_ID"; // TODO: replace
    private const string RedirectUri = "myapp://callback"; // match Platforms config
    private const string Scope = "streaming user-read-playback-state user-modify-playback-state";

    private string? _accessToken;

    public bool IsSpotifyTrackUrl(string url, out string trackId)
    {
        trackId = string.Empty;
        if (!url.StartsWith("https://open.spotify.com/track/"))
            return false;
        var id = url.Split('/').LastOrDefault()?.Split('?').FirstOrDefault();
        if (string.IsNullOrEmpty(id))
            return false;
        trackId = id;
        return true;
    }

    public async Task<bool> EnsureAuthenticated()
    {
        if (!string.IsNullOrEmpty(_accessToken))
            return true;

        var authUrl = $"https://accounts.spotify.com/authorize?client_id={ClientId}&response_type=token&redirect_uri={Uri.EscapeDataString(RedirectUri)}&scope={Uri.EscapeDataString(Scope)}";
        var authResult = await WebAuthenticator.Default.AuthenticateAsync(new Uri(authUrl), new Uri(RedirectUri));
        if (authResult.Properties.TryGetValue("access_token", out var token))
        {
            _accessToken = token;
            return true;
        }
        return false;
    }

    public async Task<bool> PlayTrack(string trackId)
    {
        if (string.IsNullOrEmpty(_accessToken))
            return false;

        using var http = new HttpClient();
        http.DefaultRequestHeaders.Authorization = new("Bearer", _accessToken);

        var devicesResp = await http.GetAsync("https://api.spotify.com/v1/me/player/devices");
        if (!devicesResp.IsSuccessStatusCode)
            return false;
        var json = await devicesResp.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(json);
        var active = doc.RootElement.GetProperty("devices").EnumerateArray().Any(d => d.GetProperty("is_active").GetBoolean());
        if (!active)
            return false;

        var playUri = "https://api.spotify.com/v1/me/player/play";
        var body = JsonSerializer.Serialize(new { uris = new[] { $"spotify:track:{trackId}" } });
        var playResp = await http.PutAsync(playUri, new StringContent(body, System.Text.Encoding.UTF8, "application/json"));
        return playResp.IsSuccessStatusCode;
    }
}
