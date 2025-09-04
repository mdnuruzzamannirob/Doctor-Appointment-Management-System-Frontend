import type { Metadata } from "next";
import { Open_Sans } from "next/font/google"; //Geist_Mono
import "../styles/globals.css";
import { ReactNode } from "react";
import { AppProviders } from "@/components/providers";
import { Toaster } from "sonner";

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
        <AppProviders>
          {children}
          <Toaster expand={true} richColors closeButton />
        </AppProviders>
      </body>
    </html>
  );
}
