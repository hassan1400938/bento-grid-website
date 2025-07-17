// app/widgets.js
import SpotifyListWidget from "@/components/SpotifyListWidget";
import WhatsappWidget from "@/components/WhatsAppWidget";
import CalendarWidget from "@/components/CalendarWidget";
import DiscordWidget from "@/components/DiscordWidget";
import ClinicWidget from "@/components/ClinicWidget";
import TixMembershipWidget from "@/components/TixMembershipWidget";
export const widgets = [
  {
    id: 1,
    component: <SpotifyListWidget />,
    col: "col-span-6 md:col-span-3",
    row: "row-span-2",
  },
  {
    id: 2,
    component: <WhatsappWidget />,
    col: "col-span-6 md:col-span-3",
    row: "row-span-2",
  },
  {
    id: 3,
    component: <CalendarWidget />,
    col: "col-span-6 md:col-span-3",
    row: "row-span-2",
  },
  {
    id: 4,
    component: <ClinicWidget />,
    col: "col-span-6 md:col-span-3",
    row: "row-span-4",
  },
  {
    id: 5,
    component: <DiscordWidget />,
    col: "col-span-6 md:col-span-3",
    row: "row-span-2",
  },
  {
    id: 6,
    component: <div></div>,
    col: "col-span-12 md:col-span-6",
    row: "row-span-2",
  },
  {
    id: 7,
    component: <TixMembershipWidget />,
    col: "col-span-12 md:col-span-6",
    row: "row-span-4",
  },
  // Add more...
];
