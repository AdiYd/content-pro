import { m } from 'framer-motion';
import { useContext } from 'react';

import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box, useMediaQuery } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { varFade, AnimateBorder, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function AboutOrder({ contentType = 'aboutCourse' }) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const promoVideo = (
    <AnimateBorder
      sx={{ borderRadius: 4, p: 0.5 }}
      animate={{ color: theme.palette.secondary?.main || '#fff' }}
    >
      <div
        style={{ width: isMobile ? '90vw' : '50vw' }}
        className="overflow-hidden rounded-3xl shadow-md shadow-warning-lighter/40"
      >
        <Box overflow="hidden" width="100%" borderRadius={3}>
          <iframe
            title="videoIntro"
            width={500}
            src="https://drive.google.com/file/d/1OGBM8l4lhNwYmCDsHa6jCAkRkwPhmb0u/preview"
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
        py: { xs: 4, md: 4 },
        alignItems: 'center',
        textAlign: { xs: 'center', md: 'unset', direction: 'rtl' },
      }}
    >
      <m.div variants={varFade().inLeft}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          עולם הדיגיטל, הסושיאל ויצירת התוכן הוא
          <Box component="a" mx={1} color={`${mainColor}.main*`}>
            עצום ומלא אכזבות
          </Box>
        </Typography>
      </m.div>
      <m.div variants={varFade({ delay: 0.5 }).inRight}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          אני אעשה לך
          <Box component="a" mx={1} color={`${mainColor}.main`}>
            סדר
          </Box>
          ואלמד אותך לעבוד באופן שיטתי ומסודר כדי לפתח את הנישה שלך
          <Box component="a" mx={1} color={`${mainColor}.main`}>
            שתתאים לאופי שלך
          </Box>
        </Typography>
      </m.div>
      <div className="flex">
        <Box
          sx={{
            display: 'flex',
            justifyContent: { md: 'justify', xs: 'center' },
            mb: 4,
          }}
        >
          {promoVideo}
        </Box>
      </div>
      <m.div variants={varFade({ delay: 0.5 }).inRight}>
        <Typography variant="p" sx={{ mb: 3 }}>
          אני יודע כמה זה מתסכל לנסות ליצור תוכן מעניין ומקצועי ובסוף לגלות שיש עוד 1000 כמוכם שעשו
          את זה כבר לפניכם.
          <br />
          אבל תנו לי לגלות לכם סוד - גם אתם יכולים להצליח,ובגדול! אתם לא צריכים להמציא את הגלגל -
          פשוט ללמוד ממי שכבר עשה את זה ולהתחיל לייצר תוכן איכותי שעשוי ומצולם נכון, סירטוני וידאו
          כאלה ששמים את הדגש על הפרטים הקטנים ועושים את ההבדל בין יוצר תוכן מקצועי לחובבן.
          <br />
          אחרי שתלמדו את הסודות, כבר לא תסתכלו על סרטוני טיקטוק ויוטיוב באותו האופן...
        </Typography>
      </m.div>
    </Container>
  );
}
