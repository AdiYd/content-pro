import Image from 'next/image';
import { m } from 'framer-motion';
import { useContext } from 'react';

import { Box, List, useTheme, ListItem, Container, Typography, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { ColorContext } from 'src/context/colorMain';

import { Iconify } from 'src/components/iconify';
import { varFade, AnimateText, MotionContainer, animateTextClasses } from 'src/components/animate';

const mockUps = ['analysis', 'creative', 'followers', 'views'];

const learningTopics = {
  'ניתוח נתונים ברשתות החברתיות': [
    'איך לנתח ולקרוא את המספרים מאחורי התוכן שלנו',
    'איך להשתמש בנתונים כדי להסיק מסקנות ולהשתפר',
    'איך להמיר נתוני צפיות ועוקבים להכנסה',
  ],
  'למה חשוב "לשבור את הקרח" עם העוקבים שלך': [
    'מה חשוב לכל העוקבים (וגם לך) כשבוחרים להוסיף עוקב',
    'איך לייצר סרטונים קצרים עם תוכן שיווקי סמוי',
    'איך לשלב את האופי שלך עם בערוץ - ולמה זה כ"כ חשוב',
  ],
  'לא חייב המון עוקבים בשביל הצלחות, לייקים ושיתופים': [
    'איך לגרום לרשת החברתית לקדם אותי',
    'איך לייצר תוכן אותנטי וגם מקצועי',
    'מספר עוקבים הוא רק תוצר לוואי של תוכן מעניין',
  ],
  'מתחילים מ - 0': [
    'בניית ערוץ תוכן ודגשים לקידום הערוץ',
    'טעויות נפוצות שיחסכו לכם זמן יקר בדרך אל ההצלחה',
    'איך ליצור קהילה שלכם שאוהבת ומעריכה את היצירות שלכם',
  ],
};

function SocialProof({ title, bullets = [], ...props }) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  const themeColor = theme.palette[mainColor]?.main || theme.palette.info.main;
  return (
    <Box my={2} mx={{ md: 8, xs: 4 }}>
      <Container maxWidth={500}>
        <AnimateText
          className={animateTextClasses.word}
          variant="h3"
          component="h3"
          sx={{
            textAlign: 'start',
            '& .animate-text-word[data-index="3"]': {
              color: themeColor,
            },
          }}
          text="האם נלמד דברים יחודיים בקורס?"
          variants={varFade({}).inLeft}
        />
        <Typography
          variant="body1"
          sx={{
            textAlign: 'start',
            opacity: 0.8,
          }}
        >
          כמובן! אנחנו שמים דגש על הפרטים הקטנים שעושים את ההבדל - היצירתיות, הייחודיות והדגשים שרק
          המקצוענים שמים לב אליהם
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'start',
            opacity: 0.8,
          }}
        >
          ובנינו? גם הלקוחות והעוקבים שלכם ירגישו את הבדל, הנה כמה נקודות קטנות שיתנו לכם יתרון גדול
        </Typography>
      </Container>
      {Object.keys(learningTopics).map((item, indx) => (
        <RowX
          key={indx}
          title={item}
          bullets={learningTopics[item]}
          picName={mockUps[indx]}
          index={indx + 1}
          even={Boolean(indx % 2)}
        />
      ))}

      {/* {.map((item, index) => (
        <RowX key={index} picName={item} index={index + 1} even={Boolean(index % 2)} />
      ))} */}
    </Box>
  );
}

export default SocialProof;

const RowX = ({
  title = 'כותרת',
  bullets = ['דגש ראשון', 'דגש שני'],
  even = true,
  index,
  picName = 'followers',
}) => {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const colorPalette = Object.values(theme.palette)[index + 1]?.dark || `${mainColor}.light`;
  const bulletsList = (
    <m.div variants={varFade().inLeft} sx={{ width: 'auto' }}>
      <Typography variant="h3" component="h3" sx={{ color: `${mainColor}.main` }}>
        {title}
      </Typography>
      <List>
        {bullets.map((item, indx) => (
          <ListItem key={indx} sx={{ padding: 0, textAlign: 'justify' }}>
            <Iconify icon="lets-icons:check-fill" width={20} />
            <Typography sx={{ fontSize: '1rem', mx: { md: 4, xs: 2 } }} variant="h4">
              {item}
            </Typography>
          </ListItem>
        ))}
      </List>
    </m.div>
  );
  return (
    <Container
      component={MotionContainer}
      className="check"
      sx={{
        mx: { md: 4, xs: 2 },
        my: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: { md: 'inherit', xs: even ? 'column' : 'column-reverse' },
        gap: { md: 12, xs: 8 },
      }}
    >
      {even && bulletsList}

      <m.div style={{ display: 'flex', justifyContent: 'center' }} variants={varFade().inLeft}>
        <Box sx={{ width: { xs: '70%', md: '90%' } }}>
          <Image
            loading="lazy"
            alt="Social reference"
            width={200}
            height={150}
            className="hover:scale-150  transition-transform max-sm:w-2/3"
            src={`${CONFIG.site.basePath}/assets/images/socialProof/${picName}.png`}
            //   ratio="1/1"
            style={{
              transition: 'transform 0.7s ease-in',
              borderRadius: !isMobile ? '32px' : '25px',
              transform: `rotate(${even ? '-' : ''}4deg)`,
              boxShadow: `${even ? '-' : ''}10px 5px 20px ${colorPalette}`,
            }}
          />
        </Box>
      </m.div>

      {!even && bulletsList}
    </Container>
  );
};
