import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { StyleSwitcher } from '@/components/style-switcher';
import { TailwindIndicator } from '@/components/tailwind-indicator';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Form Builder - Create JSON Schema Forms',
  description: 'A powerful drag-and-drop form builder that generates JSON Schema',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header className="flex h-12 border-b shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div></div>
            <ModeToggle />
          </header>
          <div className="flex flex-1 flex-col gap-4 h-svh">{children}</div>
          <StyleSwitcher />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
