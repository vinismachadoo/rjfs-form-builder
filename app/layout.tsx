import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { StyleSwitcher } from '@/components/style-switcher';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Header } from '@/components/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/footer';

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
          <SidebarProvider defaultOpen={true} className="h-full">
            <AppSidebar />
            <SidebarInset>
              <Header />
              {children}
              <Footer />
            </SidebarInset>
          </SidebarProvider>
          <StyleSwitcher />
          <TailwindIndicator />
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
