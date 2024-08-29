import 'src/global.css';

// ----------------------------------------------------------------------


// eslint-disable-next-line import/no-extraneous-dependencies

// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies

import Script from 'next/script';

import { CONFIG } from 'src/config-global';
import ColorProvider from 'src/context/colorMain';
import { ThemeProvider } from 'src/theme/theme-provider';
import { getInitColorSchemeScript } from 'src/theme/color-scheme-script';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { detectSettings } from 'src/components/settings/server';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------




export default async function RootLayout({ children }) {
  const settings = CONFIG.isStaticExport ? defaultSettings : await detectSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <title>Video-pro: האקדמיה המקצועית ליצירת תוכן וידאו</title> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="הצטרף לוידאו-פרו, האקדמיה המקצועית ליצירת תוכן וידאו. למד ליצור תוכן איכותי, הצטרף לקהילה תומכת, והרוויח מתוכן דיגיטלי."
        />
        <meta
          name="keywords"
          content="קורס יצירת תוכן, קורס וידאו, קורס שיווק דיגיטלי, יצירת תוכן מקצועי, קהילת יוצרי תוכן, הכנסה מתוכן דיגיטלי,קידום  סושיאל , ערן פרקש"
        />
        <meta name="author" content="ערן פרקש" />
        <meta name="language" content="he" />

        <meta property="og:title" content="וידאו-פרו: האקדמיה המקצועית ליצירת תוכן וידאו" />
        <meta
          property="og:description"
          content="הצטרף לוידאו-פרו, האקדמיה המקצועית ליצירת תוכן וידאו. למד ליצירת תוכן איכותי, הצטרף לקהילה תומכת, והרוויח מתוכן דיגיטלי."
        />
        <meta property="og:image" content="path/to/your/course-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com/video-pro" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="וידאו-פרו:   
 האקדמיה המקצועית ליצירת תוכן וידאו"
        />
        <meta
          name="twitter:description"
          content="הצטרף לוידאו-פרו, האקדמיה המקצועית ליצירת תוכן וידאו. למד ליצירת תוכן איכותי, הצטרף לקהילה תומכת, והרוויח מתוכן דיגיטלי."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&amp;display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alef:wght@400;500;600;700&amp;display=swap"
          rel="stylesheet"
        />

        <title>Video-pro - קורס אונליין ליצירת תוכן וידאו ומדיה חברתית | ערן פרקש</title>
        <meta
          name="description"
          content="קורס Video-pro של ערן פרקש - קורס אונליין ליצירת תוכן וידאו ומדיה חברתית. הצטרפו לאקדמיה, הקהילה הבלעדית וקבלו הדרכה ליצירת הכנסה מתוכן דיגיטלי והפכו ליוצרי תוכן מקצועיים."
        />
        <meta
          name="keywords"
          content="קורס וידאו, יצירת תוכן, תוכן דיגיטלי, הכנסה מתוכן, מדיה חברתית,סושיאל, ויראלי,ניהול סושיאל, קורס אונליין, ערן פרקש, יצירת תוכן לעסקים, קהילה, יוצרי תוכן, קהילת יוצרי תוכן, הכנסה דיגיטלית, הדרכה מקצועית"
        />
        <meta name="author" content="ערן פרקש" />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://videopro.webly.digital" />
        <meta
          property="og:title"
          content="Video-pro - קורס אונליין ליצירת תוכן וידאו ומדיה חברתית | ערן פרקש"
        />
        <meta
          property="og:description"
          content="קורס Video-pro של ערן פרקש - קורס אונליין ליצירת תוכן וידאו ומדיה חברתית. הצטרפו לאקדמיה, הקהילה הבלעדית וקבלו הדרכה ליצירת הכנסה מתוכן דיגיטלי והפכו ליוצרי תוכן מקצועיים."
        />
        <meta property="og:image" content="https://videopro.webly.digital/assets/images/Eran.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://videopro.webly.digital" />
        <meta
          property="twitter:title"
          content="Video-pro - קורס אונליין ליצירת תוכן וידאו ומדיה חברתית | ערן פרקש"
        />
        <meta
          property="twitter:description"
          content="קורס Video-pro של ערן פרקש - קורס אונליין ליצירת תוכן וידאו ומדיה חברתית. הצטרפו לאקדמיה, הקהילה הבלעדית וקבלו הדרכה ליצירת הכנסה מתוכן דיגיטלי והפכו ליוצרי תוכן מקצועיים."
        />
        <meta
          property="twitter:image"
          content="https://videopro.webly.digital/assets/images/Eran.png"
        />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'Course',
              name: 'Video-pro',
              description:
                'קורס אונליין ליצירת תוכן וידאו ומדיה חברתית של ערן פרקש. האקדמיה כוללת קורס אונליין, קהילה בלעדית והדרכות ליצירת הכנסה מתוכן דיגיטלי.',
              provider: {
                '@type': 'Organization',
                name: 'ערן פרקש',
                sameAs: 'https://yourwebsite.com',
              },
              offers: {
                '@type': 'Offer',
                url: 'https://yourwebsite.com',
                priceCurrency: 'ILS',
                price: 'XXXX', // replace with actual price
                availability: 'http://schema.org/InStock',
                validFrom: '2024-08-01',
              },
              inLanguage: 'he',
              audience: {
                '@type': 'EducationalAudience',
                educationalRole: 'Student',
                audienceType: 'Professional',
              },
            }),
          }}
        />

        <link rel="canonical" href="https://videopro.webly.digital" />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </head>

      <body suppressHydrationWarning>
        {getInitColorSchemeScript}
        <AuthProvider>
          <SettingsProvider
            settings={settings}
            caches={CONFIG.isStaticExport ? 'localStorage' : 'cookie'}
          >
            <ThemeProvider>
              <ColorProvider>
                <MotionLazy>
                  <ProgressBar />
                  <SettingsDrawer />
                  {children}
                </MotionLazy>
              </ColorProvider>
            </ThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
