import { m } from 'framer-motion';
import { useContext } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { ColorContext } from 'src/context/colorMain';

import { Image } from 'src/components/image';
import { varFade, AnimateAvatar, AnimateBorder, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export const SKILLS = [...Array(3)].map((_, index) => ({
  label: ['Development', 'Design', 'Marketing'][index],
  value: [20, 40, 60][index],
}));

const contentDict = {
  aboutCourse: {
    title: ['Video-Pro', 'מה זה '].reverse(),
  },
  aboutMe: {
    title: ['מי אני - ', 'ערן פרקש'],
  },
};

// ----------------------------------------------------------------------

export function AboutWhat({ contentType = 'aboutCourse' }) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const introVideo = (
    <AnimateBorder
      sx={{ borderRadius: 4, p: 0.5 }}
      animate={{ color: theme.palette[mainColor]?.main || '#fff' }}
    >
      <div
        style={{ width: isMobile ? '90vw' : '50vw' }}
        className="overflow-hidden rounded-3xl shadow-md shadow-green-500/30"
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
      <Grid container columnSpacing={{ md: 3 }} alignItems="flex-start">
        <Grid
          xs={12}
          md={contentType === 'aboutCourse' ? 6 : 12}
          lg={contentType === 'aboutCourse' ? 5 : 12}
        >
          <m.div variants={varFade().inDown}>
            {contentType === 'aboutMe' && (
              <>
                <AnimateAvatar
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    float: { md: 'left', xs: 'none' },
                    margin: 4,
                    // boxShadow: `-10px 10px 20px ${theme.vars.palette[mainColor]?.main}`,
                  }}
                  width={220}
                >
                  <Image
                    alt="Our office small"
                    src={`${CONFIG.site.basePath}/assets/images/about/Eran.png`}
                    ratio="1/1"
                    sx={{
                      '&:hover': {
                        transform: 'scale(1.4)',
                        transition: 'transform 0.5s ease-out',
                      },
                      // width: 100,
                      // borderRadius: 20,
                    }}
                  />
                </AnimateAvatar>
                <Box
                  sx={{
                    display: { xs: 'flex', md: 'none', justifyContent: 'center' },
                    mb: 4,
                  }}
                >
                  {introVideo}
                </Box>
              </>
            )}
            <Typography variant="h2" sx={{ mb: 3 }}>
              {contentDict[contentType]?.title[0]}
              <Box component="a" color={`${mainColor}.main`}>
                {contentDict[contentType]?.title[1]}
              </Box>
              {contentType === 'aboutCourse' && '?'}
            </Typography>
          </m.div>

          <m.div variants={varFade({ distnce: 0 }).inUp}>
            {contentType === 'aboutMe' && (
              <>
                <Typography variant="p" component="p" sx={{ lineHeight: 1.7, opacity: 0.8 }}>
                  יזם דיגיטלי ויוצר תוכן בעל נסיון של שנים ברשתות החברתיות, הקמתי מספר רב של ערוצי
                  תוכן עם עשרות אלפי עוקבים, השתתפתי בתצוגות, תערוכות ושיתופי פעולה דיגיטליים ברחבי
                  העולם - חלקם הצליחו יותר וחלקם פחות אבל מה שבטוח הוא שצברתי נסיון רב וטיפים שאותם
                  אני מתכוון לחשוף בפניכם. חקרתי ולמדתי במשך שנים את השיטות לייצר תוכן איכותי
                  ואותנטי שמושך אליו קהל חם שרק מחכה לעוד. אני מלווה יוצרי תוכן בתחילת דרכם, תוך דגש
                  על יצירת נישה אישית שתגרום ללקוחות שלכם להתאהב ולחזור לעוד
                </Typography>
                <br />
                {/* <br /> */}
                <Typography
                  variant="p"
                  component="p"
                  sx={{ lineHeight: 1.7, opacity: 0.8, display: { md: 'inherit', xs: 'none' } }}
                >
                  עם Video-Pro, תלמדו ליצור תוכן איכותי וברמה גבוהה, תוכן שישאיר את הצופים שלכם
                  פעורי פה וירצו עוד. אני ערן פרקש, יוצר, מפיק ועורך תוכן ברשתות בערוצי סושיאל עם
                  עשרות אלפי עוקבים, עם הזמן והניסיון פיצחתי את הנוסחה להצלחה בעולם הדיגיטלי ויצירת
                  תוכן שייחד אתכם מאחרים ויעזור לכם בדרך לייצר הכנסה קבועה ויציבה, ולהקים קהילה של
                  עוקבים שאוהבים אתכם ואת התכנים המיוחדים שלכם. בקורס Video-Pro, אני אחלוק אתכם את
                  כל הסודות שלי, את הטעויות שכדאי להימנע מהן, ואת הדרך הבטוחה להפוך את התשוקה שלכם
                  לתוכן למקצוע מניב ומשגשג. אל תפספסו את ההזדמנות לקבל טיפים של אלופים ולהגשים את
                  החלום שלכם!
                </Typography>
                <Box
                  maxWidth="70%"
                  minWidth="50%"
                  sx={{
                    display: { md: 'flex', xs: 'none', justifyContent: 'justify' },
                    mt: 8,
                  }}
                >
                  {introVideo}
                </Box>
              </>
            )}
            {contentType === 'aboutCourse' && (
              <>
                <Typography
                  variant="p"
                  sx={{ color: 'text.dark.main', lineHeight: 1.7, opacity: 0.8, mb: 4 }}
                >
                  Video-Pro היא הפלטפורמה המושלמת להתחיל את הדרך שלך כיוצר/ת תוכן איכותי ומקורי -
                  לעסקים ולרשתות החברתיות. אנחנו מציעים מעטפת לימודית שכוללת קורס יסודות יצירת תוכן
                  בדגש על וידאו, היכרות עם האלגוריתם של הרשתות החברתיות ואיך ליצור קהילה אותנטית של
                  עוקבים/לקוחות נאמנים שאוהבים התכנים והסטייל האישי שלכם. אנחנו נלווה אתכם עד
                  שתתחילו את הצעדים הראשונים כיוצרי תוכן בתשלום או לקהילה שלכם. סקרנים? המשיכו לקרוא
                  😉
                </Typography>
                <div className="h-8" />
                <Typography
                  variant="p"
                  sx={{
                    color: 'text.dark.main',
                    lineHeight: 1.7,
                    opacity: 0.8,
                    pt: 4,
                    display: { md: 'inherit', xs: 'none' },
                  }}
                >
                  הקורס נוצר ומנוהל על ידי ערן פרקש - מנהל ערוצי תוכן עם עשרות אלפי עוקבים, קמפיינים
                  וניהול תוכן למותגי אופנה ודיגיטל. ערן יקח אתכם צעד אחר צעד - מהרעיון הראשוני ועד
                  לרגע שהסירטונים שלכם יטפסו לראש המגמות והביקוש. תלמדו את הטכניקות הכי חמות לצילום
                  ויצירת תוכן, תגלו איך לבחור לוקיישנים מנצחים, תבינו את האלגוריתמים שמאחורי טיקטוק,
                  יוטיוב ואינסטגרם ותקבלו טיפים ששווים זהב ליצירת תוכן ממכר שפשוט אי אפשר להתעלם
                  ממנו. לא עוד סרטונים בינוניים! עם Video-Pro, תפתחו את הפוטנציאל האמיתי שלכם כיוצרי
                  תוכן, תבנו קהילה תומכת, ותהפכו לכוכבים הבאים של הרשת. מוכנים לצאת לדרך?
                </Typography>
              </>
            )}
          </m.div>
        </Grid>

        {contentType === 'aboutCourse' && (
          <Grid
            container
            xs={12}
            md={6}
            lg={7}
            alignItems="center"
            sx={{
              pr: { md: 7 },
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Grid xs={6}>
              <m.div variants={varFade().inUp}>
                <Image
                  alt="Our office small"
                  src={`${CONFIG.site.basePath}/assets/images/about/pexels-nurseryart-346885.jpg`}
                  ratio="1/1"
                  sx={{
                    '&:hover': {
                      boxShadow: `-40px 40px 80px ${theme.vars.palette.secondary.light}`,
                    },
                    transition: 'transform 0.7s ease-in',
                    borderRadius: 3,
                    boxShadow: `-40px 40px 80px ${theme.vars.palette.secondary.main}`,
                  }}
                />
              </m.div>
            </Grid>

            <Grid xs={6}>
              <m.div variants={varFade().inUp}>
                <Image
                  alt="Our office large"
                  src={`${CONFIG.site.basePath}/assets/images/about/pexels-thelazyartist-1467277.jpg`}
                  ratio="3/4"
                  sx={{
                    '&:hover': {
                      boxShadow: `-40px 40px 80px ${theme.vars.palette.primary.light}`,
                    },
                    transition: 'transform 0.7s ease-in',
                    borderRadius: 3,
                    transform: 'rotate(-5deg)',
                    boxShadow: `-40px 40px 80px ${theme.vars.palette.primary.dark}`,
                  }}
                />
              </m.div>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
