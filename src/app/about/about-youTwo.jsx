import { m } from 'framer-motion';
import { useContext } from 'react';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box, Card, Grid, Container, CardMedia, CardContent, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { ColorContext } from 'src/context/colorMain';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

const halfWave = (mode) => (
  <svg
    className="absolute -bottom-8 max-sm:-bottom-4 max-sm:left-2 h-auto w-full z-10  origin-center"
    style={{ transform: 'scale(2)' }}
    viewBox="0 0 2880 480"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2160 0C1440 240 720 240 720 240H0v240h2880V0h-720z"
      fill={mode === 'dark' ? '#141A21' : '#FFF'}
    />
  </svg>
);

// ----------------------------------------------------------------------
// const bulletsWithIcons2 = [
//   {
//     title: 'מקצוע דיגיטלי מבוקש',
//     text: 'מקצוע דיגיטלי מבוקש, ללא קשר לפלטפורמה המועדפת עליכם',
//     icons: ['logos:youtube-icon', 'logos:tiktok-icon', 'skill-icons:instagram', 'logos:facebook'],
//     imageUrl: `https://picsum.photos/seed/${Math.random()}/300/200`,
//   },
//   {
//     title: 'ליצור תוכן ולהרוויח',
//     text: 'ליצור תוכן ולהרוויח כסף מכל מקום ובכל זמן',
//     icons: ['svg-spinners:wifi', 'twemoji:laptop', 'flat-color-icons:globe'],
//     imageUrl: `https://picsum.photos/seed/${Math.random()}/300/200`,
//   },
//   {
//     title: 'לבנות לעצמכם קהילה אותנטית',
//     text: 'לבנות קהילה אותנטית שתהווה עבורכם מקור הכנסה וקהל שאוהב אתכם',
//     icons: ['mdi:account-group-outline', 'material-symbols:animated-images'],
//     imageUrl: `https://picsum.photos/seed/${Math.random()}/300/200`,
//   },
//   {
//     title: 'השקעה שמחזירה את עצמה',
//     text: 'ההשקעה חוזרת - נחבר אתכם לפרויקט ראשון בתשלום לאחר הכנת תיק עבודות',
//     icons: ['bytesize:portfolio', 'game-icons:money-stack', 'mdi:film-open-star-outline'],
//     imageUrl: `https://picsum.photos/seed/${Math.random()}/300/200`,
//   },
//   {
//     title: 'להצטרף לקהילה איכותית',
//     text: 'קבוצת פרטית של יוצרי תוכן עם תכני העשרה, טיפים והדרכות להמשך הדרך',
//     icons: ['logos:whatsapp-icon', 'emojione:books'],
//     imageUrl: `https://picsum.photos/seed/${Math.random()}/300/200`,
//   },
//   {
//     title: 'התחייבות מלאה',
//     text: 'לא אהבתם ? תקבלו את כספכם בחזרה',
//     icons: ['mdi:cash-refund', 'pajamas:partner-verified'],
//     imageUrl: `https://picsum.photos/seed/${Math.random()}/300/200`,
//   },
// ];
const bulletsWithIcons = [
  {
    title: 'מקצוע דיגיטלי מבוקש',
    text: '46%  מהיוצרים עם ניסיון של 4 שנים ומעלה מרוויחים מעל 20,000 $  בשנה / 78% מהיוצרים במשרה מלאה מרוויחים מעל 23,500 $ בשנה.',
    icons: ['logos:youtube-icon', 'logos:tiktok-icon', 'skill-icons:instagram', 'logos:facebook'],
    imageUrl: `${CONFIG.site.basePath}/assets/background/back1.jpg`,
    imageUrl2: `https://picsum.photos/seed/${Math.random()}/300/200`,
  },
  {
    title: 'ליצור תוכן בכל זמן ומקום',
    text: 'ליצור תוכן מקורי שמותאם לאורך החיים שלכם ולהרוויח כסף מכל מקום ובכל זמן',
    icons: ['svg-spinners:wifi', 'twemoji:laptop', 'flat-color-icons:globe'],
    imageUrl: `${CONFIG.site.basePath}/assets/background/back2.jpg`,
    imageUrl2: `https://picsum.photos/seed/${Math.random()}/300/200`,
  },
  {
    title: 'לבנות לעצמכם קהילה אותנטית',
    text: 'לבנות קהילה אותנטית שתהווה בשבילכם בסיס קשרים אסטרטגי בנישה שלכם לכל פעילות עתידית',
    icons: ['mdi:account-group-outline', 'material-symbols:animated-images'],
    imageUrl: `${CONFIG.site.basePath}/assets/background/back3.jpg`,
    imageUrl2: `https://picsum.photos/seed/${Math.random()}/300/200`,
  },
  {
    title: 'השקעה שמחזירה את עצמה',
    text: 'ההשקעה חוזרת - נחבר אתכם לפרויקט ראשון בתשלום, עד 3 חודשים לאחר הכנת תיק עבודות',
    icons: ['bytesize:portfolio', 'game-icons:money-stack', 'mdi:film-open-star-outline'],
    imageUrl: `${CONFIG.site.basePath}/assets/background/back4.jpg`,
    imageUrl2: `https://picsum.photos/seed/${Math.random()}/300/200`,
  },
  {
    title: 'להצטרף לקהילה איכותית',
    text: 'קבוצת פרטית של יוצרי תוכן עם תכני העשרה, טיפים והדרכות להמשך הדרך',
    icons: ['logos:whatsapp-icon', 'emojione:books'],
    imageUrl: `${CONFIG.site.basePath}/assets/background/back5.jpg`,
    imageUrl2: `https://picsum.photos/seed/${Math.random()}/300/200`,
  },
  {
    title: 'התחייבות מלאה',
    text: 'לא הצלחנו להשיג לכם את העבודה הראשונה שלכם ? קבלו החזר כספי מלא',
    icons: ['mdi:cash-refund', 'pajamas:partner-verified'],
    imageUrl: `${CONFIG.site.basePath}/assets/background/back6.jpg`,
    imageUrl2: `https://picsum.photos/seed/${Math.random()}/300/200`,
  },
];

const renderCard = (item, mode = 'dark') => (
  <Card
    sx={{
      borderRadius: 2,
      // boxShadow: customShadows(mode).z20,
      height: 1,
      minHeight: 400,
      // border: `0.6px solid grey`,
      '&:before': {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 8,
        content: '""',
        position: 'absolute',
        backgroundImage:
          'linear-gradient(to bottom, transparent,rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 73%, rgba(0,0,0,0.8))',
      },
    }}
    key={item.title}
  >
    <div className="relative">
      <CardMedia
        className="absolute w-full h-full"
        component="img"
        height="100"
        image={item.imageUrl}
        alt={item.title}
        sx={{ borderRadius: '16px 16px 0 0', height: 400 }}
      />
      {/* {halfWave(mode)} */}
    </div>
    <CardContent
      sx={{
        zIndex: 15,
        position: 'relative',
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
      }}
    >
      <Typography my={3} color="common.white" variant="h5" component="div">
        {item.title}
      </Typography>
      <Typography variant="body2" color="common.white" sx={{ marginBottom: 2 }}>
        {item.text}
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', color: 'white' }}>
        {item.icons.map((icon, index) => (
          <Iconify key={index} width={30} icon={icon} />
        ))}
      </Box>
    </CardContent>
  </Card>
);

// ----------------------------------------------------------------------

export function AboutYouTwo({ contentType = 'aboutCourse' }) {
  const theme = useTheme();
  const { mainColor, textGradient, mode } = useContext(ColorContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      component={MotionViewport}
      // maxWidth="lg"
      sx={{
        pb: { xs: 8, md: 10 },
        alignItems: 'center',
        textAlign: { xs: 'center', md: 'unset', direction: 'rtl' },
      }}
    >
      <m.div variants={varFade().inDown}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          איך זה
          <Box component="a" mx={1} sx={textGradient} color={`${mainColor}.main`}>
            ישתלם לך
          </Box>
          ?
        </Typography>
      </m.div>
      <Box sx={{ flexGrow: 1, padding: 1 }}>
        <Grid container spacing={3}>
          {bulletsWithIcons.map((item, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              {renderCard(item, mode)}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
