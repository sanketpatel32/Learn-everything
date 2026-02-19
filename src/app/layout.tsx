import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DSA & System Design Roadmap',
  description: 'Interactive roadmap for cracking FAANG interviews',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-background text-foreground min-h-screen selection:bg-indigo-500/30">
        {children}
      </body>
    </html>
  );
}
