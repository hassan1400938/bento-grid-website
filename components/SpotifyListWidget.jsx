"use client";

export default function SpotifyListWidget() {
  return (
    <iframe
      src="/widgets/spotify.html"
      className="w-full h-full rounded-3xl overflow-hidden"
      loading="lazy"
    />
  );
}
