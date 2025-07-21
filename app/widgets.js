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
    col: "col-span-6 md:col-span-3",
    row: "row-span-2",
  },
  {
    id: 2,
    component: <TixMembershipWidget />,
    col: "col-span-12 md:col-span-6",
    row: "row-span-4",
  },
  {
    id: 3,
    component: <WhatsappWidget />,
    col: "col-span-6 md:col-span-3",
    row: "row-span-2",
  },
  // Middle large widget (4 cols wide, taller)
  {
    id: 4,
    component: <CalendarWidget />,
    col: "col-span-6 md:col-span-3",
    row: "row-span-2",
  },
  {
    id: 5,
    component: <DiscordWidget />,
    col: "col-span-6 md:col-span-3",
    row: "row-span-2",
  },
  {
    id: 4,
    component: <ClinicWidget />,
    col: "col-span-12 md:col-span-3",
    row: "row-span-4",
  },
];
