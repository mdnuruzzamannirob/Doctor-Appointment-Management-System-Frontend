import type { Metadata } from "next";
import { Open_Sans } from "next/font/google"; //Geist_Mono
import "../styles/globals.css";
import { ReactNode } from "react";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doctor Appointment Management System",
  description: "Manage your doctor appointments efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} antialiased`}
        suppressHydrationWarning={false}
      >
        {children}
      </body>
    </html>
  );
}
