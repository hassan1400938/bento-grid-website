"use client";

export default function SpotifyListWidget() {
  return (
    <iframe
      src="/widgets/spotify.html"
      className="w-full h-full overflow-hidden"
      loading="lazy"
    />
  );
}
