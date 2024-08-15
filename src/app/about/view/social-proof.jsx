import Image from 'next/image';
import { m } from 'framer-motion';
import { useContext } from 'react';

import { Box, List, useTheme, ListItem, Container, Typography, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { ColorContext } from 'src/context/colorMain';

import { Iconify } from 'src/components/iconify';
import { varFade, AnimateText, MotionContainer } from 'src/components/animate';

const mockUps = ['analysis', 'creative', 'followers', 'views'];

const learningTopics = {
  'ניתוח נתונים ברשתות החברתיות': [
    'איך לנתח ולקרוא את המספרים מאחורי התוכן שאני מייצר',
    'איך להמיר נותני צפיות ועוקבים להכנסה',
    'איך להמיר יצירת תוכן להכנסה',
  ],
  'למה חשוב "לשבור את הקרח" עם העוקבים שלך': [
    'מה חשוב לכל העוקבים (וגם לך) כשבוחרים להוסיף עוקב',
    'איך לייצר סרטונים קצרים עם תוכן שיווקי סמוי',
    'איך לשלב את האופי שלך עם המטרות של הערוץ',
  ],
  'למשוך לייקים ושיתופים בלי הרבה עוקבים': [
    'איך לגרום לרשת החברתית לקדם אותי',
    'איך לייצר תוכן בייתי שייראה מקצועי',
    'איך להיות עקבי ולייחד את הערוץ',
  ],
  'מתחילים מ - 0': [
    'בניית ערוץ תוכן ודגשים לקידום הערוץ',
    'איך ללמוד ולהשתפר יחד עם הנתונים',
    'תוכן שנראה אותנטי ומקצועי בו זמנית',
  ],
};

function SocialProof({ title, bullets = [], ...props }) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  return (
    <Box my={8} mx={{ md: 8, xs: 4 }}>
      <Container maxWidth={500}>
        <AnimateText
          variant="h2"
          component="h2"
          sx={{ textAlign: 'start' }}
          text="מה נלמד בקורס?"
          variants={varFade({}).inLeft}
        />
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
  const colorPalette = Object.values(theme.palette)[index]?.dark || `${mainColor}.lighter`;
  const bulletsList = (
    <m.div variants={varFade().inLeft} sx={{ width: 'auto' }}>
      <Typography variant="h3" component="h3" sx={{ color: `${mainColor}.main` }}>
        {title}
      </Typography>
      <List>
        {bullets.map((item, indx) => (
          <ListItem key={indx} sx={{ padding: 0, textAlign: 'justify' }}>
            <Iconify icon="lets-icons:check-fill" width={30} />
            <Typography sx={{ mx: { md: 4, xs: 2 } }} variant="h4">
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

      <m.div style={{ borderRadius: '250px' }} variants={varFade().inLeft}>
        <Box sx={{ width: { xs: '70%', md: '90%' } }}>
          <Image
            loading="lazy"
            alt="Social reference"
            width={250}
            height={200}
            className="hover:scale-150  transition-transform max-sm:w-2/3"
            src={`${CONFIG.site.basePath}/assets/images/socialProof/${picName}.png`}
            //   ratio="1/1"
            style={{
              transition: 'transform 0.7s ease-in',
              borderRadius: !isMobile ? '52px' : '32px',
              transform: `rotate(${even ? '-' : ''}4deg)`,
              boxShadow: `${even ? '-' : ''}30px 5px 40px ${colorPalette}`,
            }}
          />
        </Box>
      </m.div>

      {!even && bulletsList}
    </Container>
  );
};
