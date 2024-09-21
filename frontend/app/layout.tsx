import "@/app/globals.css";
import { ThemeProvider } from '@/app/providers';
import { NavigationContextProvider } from '@/app/providers/NavigationProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from "next";
import localFont from "next/font/local";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Reconcili8",
  description: "Reconciliate your financial records.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <ThemeProvider>
            <NavigationContextProvider>
              {children}
            </NavigationContextProvider>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
