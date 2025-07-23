"use client";

export default function WhatsAppWidget() {
  return (
    <iframe
      src="/widgets/whatsapp.html"
      className="w-full h-full rounded-3xl overflow-hidden"
      loading="lazy"
    />
  );
}
