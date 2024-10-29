import { useMemo, useContext } from 'react';

import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import { useMediaQuery } from '@mui/system';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { useResponsive } from 'src/hooks/use-responsive';

import { CONFIG } from 'src/config-global';
import { customShadows } from 'src/theme/core';
import { ColorContext } from 'src/context/colorMain';
import { bgBlur, varAlpha, bgGradient, hideScrollY } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { MotionViewport } from 'src/components/animate';
import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

export const testimonials = [
  {
    name: 'קורל חלומי',
    postedDate: '2024-07-15',
    ratingNumber: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=a8d942',
    content:
      'ערן, אתה קוסם! הקורס שלך פתח לי עולם שלם של יצירתיות שלא ידעתי שקיים בי. בזכותך התחלתי ליצור תוכן לחברות, ואני מקבלת הצעות עבודה מדהימות. תודה ענקית!',
  },
  {
    name: 'אבי גרינברג',
    postedDate: '2024-06-28',
    ratingNumber: 4,
    avatarUrl: 'https://i.pravatar.cc/150?u=7d4258',
    content:
      'הקורס של ערן היה בדיוק מה שהייתי צריך כדי להבין איך לבנות נוכחות ברשתות החברתיות. התכנים ברורים ופרקטיים והתוצאות בהתאם, ממליץ בחום.',
  },
  {
    name: 'מאור רביבו',
    postedDate: '2024-05-12',
    ratingNumber: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=a5d942',
    content:
      'לא האמנתי שאצליח ליצור סרטונים כל כך מקצועיים! ערן, אתה מורה מדהים, עם סבלנות אין קץ והמון ידע. תודה לך על הכל!',
  },
  {
    name: 'יונתן גולד',
    postedDate: '2024-03-21',
    ratingNumber: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=a6d942',
    content:
      'עשיתי המון קורסים, אבל הקורס של ערן הוא פשוט ברמה אחרת. הוא לימד אותי איך לחשוב כמו יוצר תוכן אמיתי, ואיך להביא את הסיפור שלי לעולם. ממליץ בחום',
  },
  {
    name: 'שני דביר',
    postedDate: '2024-02-08',
    ratingNumber: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=a7d942',
    content:
      'ערן, אתה לא רק מורה מוכשר, אתה גם בן אדם מדהים. העצות שלך והתמיכה שלך היו שווים זהב. ממליצה על הקורס שלך לכל מי שרוצה להצליח בתחום הזה',
  },
  {
    name: 'משה לוי',
    postedDate: '2024-01-15',
    ratingNumber: 4,
    avatarUrl: 'https://i.pravatar.cc/150?u=a2d942',
    content:
      'אני חייב להודות, הייתי סקפטי בהתחלה. אבל אחרי כמה שיעורים עם ערן, הבנתי שאני בידיים טובות. הוא פשוט אלוף, ואני גאה להגיד שאני תלמיד שלו.',
  },
  {
    name: 'יונתן לוי',
    postedDate: '2024-01-15',
    ratingNumber: 5,
    avatarUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Male+Avatar',
    content: `קורס מצוין! תודה רבה! למדתי המון על יצירת תוכן ותפעול מדיה חברתית.`,
  },
  {
    name: 'איתי בן דוד',
    postedDate: '2024-03-10',
    ratingNumber: 4,
    avatarUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Male+Avatar',
    content:
      'קהילה תומכת ועוזרת, הכרתי שם את מאור השותף שלי ויחד התחלנו למכור סרטוני שיווק לבעלי עסקים קטנים',
  },
  {
    name: 'נועם כהן',
    postedDate: '2024-05-12',
    ratingNumber: 5,
    avatarUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Male+Avatar',
    content: `היו לי כמה שאלות לאחר רכישת הקורס. ערן פרקש הגיב מהר והיה מאוד מועיל. הקורס עזר לי להבין איך לקחת את הצעד הראשון, מומלץ!`,
  },
  {
    name: 'מורן שדה',
    postedDate: '2024-07-03',
    ratingNumber: 5,
    avatarUrl: 'https://via.placeholder.com/150/FF69B4/FFFFFF?text=Female+Avatar',
    content: `הקורס של ערן פרקש הוא ללא ספק הטוב ביותר שלקחתי. הוא מקצועי, מעשיר ומלא דוגמאות מעשיות. בזכות הקורס, הצלחתי לשפר את יכולות יצירת התוכן שלי באופן משמעותי.`,
  },
];

const COLORS = ['info', 'success', 'secondary', 'warning', 'error', 'primary'];

// ----------------------------------------------------------------------

export function AboutTestimonials() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { textGradient, mode, themeColor } = useContext(ColorContext);
  const carousel = useCarousel({
    loop: true,
    align: 'center', // Or "start", "end" based on scroll alignment
    containScroll: 'trim', // Limits scroll to fit exactly within visible slides
    skipSnaps: true,
    dragFree: true,
    speed: 50,
    plugins: [{ name: 'autoScroll' }],
    thumbs: {
      slidesToShow: 'auto',
    },
  });
  const mdUp = useResponsive('up', 'md');

  const getGradient = useMemo(() => {
    if (mode === 'dark') {
      return isMobile
        ? '0deg, transparent 8%, #01183A,#001F45,#05050F,#013369,#00366A,#05050F ,#003464 ,transparent '
        : '0deg, transparent 8%, rgba(1, 24, 58, 0.7), #01183A,#05050F,#013369,#00366A,#003464 ,transparent';
    }

    return isMobile
      ? '0deg, transparent 8%, rgba(220, 240, 255, 0.9), #E6F7FF,#6FAEFF,#6FAEFF, #99CCFF, #CCE8FF, #E6F7FF,  transparent'
      : '0deg, transparent 8%, rgba(220, 240, 255, 0.9), #E6F7FF,#6FAEFF,#6FAEFF, #99CCFF, #CCE8FF, #E6F7FF,  transparent';
  }, [mode, isMobile]);

  const renderDescription = (
    <Box sx={{ maxWidth: { md: 360 }, textAlign: { xs: 'center', md: 'unset' } }}>
      <div className="">
        {/* <Skeleton height={100} variant="rectangular" animation="wave" /> */}
        <Image
          alt="קורס Video-pro של ערן פרקש"
          src={`${CONFIG.site.basePath}/assets/images/about/Eran.png`}
          ratio="1/1"
          sx={{
            width: 1,
            borderRadius: 2,
            // objectPosition: 'top',
            alignSelf: 'center',
            '&:hover': {
              transform: 'scale(1.1)',
              transition: 'transform 0.5s ease-out',
            },
          }}
        />
        <Typography variant="h2" sx={{ my: 3, color: 'text.primary' }}>
          <Box component="a" sx={textGradient}>
            ממליצים{' '}
          </Box>
          <br />
          על הקורס
        </Typography>
      </div>

      <div className="">
        <Typography sx={{ color: 'text.primary' }}>
          המטרה שלי היא לעזור לאנשים בדרך להצלחה, ליצור ולקחת חלק ביצירת תוכן מקצועי ואיכותי יותר{' '}
          <br />
          הקורס ייתן לך כלים וטיפים וראייה רחבה יותר בכל הקשור ליצירת תוכן לרשתות החברתיות
        </Typography>
      </div>
    </Box>
  );

  const renderContent = (
    <Box
      sx={{
        ...hideScrollY,
        py: { md: 10 },
        height: { md: 1 },
        overflowY: { xs: 'unset', md: 'auto' },
      }}
    >
      <Box width={1} sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Carousel
          // sx={{ m: 0, p: 0, display: 'block' }}
          slotProps={{ slide: { display: 'flex', px: 1, m: 1 } }}
          carousel={carousel}
        >
          {testimonials.map(
            (testimonial, i) =>
              ((!mdUp && i < 5) || mdUp) && (
                <div className="w-full pb-4 mx-auto" key={testimonial.name}>
                  <TestimonialCard
                    sx={{ width: 1, boxShadow: customShadows().card }}
                    testimonial={testimonial}
                  />
                </div>
              )
          )}
        </Carousel>
        <div className="w-full flex justify-center">
          <CarouselDotButtons
            scrollSnaps={carousel.dots.scrollSnaps}
            selectedIndex={carousel.dots.selectedIndex}
            onClickDot={carousel.dots.onClickDot}
            sx={{ color: theme.palette.error.main, direction: 'ltr' }}
          />
        </div>
      </Box>
      <Box width={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Masonry spacing={3} columns={{ xs: 1, md: 2 }} sx={{ ml: 0 }}>
          {testimonials.map(
            (testimonial, i) =>
              ((!mdUp && i < 5) || mdUp) && (
                <div key={testimonial.name}>
                  <TestimonialCard testimonial={testimonial} />
                </div>
              )
          )}
        </Masonry>
      </Box>
    </Box>
  );

  return (
    <Box
      // mt={8}
      sx={{
        ...bgGradient({
          color: getGradient,
          // imgUrl: `${CONFIG.site.basePath}/assets/images/about/Eran.png`,
        }),
        overflow: 'hidden',
        height: { md: 840 },
        pb: { xs: 8, md: 10 },
      }}
    >
      <Container component={MotionViewport} sx={{ position: 'relative', height: 1 }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ height: 1 }}
        >
          <Grid xs={10} md={4}>
            {renderDescription}
          </Grid>

          <Grid xs={12} md={8} alignItems="center" sx={{ height: 1 }}>
            {renderContent}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function TestimonialCard({ testimonial, sx, ...other }) {
  const theme = useTheme();

  const { name, ratingNumber, postedDate, content, avatarUrl } = testimonial;

  return (
    <Stack
      spacing={3}
      sx={{
        ...bgBlur({ color: varAlpha(theme.vars.palette.common.whiteChannel, 0.2) }),
        p: 3,
        borderRadius: 2,
        color: 'text.primary',
        ...sx,
      }}
      {...other}
    >
      <Iconify icon="mingcute:quote-left-fill" width={40} sx={{ opacity: 0.48 }} />

      <Typography variant="body2">{content}</Typography>

      <Rating value={ratingNumber} readOnly size="small" />

      <Stack direction="row">
        {/* <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} /> */}

        <ListItemText
          primary={name}
          secondary={postedDate}
          primaryTypographyProps={{ typography: 'subtitle2', mb: 0.5 }}
          secondaryTypographyProps={{
            color: 'inherit',
            typography: 'caption',
            sx: { opacity: 0.64 },
          }}
        />
      </Stack>
    </Stack>
  );
}
