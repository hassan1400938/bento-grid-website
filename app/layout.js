import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Import Bebas Neue font with the desired weights/styles
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"], // you can add weights if needed
  variable: "--font-bebas-neue",
});

export const metadata = {
  title: "Gron's Dodgeball",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebasNeue.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
