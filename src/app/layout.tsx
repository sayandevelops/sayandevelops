import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SayanDevelops Portfolio',
  description:
 'Discover the work of Sayan Mondal at SayanDevelops — a skilled full-stack developer building future-ready websites, apps, and AI/ML-powered solutions. Available for freelance and collaboration.',
  keywords: [
    'SayanDevelops',
    'Web Developer',
    'AI Enthusiast',
    'Portfolio',
    'React',
    'Next.js',
    'Tailwind CSS',
    'Frontend Developer',
    'Full Stack Developer',
    'JavaScript',
    'Python',
    'SEO',
    'UI/UX',
    'Freelance Developer',
    'Open Source',
    'Modern Web',
    'GSAP',
    'Firebase',
    'TensorFlow',
    'Developer Portfolio'
  ],
  authors: [{ name: 'Sayan', url: 'https://sayandevelops.vercel.app/' }],
  creator: 'Sayan',
  publisher: 'SayanDevelops',
  metadataBase: new URL('https://sayandevelops.vercel.app/'),
  openGraph: {
    title: 'SayanDevelops | Web Developer & AI Enthusiast Portfolio',
    description:
      'Explore the portfolio of Sayan, a passionate Web Developer and AI enthusiast. Discover modern web projects, AI integrations, UI/UX design, and innovative solutions.',
    url: 'https://sayandevelops.vercel.app/',
    siteName: 'SayanDevelops',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SayanDevelops Portfolio Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SayanDevelops Portfolio',
    description:
      'Explore the portfolio of Sayan, a passionate Web Developer and AI enthusiast. Discover modern web projects, AI integrations, UI/UX design, and innovative solutions.',
    images: ['/og-image.png'],
    creator: '@hustlewithsayan',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  icons: {
    icon: '/sayanlogo.png',
    shortcut: '/sayanlogo.png',
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#0f172a',
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}