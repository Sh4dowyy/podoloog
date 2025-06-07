import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://podoloog.ee'),
  title: {
    default: "Alla Hüvenen - Podoloog Tartus",
    template: "%s | Alla Hüvenen - Podoloog Tartus"
  },
  description: "Alla Hüvenen - kogenud podoloog Tartus üle 15 aasta kogemusega. Probleemne pediküür, sissekasvanud küüned, villidid, küünte seenhaigus. Проблемный педикюр в Тарту. Звоните: 5895 5153",
  keywords: [
    "podoloog Tartu",
    "probleemne pediküür",
    "sissekasvanud küüned",
    "villidid",
    "küünte seenhaigus",
    "kanna lõhed",
    "jalgade ravi",
    "подолог Тарту",
    "проблемный педикюр",
    "вросшие ногти",
    "мозоли",
    "грибок ногтей",
    "трещины пяток",
    "лечение стоп"
  ],
  authors: [{ name: "Alla Hüvenen" }],
  creator: "Alla Hüvenen",
  publisher: "Alla Hüvenen",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'et_EE',
    alternateLocale: 'ru_RU',
    url: 'https://podoloog.ee',
    siteName: 'Alla Hüvenen - Podoloog',
    title: 'Alla Hüvenen - Podoloog Tartus | Probleemne Pediküür',
    description: 'Kogenud podoloog Tartus üle 15 aasta kogemusega. Probleemne pediküür, sissekasvanud küüned, villidid, küünte seenhaigus. Tel: 5895 5153',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alla Hüvenen - Podoloog Tartus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alla Hüvenen - Podoloog Tartus | Probleemne Pediküür',
    description: 'Kogenud podoloog Tartus üle 15 aasta kogemusega. Probleemne pediküür ja jalgade ravi.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-token',
  },
  alternates: {
    canonical: 'https://podoloog.ee',
    languages: {
      'et': 'https://podoloog.ee',
      'ru': 'https://podoloog.ee',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Alla Hüvenen - Podoloog',
    description: 'Kogenud podoloog Tartus üle 15 aasta kogemusega. Probleemne pediküür, sissekasvanud küüned, villidid, küünte seenhaigus.',
    image: 'https://podoloog.ee/og-image.jpg',
    telephone: '+372 5895 5153',
    url: 'https://podoloog.ee',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tartu',
      addressCountry: 'EE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 58.3776,
      longitude: 26.7290,
    },
    openingHours: 'Mo-Su 09:00-18:00',
    priceRange: '€€',
    areaServed: {
      '@type': 'City',
      name: 'Tartu',
    },
    medicalSpecialty: 'Podiatry',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Podoloogia teenused',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Probleemne pediküür',
            description: 'Professionaalne probleemse pediküüri teenus',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Sissekasvanud küünte ravi',
            description: 'Sissekasvanud küünte professionaalne ravi',
          },
        },
      ],
    },
    founder: {
      '@type': 'Person',
      name: 'Alla Hüvenen',
      jobTitle: 'Podoloog',
      worksFor: {
        '@type': 'MedicalBusiness',
        name: 'Alla Hüvenen - Podoloog',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '50',
    },
  };

  return (
    <html lang="et">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <meta name="geo.region" content="EE-TA" />
        <meta name="geo.placename" content="Tartu" />
        <meta name="geo.position" content="58.3776;26.7290" />
        <meta name="ICBM" content="58.3776, 26.7290" />
        <link rel="canonical" href="https://podoloog.ee" />
      </head>
      <body
        className={twMerge(
          inter.className,
          "flex antialiased h-screen overflow-hidden bg-gray-100"
        )}
      >
        <LanguageProvider>
          <AuthProvider>
            <Sidebar />
            <div className="lg:pl-2 lg:pt-2 bg-gray-100 flex-1 overflow-y-auto">
              <div className="flex-1 bg-white min-h-screen lg:rounded-tl-xl border border-transparent lg:border-neutral-200 overflow-y-auto flex flex-col">
                <div className="flex-1">
                  {children}
                </div>
                <Footer />
              </div>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
