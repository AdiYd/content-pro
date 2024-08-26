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
import { varFade, AnimateBorder, MotionViewport } from 'src/components/animate';

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
    text: 'מקצוע דיגיטלי ומבוקש ללא קשר לפלטפורמה המועדפת עליכם',
    icons: [
      'fluent:desktop-24-regular', // A general icon for digital professions
      'fluent:app-generic-20-filled', // An icon that represents platforms or applications
    ],
  },
  {
    text: 'לעבוד ולהרוויח כסף מכל מקום ובכל זמן',
    icons: [
      'svg-spinners:wifi', // An icon representing money or earnings
      'tabler:clock', // An icon representing time, indicating flexibility
    ],
  },
  {
    text: 'ללמוד איך ליצור קהילה משלכם, שתהווה עבורכם מקור הכנסה',
    icons: [
      'mdi:account-group-outline', // An icon representing a community or group
      'mdi:cash-register', // An icon representing income or monetization
    ],
  },
  {
    text: 'מקבלים פרויקט ראשון בתשלום לאחר הכנת תיק עבודות',
    icons: [
      'mdi:briefcase-check-outline', // An icon representing a successful project or job
      'mdi:folder-account-outline', // An icon representing a portfolio or project folder
    ],
  },
  {
    text: 'קבוצת וואטצאפ פרטים עם תכנים, טיפים ומדריכים להמשך הדרך',
    icons: [
      'mdi:whatsapp', // The WhatsApp icon for communication
      'mdi:book-open-variant', // An icon representing guides or tips
    ],
  },
  {
    text: 'לא אהבתם ? תקבלו את כספכם בחזרה',
    icons: [
      'mdi:cash-refund', // An icon representing a refund or money back
      'mdi:thumb-down-outline', // An icon representing dissatisfaction or dislike
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
      <Stack alignItems="center" direction="row" spacing={2}>
        <ToggleButton
          value="checked"
          sx={{
            borderRadius: 3,
            // width: { md: 10, xs: 4 },
            // height: { md: 10, xs: 4 },
            color: 'text.primary',
            backgroundColor: `${color}.main`,
            borderColor: 'text.secondary',
            '&:hover': {
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
      <Stack justifyContent="center" direction="row" spacing={2}>
        {icons.map((item, index) => (
          <Iconify key={index} size={20} icon={item} />
        ))}
      </Stack>
    </m.div>
  );

  const introVideo = (
    <AnimateBorder
      sx={{ borderRadius: 4, p: 0.5 }}
      animate={{ color: theme.palette[mainColor]?.main || '#fff' }}
    >
      <div
        style={{ width: isMobile ? '90vw' : '50vw' }}
        className="overflow-hidden rounded-3xl shadow-md shadow-warning-lighter/40"
      >
        <Box overflow="hidden" width="100%" borderRadius={3}>
          <iframe
            title="videoIntro"
            width={500}
            src="https://drive.google.com/file/d/1GPVCyit_PuX4sUh5FMlAjTKVRCVdW0mY/preview"
            className="relative z-20 w-full h-full aspect-video"

            // controls
          />
          {/* <video width="640" height="480" controls>
            <source
              src="https://drive.google.com/uc?export=download&id=1OGBM8l4lhNwYmCDsHa6jCAkRkwPhmb0u"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video> */}
        </Box>
      </div>
    </AnimateBorder>
  );
  return (
    <Container
      component={MotionViewport}
      // maxWidth="lg"
      sx={{
        pb: { xs: 6, md: 15 },
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
