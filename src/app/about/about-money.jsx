import { m } from 'framer-motion';
import { useContext } from 'react';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box, Container, useMediaQuery } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { varBounce, MotionViewport } from 'src/components/animate';
import { WorthCalculatorGPT } from 'src/components/worthCalculator/HowMuchYouWorth';

// ----------------------------------------------------------------------

const bulletsWithIcons = [
  {
    text: 'מקצוע דיגיטלי מבוקש, ללא קשר לפלטפורמה המועדפת עליכם',
    icons: ['logos:youtube-icon', 'logos:tiktok-icon', 'skill-icons:instagram', 'logos:facebook'],
  },
  {
    text: 'ליצור תוכן ולהרוויח כסף מכל מקום ובכל זמן',
    icons: [
      'fa6-solid:wifi', // An icon representing money or earnings
      'twemoji:laptop', // An icon representing time, indicating flexibility
      'flat-color-icons:globe', // An icon representing time, indicating flexibility
    ],
  },
  {
    text: 'לבנות קהילה אותנטית שתהווה עבורכם מקור הכנסה וקהל שאוהב אתכם',
    icons: [
      'mdi:account-group-outline', // An icon representing a community or group
      'material-symbols:animated-images',
    ],
  },
  {
    text: 'ההשקעה חוזרת - נחבר אתכם לפרויקט ראשון בתשלום לאחר הכנת תיק עבודות',
    icons: [
      // 'mdi:briefcase-check-outline', // An icon representing a successful project or job
      'bytesize:portfolio',
      'game-icons:money-stack',
      'mdi:film-open-star-outline',
    ],
  },
  {
    text: 'קבוצת פרטית של יוצרי תוכן עם תכני העשרה, טיפים והדרכות להמשך הדרך',
    icons: [
      'logos:whatsapp-icon', // The WhatsApp icon for communication
      'emojione:books', // An icon representing guides or tips
    ],
  },
  {
    text: 'לא אהבתם ? תקבלו את כספכם בחזרה',
    icons: [
      'mdi:cash-refund', // An icon representing a refund or money back
      'pajamas:partner-verified',
      // 'gala:secure',
    ],
  },
];

// ----------------------------------------------------------------------

export function AboutMoney() {
  const theme = useTheme();
  const { mainColor, textGradient } = useContext(ColorContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      component={MotionViewport}
      // maxWidth="lg"
      sx={{
        pb: { xs: 4, md: 4 },
        alignItems: 'center',
        textAlign: { xs: 'center', md: 'unset', direction: 'rtl' },
      }}
    >
      <Typography variant="h3">
        בואו לגלות
        <Box component="a" mx={1} sx={textGradient} color={`${mainColor}.main`}>
          כמה אתם שווים
        </Box>
      </Typography>
      <Typography textAlign="center" component="div" color="text.secondary" variant="p">
        מחשבון תשלומי סושיאל
      </Typography>
      <m.div variants={varBounce({ duration: 1 }).in}>
        <WorthCalculatorGPT hideLink direct />
      </m.div>
    </Container>
  );
}
