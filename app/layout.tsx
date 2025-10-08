// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes"; // if not installed, skip this block

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* pre-hydration guard: if any saved theme exists, prefer dark */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var k='theme';
                var v=localStorage.getItem(k);
                if(!v || v==='dark') document.documentElement.classList.add('dark');
                else document.documentElement.classList.remove('dark');
              } catch(_) {}
            `,
          }}
        />
      </head>
      <body>
        {/* If you use next-themes, configure it to stop flipping to light */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="theme"
        >
          {children}
        </ThemeProvider>
        {/* If you DON'T use next-themes, you can remove ThemeProvider entirely */}
      </body>
    </html>
  );
}
