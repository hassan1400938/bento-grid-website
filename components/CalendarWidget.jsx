"use client";

export default function CalendarWidget() {
  return (
    <iframe
      src="../widgets/calendar.html"
      className="w-full h-full rounded-3xl overflow-hidden"
      loading="lazy"
    />
  );
}
