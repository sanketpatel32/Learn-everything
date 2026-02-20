import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DSA & System Design Roadmap',
  description: 'Interactive roadmap for cracking FAANG interviews',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22%236366f1%22 /><circle cx=%2250%22 cy=%2250%22 r=%2220%22 fill=%22%23a855f7%22 /></svg>',
  },
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
