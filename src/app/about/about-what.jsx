import { m } from 'framer-motion';
import { useContext } from 'react';

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { ColorContext } from 'src/context/colorMain';

import { Image } from 'src/components/image';
import { varFade, AnimateAvatar, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export const SKILLS = [...Array(3)].map((_, index) => ({
  label: ['Development', 'Design', 'Marketing'][index],
  value: [20, 40, 60][index],
}));

const contentDict = {
  aboutCourse: {
    title: ['Content-Pro', 'מה זה '].reverse(),
    body: '  קורס Content-Pro: הסודות מאחורי התוכן שכבש את הרשת. חולמים על סרטוני טיקטוק שיקפיצו לכם את העוקבים? רוצים לייצר תוכן אינסטגרם שיגרום לעולם לעצור? הגעתם למקום הנכון! בקורס Content-Pro, תלמדו את כל הסודות מאחורי יצירת תוכן ויראלי שבאמת עובד. הקורס שלנו, בהובלת משפיען עם עשרות אלפי עוקבים, יקח אתכם צעד אחר צעד, מהרעיון הראשוני ועד לרגע שהסרטון שלכם מטפס לראש המגמות. תלמדו את הטכניקות הכי חמות לצילום ועריכה, תגלו איך לבחור לוקיישנים מנצחים, תבינו את האלגוריתמים שמאחורי טיקטוק ואינסטגרם, ותקבלו טיפים שווים זהב ליצירת תוכן ממכר שפשוט אי אפשר להתעלם ממנו. לא עוד סרטונים בינוניים! עם Content-Pro, תפתחו את הפוטנציאל האמיתי שלכם כיוצרי תוכן, תבנו קהילה תומכת, ותהפכו לכוכבים הויראליים הבאים של הרשת. מוכנים לצאת לדרך?',
  },
  aboutMe: {
    title: ['מי אני - ', 'ערן פרקש'],
    body: 'בעולם הדיגיטלי של היום, תוכן איכותי הוא המפתח להצלחה. סרטונים מושקעים, יצירתיים וייחודיים הם הדרך למשוך קהל, לבנות מותג אישי חזק, ולהגיע לוויראליות ברשתות החברתיות. עם Content-Pro, תלמדו ליצור תוכן ברמה הכי גבוהה שיש, תוכן שישאיר את הצופים שלכם פעורי פה וירצו עוד.ערן פרקש, יוצר תוכן מצליח עם עשרות אלפי עוקבים, פיצח את הנוסחה להצלחה בעולם הדיגיטלי. בסרטוני היוטיוב הוויראליים שלו, הוא יצר לעצמו הכנסה קבועה ויציבה, והפך לאחד השמות המובילים בתחום. בקורס Content-Pro, ערן יחלוק אתכם את כל הסודות שלו, את הטעויות שכדאי להימנע מהן, ואת הדרך הבטוחה להפוך את התשוקה שלכם לתוכן למקצוע מניב ומשגשג. אל תפספסו את ההזדמנות ללמוד מהטוב ביותר ולהגשים את החלום שלכם!',
  },
};

// ----------------------------------------------------------------------

export function AboutWhat({ contentType = 'aboutCourse' }) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  return (
    <Container
      component={MotionViewport}
      // maxWidth="lg"
      sx={{
        py: { xs: 10, md: 15 },
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
              <AnimateAvatar
                sx={{
                  float: { md: 'left', xs: 'none' },
                  margin: 4,
                  boxShadow: `-10px 10px 20px ${theme.vars.palette[mainColor]?.main}`,
                }}
                width={200}
              >
                <Image
                  alt="Our office small"
                  src={`${CONFIG.site.basePath}/assets/images/about/Eran.png`}
                  ratio="1/1"
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.3s ease-in',
                    },
                    // width: 100,
                    // borderRadius: 20,
                  }}
                />
              </AnimateAvatar>
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
            <Typography variant="p" sx={{ color: 'text.dark.main', lineHeight: 1.7, opacity: 0.8 }}>
              {contentDict[contentType]?.body}
            </Typography>
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
                  className="hover:scale-150 transition-transform"
                  src={`${CONFIG.site.basePath}/assets/images/about/what-small.webp`}
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
                  src={`${CONFIG.site.basePath}/assets/images/about/what-large.webp`}
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
