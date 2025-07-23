import SpotifyListWidget from "@/components/SpotifyListWidget";
import WhatsappWidget from "@/components/WhatsAppWidget";
import CalendarWidget from "@/components/CalendarWidget";
import DiscordWidget from "@/components/DiscordWidget";
import ClinicWidget from "@/components/ClinicWidget";
import TixMembershipWidget from "@/components/TixMembershipWidget";

export const widgets = [
  // Left column: two small widgets stacked (3 cols each)
  {
    id: 1,
    component: <SpotifyListWidget />,
    col: "col-span-10 md:col-span-4",
    row: "row-span-2",
  },
  {
    id: 2,
    component: <WhatsappWidget />,
    col: "col-span-10 md:col-span-4",
    row: "row-span-2",
  },
  {
    id: 3,
    component: <TixMembershipWidget />,
    col: "col-span-20 md:col-span-8",
    row: "row-span-4",
  },
  {
    id: 4,
    component: <ClinicWidget />,
    col: "col-span-10 md:col-span-4",
    row: "row-span-4",
  },
  {
    id: 5,
    component: <CalendarWidget />,
    col: "col-span-10 md:col-span-4",
    row: "row-span-2",
  },
  {
    id: 6,
    component: <DiscordWidget />,
    col: "col-span-10 md:col-span-4",
    row: "row-span-2",
  },
];
