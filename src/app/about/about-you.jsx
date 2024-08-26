import { m } from 'framer-motion';
import { useContext } from 'react';
import { CheckIcon } from 'lucide-react';

import { Stack } from '@mui/system';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box, ToggleButton, useMediaQuery } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

const bullets = [
  'מקצוע דיגיטלי ומבוקש ללא קשר לפלטפורמה המועדפת עליכם',
  'לעבוד ולהרוויח כסף מכל מקום ובכל זמן',
  'ללמוד איך ליצור קהילה משלכם, שתהווה עבורכם מקור הכנסה',
  'מקבלים פרויקט ראשון בתשלום לאחר הכנת תיק עבודות',
  'קבוצת וואטצאפ פרטים עם תכנים, טיפים ומדריכים להמשך הדרך',
  'לא אהבתם ? תקבלו את כספכם בחזרה',
];

const bulletsWithIcons = [
  {
    text: 'מקצוע דיגיטלי מבוקש, ללא קשר לפלטפורמה המועדפת עליכם',
    icons: ['logos:youtube-icon', 'logos:tiktok-icon', 'skill-icons:instagram', 'logos:facebook'],
  },
  {
    text: 'ליצור ולהרוויח כסף מכל מקום ובכל זמן',
    icons: [
      'svg-spinners:wifi', // An icon representing money or earnings
      'twemoji:laptop', // An icon representing time, indicating flexibility
      'flat-color-icons:globe', // An icon representing time, indicating flexibility
    ],
  },
  {
    text: 'ליצור קהילה משלכם שתהווה עבורכם מקור הכנסה וקהל שאוהב אתכם',
    icons: [
      'mdi:account-group-outline', // An icon representing a community or group
    ],
  },
  {
    text: 'ההשקעה חוזרת - מקבלים פרויקט ראשון בתשלום לאחר הכנת תיק עבודות',
    icons: [
      'mdi:briefcase-check-outline', // An icon representing a successful project or job
      'game-icons:money-stack',
    ],
  },
  {
    text: 'קבוצת וואטצאפ של יוצרי תוכן עם תכני העשרה, טיפים והדרכות להמשך הדרך',
    icons: [
      'logos:whatsapp-icon', // The WhatsApp icon for communication
      'emojione:books', // An icon representing guides or tips
    ],
  },
  {
    text: 'לא אהבתם ? תקבלו את כספכם בחזרה',
    icons: [
      'mdi:cash-refund', // An icon representing a refund or money back
      'gala:secure',
    ],
  },
];

// ----------------------------------------------------------------------

export function AboutYou({ contentType = 'aboutCourse' }) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const bullet = ({
    text = 'מקצוע מבוקש ודיגטילי',
    delay = 0.2,
    color = 'primary',
    icons = [],
  }) => (
    <m.div style={{ marginBottom: 2 }} variants={varFade({ delay, distance: 400 }).inLeft}>
      <Stack alignItems="top" direction="row" spacing={2}>
        <ToggleButton
          value="checked"
          sx={{
            borderRadius: 1,
            height: 'fit-content',
            color: 'text.primary',
            // color: theme.palette[mainColor]?.main,
            // backgroundColor: `${color}.main`,
            borderColor: `${color}.main`,
            '&:hover': {
              color: 'text.primary',
              backgroundColor: `${color}.dark`,
            },
          }}
          size="small"
          defaultChecked
          color={color}
        >
          <CheckIcon size={12} />
        </ToggleButton>
        <Typography variant="h5">{text}</Typography>
      </Stack>
      <Stack mr={6} mt={2} justifyContent="center" direction="row" spacing={2}>
        {icons.map((item, index) => (
          <Iconify key={index} size={30} icon={item} />
        ))}
      </Stack>
    </m.div>
  );

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
      <m.div variants={varFade().inDown}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          למה זה הכי
          <Box component="a" mx={1} color={`${mainColor}.main`}>
            משתלם לך
          </Box>
          ?
        </Typography>
      </m.div>
      {bulletsWithIcons.map((item, index) => (
        <Box mb={3} key={index} maxWidth="90%">
          {bullet({
            delay: 0.2 * (index * 2 + 1),
            color: mainColor,
            text: item.text,
            icons: item.icons,
          })}
        </Box>
      ))}
    </Container>
  );
}
