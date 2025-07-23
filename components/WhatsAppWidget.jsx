"use client";

export default function WhatsAppWidget() {
  return (
    <iframe
      src="/widgets/whatsapp.html"
      className="w-full h-full overflow-hidden"
      loading="lazy"
    />
  );
}
