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

import { ColorContext } from 'src/context/colorMain';

import { ScrollComponent } from 'src/components/considering/Considering';

import { ComponentBlock } from './component-block';

// ----------------------------------------------------------------------

const _accordions = [
  {
    id: 1,
    value: 'value_1',
    heading: 'האם אני באמת יכול/ה להפוך ליוצרת תוכן מקצועית? ✨',
    // defaultOpen: true,
    detail:
      'בהחלט! אם את יצירתית ואוהבת להעביר זמן בדיגיטל וברשתות החברתיות, הקורס יעזור לך להיות רלוונטיים, להתמקצע ולבנות קהילה של לקוחות או עוקבים משלך, בין אם למטרה אישית או מקצועית. הקורס שלנו מעניק לך את הרבה כלים, טיפים וידע הדרושים כדי להפוך ליוצרת תוכן מצליחה. עם תמיכה של מנטורים מנוסים וקהילה תומכת, תבני תיק עבודות מרשים ותתחילי לבנות קריירה משגשגת ורווחית בתחום.',
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
      'חד משמעית כן! 🙂 ואפילו הכנסה של מעל 5 ספרות בחודש . יוצרי תוכן שמחוברים לקהילה ויודעים לייצר סירטונים בעלי ערך כלכלי הם מצרך מבוקש בשוק והכל תלוי במידת ההשקעה והרצינות שלכם. למעשה אנחנו שואפים לחבר את כל הבוגרים שלנו לפרויקט ראשון בתשלום של עד 500 ש"ח ובתוך 3 חודשים מסיום הכנת תיק עבודות כך שתחזירו את כל ההשקעה שלכם ותתחילו להרוויח',
  },
  {
    id: 6,
    value: 'value_6',
    heading: 'מה ההבדל בין הקורס הזה לקורסים אחרים?',
    // defaultOpen: true,
    detail:
      'הקורס שלנו מציע חוויה ייחודית המשלבת למידה תיאורטית, תרגול מעשי, ותמיכה אישית. הקהילה הפרטית שלנו היא כמו משפחה, ותמיד תהיה שם כדי לעזור לך להצליח. בנוסף, המאמץ שלנו למצוא לך עבודה ראשונית כיוצרת תוכן שתזניק את הקריירה והנסיון שלך מבדילה אותנו מהשאר.',
  },
  {
    id: 6.5,
    value: 'value_6.5',
    heading: 'האם הקורס מתאים לי אם אני עסוק בשעות היום?',
    detail:
      'בהחלט! הקורס שלנו גמיש ומאפשר לך ללמוד בקצב שלך ובזמנך החופשי, מכל מקום בעולם. החומרים זמינים לך 24/7, והקהילה שלנו פעילה בכל שעות היממה.',
  },
  {
    id: 7,
    value: 'value_7',
    heading: 'מה אם לא אהיה מרוצה מהקורס? 🤔',
    detail:
      'אנחנו בטוחים שתאהבו את הקורס שלנו, אבל אם מסיבה כלשהי לא תהיו מרוצים, תקבלו החזר כספי מלא עד 14 יום מביצוע התשלום.',
  },
  {
    id: 8,
    value: 'value_8',
    heading: 'איך נרשמים? ',
    button: 'כאן מצטרפים',
    defaultOpen: true,
    detail:
      'ההרשמה לקורס פשוטה ומהירה. לחצו על כפתור ההצטרפות שלמטה ומלאו את הטופס. תוך זמן קצר תוכלו להתחיל את המסע שלכם לעולם יצירת התוכן.',
  },
];

// ----------------------------------------------------------------------

export function AccordionView({ title, accordions = _accordions }) {
  const [controlled, setControlled] = useState(false);
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  const [expanded, setExpanded] = useState(() => {
    const res = {};
    accordions.forEach((item) => {
      if (item.defaultOpen) {
        res[item.value] = true;
      }
    });
    return res;
  });

  return (
    // <AnimateBorder
    //   sx={{ borderRadius: 1.5, maxWidth: { md: '66%', xs: '100%' } }}
    //   animate={{ color: theme.palette.success.main || '#fff' }}
    // >
    <ComponentBlock
      sx={{ mx: 0, px: { md: 2, xs: 0.8 }, width: 1, maxWidth: { md: '70%', xs: '100%' } }}
    >
      {/* <div className=" z-10 mx-0 px-0">
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
              defaultExpanded={accordion.defaultOpen}
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
                      onClick={() => ScrollComponent('signUp')}
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
      </div> */}
      <div className=" z-10 mx-0 px-0">
        {accordions.map((accordion, index) => (
          <Accordion
            // expanded={expanded[accordion.value] || true}
            // onChange={() =>
            //   setExpanded((p) => ({
            //     ...p,
            //     [accordion.value]: p[accordion.value] ? !p[accordion.value] : true,
            //   }))
            // }
            defaultExpanded={accordion.defaultOpen}
            onChange={() =>
              setExpanded((p) => ({
                ...p,
                [accordion.value]: p[accordion.value] ? !p[accordion.value] : true,
              }))
            }
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
                    onClick={() => ScrollComponent('signUp')}
                    color={mainColor}
                  >
                    {accordion.button}
                  </Button>
                </Container>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </ComponentBlock>
    // </AnimateBorder>
  );
}
