import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

export const jetbrains = JetBrains_Mono({
  weight: "variable",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrains.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
