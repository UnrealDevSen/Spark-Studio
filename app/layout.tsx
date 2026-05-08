import type {Metadata} from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Spark Studio',
  description: 'AI Creator Growth Platform',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable} font-sans antialiased bg-[#05060A]`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
