import type { Metadata } from "next";
import { Sofia_Sans, Pacifico } from "next/font/google";
import "./globals.css";

const sofiaSans = Sofia_Sans({ subsets: ["latin"], variable: '--font-sofia-sans' });
const pacifico = Pacifico({
  weight: '400',
  subsets: ["latin"],
  variable: '--font-pacifico'
});

export const metadata: Metadata = {
  title: "Sleepycare - Premium Wipes for Every Need",
  description: "Shop high-quality surface wipes, floor wipes, and super clean series. Eco-friendly, safe, and effective cleaning solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sofiaSans.variable} ${pacifico.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
