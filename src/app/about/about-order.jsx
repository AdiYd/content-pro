import { m } from 'framer-motion';
import { useContext } from 'react';

import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box, useMediaQuery } from '@mui/material';

import { customShadows } from 'src/theme/core';
import { ColorContext } from 'src/context/colorMain';

import { varFade, AnimateBorder, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function AboutOrder({ contentType = 'aboutCourse' }) {
  const theme = useTheme();
  const { mainColor, textGradient, themeColor, mode } = useContext(ColorContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const promoVideo = (
    <AnimateBorder
      sx={{ borderRadius: 4 }}
      animate={{ distance: 40, outline: '', color: theme.palette.secondary?.main || '#fff' }}
    >
      <div
        // onClick={() => console.log('Video clicked!')}
        style={{ width: isMobile ? '90vw' : '70vw', boxShadow: customShadows(mode).z12 }}
        className="overflow-hidden aspect-video rounded-3xl shadow-md shadow-warning-lighter/40"
      >
        <Box
          sx={{ position: 'relative', zIndex: 30 }}
          overflow="hidden"
          width="100%"
          // height="100%"
          p={0.4}
          borderRadius={4}
        >
          {/* <ReactPlayer
            style={{
              borderRadius: '20px',
              zIndex: 30,
              overflow: 'hidden',
              width: 'fit-content',
              height: 'fill-available',
            }}
            config={{
              youtube: {
                playerVars: {
                  showinfo: 0, // Hide video title and uploader info
                  rel: 1, // Disable related videos at the end
                  modestbranding: 1, // Hide YouTube logo
                },
              },
            }}
            width="100%"
            // height="100%"
            url="https://www.youtube.com/watch?v=YRI9f6NvxaQ"
            controls // Show player controls
            // muted={false} // Mute the video by default (optional)
            // playing={true} // Start playing automatically (optional)
          /> */}
          <iframe
            title="videoIntro"
            width={500}
            allowFullScreen
            allow="fullscreen"
            src="https://drive.google.com/file/d/1OGBM8l4lhNwYmCDsHa6jCAkRkwPhmb0u/preview"
            className="relative z-20 w-full rounded-3xl h-full aspect-video"

            // controls
          />
          <div className="absolute z-20 top-0 right-0 bg-transparent w-1/4 h-1/4" />
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
        pb: { xs: 8, md: 10 },
        alignItems: 'center',
        textAlign: { xs: 'center', md: 'unset', direction: 'rtl' },
      }}
    >
      <m.div variants={varFade().inLeft}>
        {/* <Typography variant="h4" sx={{ mb: 3 }}>
          עולם הדיגיטל, הסושיאל ויצירת התוכן הוא
          <Box component="a" mx={1}>
            עצום ומלא אפשרויות (ואכזבות), זאת גם הסיבה שכדי להצליח חשוב מאוד לבנות את עצמכם בצורה
            נכונה ולספק תוכן איכותי ומקורי.
          </Box>
        </Typography> */}
        <Typography variant="h3" mb={4}>
          אחרי ההכשרה הזו אתם תצליחו להתמודד עם כל האתגרים שביצירת תוכן
        </Typography>
      </m.div>
      {/* <m.div variants={varFade({ delay: 0.5 }).inLeft}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          אני אעשה לך
          <Box component="a" mx={1} sx={textGradient}>
            סדר
          </Box>
          ואלמד אותך לעבוד באופן שיטתי ומסודר ובכך להגדיל את
          <Box component="a" mx={1} sx={textGradient}>
            סיכויי ההצלחה שלך
          </Box>
        </Typography>
      </m.div> */}
      <div className="flex max-lg:justify-center">
        <Box
          sx={{
            display: 'flex',
            justifyContent: { lg: 'center', md: 'center' },

            mb: 4,
          }}
        >
          {promoVideo}
        </Box>
      </div>
      <m.div variants={varFade({ delay: 0.7 }).inLeft}>
        <Typography color="text.secondary" variant="p" sx={{ mb: 3 }}>
          אני יודע כמה זה מתסכל לנסות ליצור תוכן איכותי ובסוף לגלות שיש עוד 1000 כמוכם שעשו את זה
          כבר לפניכם.
          <br />
          אבל תנו לי לגלות לכם סוד -
          <Typography variant="p" component="a" mx={1} color="text.primary">
            גם אתם יכולים להצליח,ובגדול!
          </Typography>
          אתם לא צריכים להמציא את הגלגל - פשוט ללמוד ממי שכבר עשה את זה ולהתחיל לייצר תוכן איכותי
          שעשוי ומצולם נכון, סירטוני וידאו כאלה ששמים את הדגש על הפרטים הקטנים ועושים את ההבדל בין
          יוצר תוכן מקצועי לחובבן.
          <br />
          אחרי שתלמדו את הסודות, כבר לא תסתכלו על סרטוני טיקטוק ויוטיוב באותו האופן ותתחילו לבנות את
          <Box component="a" mx={1}>
            הנישה הפרטית שלכם שמתאימה לאופי שלכם
          </Box>
        </Typography>
      </m.div>
    </Container>
  );
}
