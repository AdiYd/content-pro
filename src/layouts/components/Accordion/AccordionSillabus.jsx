import { m } from 'framer-motion';
import { useContext } from 'react';

import { useTheme, Container, Typography } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { varFade, MotionContainer } from 'src/components/animate';

import { AccordionView } from './view';

const defaultTitle = 'רק רגע, זה מתאים לי בכלל? למה דווקא Video-Pro?';

function AccordionSyllabus({
  title = defaultTitle,
  accordions = [],
  influencer = false,
  ...props
}) {
  const { textGradient } = useContext(ColorContext);
  const theme = useTheme();
  return (
    <section dir="rtl" className="">
      <Container sx={{ mb: { md: 10, xs: 8 } }} component={MotionContainer}>
        <m.div variants={varFade({ duration: 0.5 }).inRight}>
          <Typography
            sx={{
              mb: 2,
              textAlign: { md: 'justify', xs: 'center' },
              //   color: theme.palette[mainColor]?.main,
            }}
            variant="h3"
            component="div"
          >
            מה בדיוק לומדים בקורס?
            {/* <Typography mx={1} component="a" variant="h3" sx={textGradient}>
              סילבוס
            </Typography> */}
          </Typography>
          {influencer ? (
            <Typography
              sx={{ textAlign: { md: 'justify', xs: 'center' } }}
              color="text.secondary"
              variant="p"
              component="div"
            >
              אנחנו גאים בתכנים שבנינו עבורכם ומזמינים אתכם לגלות איך הקורס יקדם אתכם לרמה הבאה
              כיצרני תוכן מקצועיים ומבוקשים. בנוסף, כחלק מהקהילה שלנו תמשיכו לקבל עדכונים שוטפים,
              מדריכים, וובינרים וטיפים שיאפשרו לכם להישאר תמיד בחזית התעשייה 😎
            </Typography>
          ) : (
            <>
              <Typography color="text.secondary" variant="p">
                אנחנו כל כך גאים בתכנים שלנו ורוצים שתראו מה אתם מקבלים.
              </Typography>
              <br />
              <Typography color="text.secondary" variant="p">
                מזכירים לכם שבקהילה שלנו תמשיכו לקבל באופן שוטף עדכונים, מדריכים, וובינרים, טיפים
                ועוד 😎
              </Typography>
            </>
          )}
          <AccordionView mode={1} />
        </m.div>
      </Container>
    </section>
  );
}

export default AccordionSyllabus;
