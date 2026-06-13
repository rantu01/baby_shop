import { CompanyProvider } from '@/providers/CompanyContext';
import { ToastProvider } from '@/providers/ToastContext';
import { ThemeProvider } from '@/providers/ThemeContext';
import MainLayout from '@/components/layout/MainLayout';
import './globals.css';

export const metadata = {
  title: 'Enterprise Platform - Baby Shop Ltd & SNS',
  description: 'AI-Powered ERP & Business Automation System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <CompanyProvider>
            <ToastProvider>
              <MainLayout />
            </ToastProvider>
          </CompanyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
