export function buildSpotifyLink(artist, title) {
    const query = encodeURIComponent(`${artist} ${title}`);
    return `https://open.spotify.com/search/${query}`;
  }
  