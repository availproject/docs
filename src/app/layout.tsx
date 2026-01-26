import './global.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import Topbar from '@/components/layout/top-bar';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.availproject.org'
  ),
  title: {
    default: 'Avail Documentation',
    template: '%s | Avail Docs',
  },
  description: 'Documentation for Avail - the Web3 infrastructure layer for data availability',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="font-sans" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Topbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
