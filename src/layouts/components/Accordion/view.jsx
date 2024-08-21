'use client';

import { useState, useContext } from 'react';

// import AccordionSummary from '@mui/material/AccordionSummary';
import { ExpandMore } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
// import AccordionDetails from '@mui/material/AccordionDetails';
import {
  Button,
  useTheme,
  Accordion,
  Container,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { basePalette } from 'src/theme/core';
import { ColorContext } from 'src/context/colorMain';

import { AnimateBorder } from 'src/components/animate';

import { ComponentBlock } from './component-block';

// ----------------------------------------------------------------------

const _accordions = [
  {
    id: 1,
    value: 'value_1',
    heading: 'האם אני באמת יכולה להפוך ליוצרת תוכן מקצועית? ✨',
    detail:
      'בהחלט! אם אתם אנשים יצירתיים ואוהבים להעביר זמן בדיגיטל וברשתות החברתיות, הקורס יעזור לכם להיות רלוונטיים, להתמקצע ולהשתפר בתכנים שתיצרו ללקוחות או לעוקבים שלכם, לכל מטרה אישית או מקצועית. הקורס שלנו מעניק לך את כל הכלים והידע הדרושים כדי להפוך ליוצרת תוכן מצליחה. עם תמיכה של מנטורים מנוסים וקהילה תומכת, תבני תיק עבודות מרשים ותתחילי לבנות קריירה משגשגת ורווחית בתחום.',
  },
  {
    id: 2,
    value: 'value_2',
    heading: 'איך אוכל להבטיח הצלחה בקריירה שלי כיוצר תוכן?',
    detail:
      'אנחנו לא רק מלמדים אותך את המיומנויות הטכניות, אלא גם מספקים לך את המפתח להצלחה ארוכת טווח. הקהילה הפרטית שלנו מחברת אותך עם יוצרים מנוסים ומעסיקים פוטנציאליים, ומעניקה לך את ההזדמנות להציג את הכישרונות שלך ולצמוח בקצב מהיר.',
  },
  {
    id: 3,
    value: 'value_3',
    heading: 'מה אם אין לי ניסיון קודם?',
    detail:
      'אין צורך בניסיון קודם! הקורס שלנו מיועד למתחילים ולמתקדמים כאחד. נלווה אותך צעד אחר צעד, החל מהיסודות ועד ליצירת תוכן ברמה גבוהה. הקהילה שלנו תספק לך את התמיכה וההדרכה שאתה צריך בכל שלב.',
  },
  {
    id: 4,
    value: 'value_4',
    heading: 'איך הקורס יעזור לי להרוויח כסף מיצירת תוכן?',
    detail:
      'אנחנו נסייע לך למצוא את ההזדמנות הראשונה שלך להרוויח כסף מיצירת תוכן. לאחר בנייה של תיק עבודות מקצועי והמלצות מהקהילה, תוכל להתחיל ולקבל הצעות עבודה ולהתפרנס מהתחביב שלך.',
  },
  {
    id: 5,
    value: 'value_5',
    heading: 'אפשר להרוויח בזה כסף טוב? ',
    detail:
      'חד משמעית כן! 🙂 ואפילו הכנסה של מעל 5 ספרות בחודש . יוצרי תוכן שמחוברים לקהילה ויודעים לייצר סירטונים בעלי ערך כלכלי הם מצרך מבוקש בשוק והכל תלוי במידת ההשקעה והרצינות שלכם. למעשה אנחנו שואפים לחבר את כל הבוגרים שלנו לפרויקט ראשון בתשלום של עד 500 ש"ח, תוך 3 חודשים מסיום הכנת תיק עבודות כך שלמעשה תחזירו את כל ההשקעה שלכם ותתחילו להרוויח',
  },
  {
    id: 6,
    value: 'value_6',
    heading: 'מה ההבדל בין הקורס הזה לקורסים אחרים?',
    detail:
      'הקורס שלנו מציע חוויה ייחודית המשלבת למידה תיאורטית, תרגול מעשי, ותמיכה אישית. הקהילה הפרטית שלנו היא כמו משפחה, ותמיד תהיה שם כדי לעזור לך להצליח. בנוסף, ההתחייבות שלנו למצוא לך עבודה ראשונית מבדילה אותנו מהשאר.',
  },
  {
    id: 6.5,
    value: 'value_6.5',
    heading: 'האם הקורס מתאים לי אם אני עסוק בשעות היום?',
    detail:
      'בהחלט! הקורס שלנו גמיש ומאפשר לך ללמוד בקצב שלך ובזמנך החופשי. החומרים זמינים לך 24/7, והקהילה שלנו פעילה בכל שעות היממה.',
  },
  {
    id: 7,
    value: 'value_7',
    heading: 'מה אם לא אהיה מרוצה מהקורס? 🤔',
    detail:
      'אנחנו בטוחים שתאהב את הקורס שלנו, אבל אם מסיבה כלשהי לא תהיו מרוצים, תקבלו החזר כספי מלא עד 14 יום מביצוע התשלום.',
  },
  {
    id: 8,
    value: 'value_8',
    heading: 'איך נרשמים ? ',
    button: 'כאן מצטרפים',
    detail:
      'ההרשמה לקורס פשוטה ומהירה. לחץ על כפתור ההרשמה באתר שלנו ומלא את הטופס. תוך זמן קצר תוכל להתחיל את המסע שלך לעולם יצירת התוכן. 🎉',
  },
];

// ----------------------------------------------------------------------

export function AccordionView({ title, accordions = _accordions }) {
  const [controlled, setControlled] = useState(false);
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  const [expanded, setExpanded] = useState({});
  console.log('expended: ', expanded);

  return (
    // <AnimateBorder
    //   sx={{ borderRadius: 1.5, maxWidth: { md: '66%', xs: '100%' } }}
    //   animate={{ color: theme.palette.success.main || '#fff' }}
    // >
    <ComponentBlock sx={{ mx: 0, width: 1, maxWidth: { md: '70%', xs: '100%' } }}>
      <div className=" z-10 mx-0">
        {accordions.map((accordion, index) => (
          <AnimateBorder
            sx={{ borderRadius: 1, mb: 2, zIndex: 50 }}
            key={index}
            animate={{
              disable: !expanded[accordion.value],
              width: expanded[accordion.value] === true ? '2px' : 0,
              color:
                theme.palette[Object.keys(basePalette)[index % 6]]?.dark ||
                theme.palette.secondary.main,
            }}
          >
            <Accordion
              // expanded={expanded[accordion.value] || true}
              // onChange={() =>
              //   setExpanded((p) => ({
              //     ...p,
              //     [accordion.value]: p[accordion.value] ? !p[accordion.value] : true,
              //   }))
              // }
              // defaultExpanded={undefined}
              onChange={() =>
                setExpanded((p) => ({
                  ...p,
                  [accordion.value]: p[accordion.value] ? !p[accordion.value] : true,
                }))
              }
              // sx={{ borderBottom: '1px, pb: 1 }}
              key={index}
              id={accordion.value}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{ zIndex: 10 }}
                // expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                // expandIcon={<ExpandMoreRounded />}
              >
                <Typography variant="subtitle1">{accordion.heading}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ opacity: 0.8 }} lineHeight={2}>
                  {accordion.detail}
                </Typography>
                {accordion.button && (
                  <Container sx={{ width: 1, my: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button
                      sx={{ zIndex: 40, fontSize: { md: '1rem', xs: '1rem' }, borderRadius: 1 }}
                      variant="outlined"
                      // size="large"
                      color={mainColor}
                    >
                      {accordion.button}
                    </Button>
                  </Container>
                )}
              </AccordionDetails>
            </Accordion>
            {!expanded[accordion.value] && <hr className="border-gray-700/50" />}
          </AnimateBorder>
        ))}
      </div>
    </ComponentBlock>
    // </AnimateBorder>
  );
}
