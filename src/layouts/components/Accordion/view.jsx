'use client';

import { useState, useContext } from 'react';

// import AccordionSummary from '@mui/material/AccordionSummary';
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

import { customShadows } from 'src/theme/core';
import { ColorContext } from 'src/context/colorMain';

import { Iconify } from 'src/components/iconify';
import { ScrollComponent } from 'src/components/considering/Considering';

import { ComponentBlock } from './component-block';

// ----------------------------------------------------------------------

// const _accordions2 = [
//   {
//     id: 1,
//     value: 'value_1',
//     heading: 'האם אני באמת יכול/ה להפוך ליוצרת תוכן מקצועית? ✨',
//     // defaultOpen: true,
//     detail:
//       'בהחלט! אם את יצירתית ואוהבת להעביר זמן בדיגיטל וברשתות החברתיות, הקורס יעזור לך להיות רלוונטיים, להתמקצע ולבנות קהילה של לקוחות או עוקבים משלך, בין אם למטרה אישית או מקצועית. הקורס שלנו מעניק לך את הרבה כלים, טיפים וידע הדרושים כדי להפוך ליוצרת תוכן מצליחה. עם תמיכה של מנטורים מנוסים וקהילה תומכת, תבני תיק עבודות מרשים ותתחילי לבנות קריירה משגשגת ורווחית בתחום.',
//   },
//   {
//     id: 2,
//     value: 'value_2',
//     heading: 'איך אוכל להבטיח הצלחה בקריירה שלי כיוצר תוכן?',
//     detail:
//       'אנחנו לא רק מלמדים אותך את המיומנויות הטכניות, אלא גם מספקים לך את המפתח להצלחה ארוכת טווח. הקהילה הפרטית שלנו מחברת אותך עם יוצרים מנוסים ומעסיקים פוטנציאליים, ומעניקה לך את ההזדמנות להציג את הכישרונות שלך ולצמוח בקצב מהיר.',
//   },
//   {
//     id: 3,
//     value: 'value_3',
//     heading: 'מה אם אין לי ניסיון קודם?',
//     detail:
//       'אין צורך בניסיון קודם! הקורס שלנו מיועד למתחילים ולמתקדמים כאחד. נלווה אותך צעד אחר צעד, החל מהיסודות ועד ליצירת תוכן ברמה גבוהה. הקהילה שלנו תספק לך את התמיכה וההדרכה שאתה צריך בכל שלב.',
//   },
//   {
//     id: 4,
//     value: 'value_4',
//     heading: 'איך הקורס יעזור לי להרוויח כסף מיצירת תוכן?',
//     detail:
//       'אנחנו נסייע לך למצוא את ההזדמנות הראשונה שלך להרוויח כסף מיצירת תוכן. לאחר בנייה של תיק עבודות מקצועי והמלצות מהקהילה, תוכל להתחיל ולקבל הצעות עבודה ולהתפרנס מהתחביב שלך.',
//   },
//   {
//     id: 5,
//     value: 'value_5',
//     heading: 'אפשר להרוויח בזה כסף טוב? ',
//     detail:
//       'חד משמעית כן! 🙂 ואפילו הכנסה של מעל 5 ספרות בחודש . יוצרי תוכן שמחוברים לקהילה ויודעים לייצר סירטונים בעלי ערך כלכלי הם מצרך מבוקש בשוק והכל תלוי במידת ההשקעה והרצינות שלכם. למעשה אנחנו שואפים לחבר את כל הבוגרים שלנו לפרויקט ראשון בתשלום של עד 500 ש"ח ובתוך 3 חודשים מסיום הכנת תיק עבודות כך שתחזירו את כל ההשקעה שלכם ותתחילו להרוויח',
//   },
//   {
//     id: 6,
//     value: 'value_6',
//     heading: 'מה ההבדל בין הקורס הזה לקורסים אחרים?',
//     // defaultOpen: true,
//     detail:
//       'הקורס שלנו מציע חוויה ייחודית המשלבת למידה תיאורטית, תרגול מעשי, ותמיכה אישית. הקהילה הפרטית שלנו היא כמו משפחה, ותמיד תהיה שם כדי לעזור לך להצליח. בנוסף, המאמץ שלנו למצוא לך עבודה ראשונית כיוצרת תוכן שתזניק את הקריירה והנסיון שלך מבדילה אותנו מהשאר.',
//   },
//   {
//     id: 6.5,
//     value: 'value_6.5',
//     heading: 'האם הקורס מתאים לי אם אני עסוק בשעות היום?',
//     detail:
//       'בהחלט! הקורס שלנו גמיש ומאפשר לך ללמוד בקצב שלך ובזמנך החופשי, מכל מקום בעולם. החומרים זמינים לך 24/7, והקהילה שלנו פעילה בכל שעות היממה.',
//   },
//   {
//     id: 7,
//     value: 'value_7',
//     heading: 'מה אם לא אהיה מרוצה מהקורס? 🤔',
//     detail:
//       'אנחנו בטוחים שתאהבו את הקורס שלנו, אבל אם מסיבה כלשהי לא תהיו מרוצים, תקבלו החזר כספי מלא עד 14 יום מביצוע התשלום.',
//   },
//   {
//     id: 8,
//     value: 'value_8',
//     heading: 'איך נרשמים? ',
//     button: 'כאן מצטרפים',
//     defaultOpen: true,
//     detail:
//       'ההרשמה לקורס פשוטה ומהירה. לחצו על כפתור ההצטרפות שלמטה ומלאו את הטופס. תוך זמן קצר תוכלו להתחיל את המסע שלכם לעולם יצירת התוכן.',
//   },
// ];
const _accordions = [
  {
    id: 1,
    value: 'value_1',
    heading: 'האם הקורס מתאים לי אם אין לי ניסיון קודם ביצירת תוכן?',
    // defaultOpen: true,
    detail:
      'בהחלט! הקורס שלנו מיועד למתחילים ולמתקדמים כאחד. אנחנו מלווים אותך צעד אחר צעד, החל מהיסודות ועד ליצירת תוכן ברמה גבוהה. הקהילה שלנו תספק לך את התמיכה וההדרכה שאתה צריך בכל שלב, כך שתוכל להרגיש בטוח גם אם אתה מתחיל מאפס.',
  },
  {
    id: 2,
    value: 'value_2',
    heading: 'איך הקורס יעזור לי להרוויח כסף מיצירת תוכן?',
    detail:
      'הקורס שלנו מספק את כל הכלים שאתה צריך כדי להתחיל להרוויח מיצירת תוכן. לא רק שנעזור לך לבנות תיק עבודות מרשים, אלא שנדריך אותך איך למצוא את ההזדמנויות הראשונות שלך ולשווק את עצמך בצורה נכונה. בנוסף, תוכל להתחבר עם אנשי מקצוע מהתחום ולקבל הצעות עבודה ממשתתפים אחרים בקהילה שלנו.',
  },
  {
    id: 3,
    value: 'value_3',
    heading: 'איך אני יכול להיות בטוח שהקורס יעזור לי להצליח?',
    detail:
      'אנחנו לא רק מלמדים אותך את המיומנויות הטכניות, אלא גם מעניקים לך את התמיכה, הליווי והקהילה שתעזור לך לגדול ולהתפתח. הקורס בנוי כך שתוכל להתחיל להציג את הכישרון שלך כבר במהלך הלמידה, ותוכל לקבל פידבק בונה מקבוצת מומחים ויוצרים אחרים. התכנים שלנו מותאמים להתקדמות האישית שלך ומספקים לך את הכלים הנכונים להצלחה אמיתית.',
  },
  {
    id: 4,
    value: 'value_4',
    heading: 'מה אם אין לי ניסיון קודם?',
    detail:
      'אין צורך בניסיון קודם! הקורס שלנו מיועד למתחילים ולמתקדמים כאחד. נלווה אותך צעד אחר צעד, החל מהיסודות ועד ליצירת תוכן ברמה גבוהה. הקהילה שלנו תספק לך את כל התמיכה וההדרכה שאתה צריך בכל שלב.',
  },
  {
    id: 5,
    value: 'value_5',
    heading: 'מה אם אני לא אהיה מרוצה מהתהליך?',
    detail:
      'אנחנו בטוחים שתאהב את ההכשרה והקהילה שלנו, אך אם מכל סיבה לא תהיה מרוצה, תוכל לקבל החזר כספי מלא 3 חודשים לאחר סיום בניית תיק עבודות במידה ולא הצלחנו למצוא לך עבודה. המטרה שלנו היא לתת לך את חוויית הלמידה הטובה ביותר ולהבטיח שאתה מוכן להתחיל את דרכך בעולם יצירת התוכן ולהתפרנס מיצירת תוכן. צריך סבלנות וזה לא יקרה תוך יום אחד. המטרה שלנו היא שתוכל להתחיל להתפרנס כבר בחודשים הראשונים מיצירת תוכן ועם הזמן יצירת תוכן תהפוך להיות העיסוק המרכזי שלך.',
  },
  {
    id: 6,
    value: 'value_6',
    heading: 'מה ההבדל בין הקורס הזה לקורסים אחרים?',
    // defaultOpen: true,
    detail:
      'הקורס שלנו מציע חוויה ייחודית המשלבת למידה תיאורטית, תרגול מעשי, וחממה אישית. הקהילה הפרטית שלנו היא כמו משפחה, ותמיד תהיה שם כדי לעזור לך להצליח. בנוסף, אנחנו מתחייבים לסייע לך למצוא את העבודה הראשונה שלך כיוצר תוכן וללוות אותך כל הדרך להצלחה.',
  },
  // {
  //   id: 6.5,
  //   value: 'value_6.5',
  //   heading: 'האם הקורס מתאים לי אם אני עסוק בשעות היום?',
  //   detail:
  //     'בהחלט! הקורס שלנו גמיש ומאפשר לך ללמוד בקצב שלך ובזמנך החופשי, מכל מקום בעולם. החומרים זמינים לך 24/7, והקהילה שלנו פעילה בכל שעות היממה.',
  // },
  {
    id: 7,
    value: 'value_7',
    heading: 'האם יש תעודה בסיום הקורס?',
    detail:
      'כיום אין תעודה פורמלית בסיום הקורס, אך בחזון שלנו, אנחנו שואפים שהתעודה שתינתן בעתיד תהפוך לסמל של איכות ומקצועיות, ותהיה מוכרת על ידי יוצרי התוכן המובילים והמשרדים הטובים בארץ. אנחנו פועלים כדי שהתכנים וההכשרה שלנו יעמדו בסטנדרטים הגבוהים ביותר, כך שהתעודה שתהיה בעתיד תייצג את ההכשרה המקצועית והיוקרתית ביותר בשוק.',
  },
  {
    id: 8,
    value: 'value_8',
    heading: 'איך נרשמים? ',
    button: 'כאן מצטרפים',
    defaultOpen: true,
    detail:
      'ההרשמה לקורס פשוטה ומהירה. לחצו על כפתור ההצטרפות שמופיע בדף, מלאו את הפרטים ותוכלו להתחיל את המסע שלכם לעולם יצירת התוכן.',
  },
];

const _Syllabus = {
  פתיח: [
    'ברוכים הבאים',
    'איך להוציא את המיטב מהקורס',
    'איך להישאר רלוונטים ליצירת תוכן גם ב-2090',
    'המטרה הכי גדולה של יוצרי התוכן - להגדיל קהילה',
  ],
  'תוכן הקורס': ['תוכן הקורס'],
  היכרות: ['מי אני ?'],
  'למה דווקא תוכן בצורת וידיאו?': ['למה צריך ליצור תוכן בעיקר באמצעות וידיאו?'],
  'איך להרוויח כסף בתור יוצר תוכן': [
    'איך לעשות כסף מהאינסטגרם',
    'איך לעשות כסף מהיוטיוב',
    'על מה אתם אמורים לשים הכי הרבה דגש בשביל לעשות כסף מהרשת החברתית?',
    'מי יכניס לכם הכי הרבה כסף לכיס ?',
    'באיזה רשת חברתית הכי כדאי ליצור תוכן ?',
  ],
  'משא ומתן בסיסי עם חברות בתור יוצרי תוכן עצמאים': [
    'איך לעשות משא ומתן מעמדה עוצמתית וכנה עם חברות',
    'איך למדוד תוצאות בשיתופי פעולה',
    'לסיכום',
  ],
  'איך להפוך ליוצרי תוכן שכל החברות רוצות לעבוד איתכם?': [
    'שלב 1 : למצוא תוכן עם ביקוש בטווח הארוך : מציאת נישה חכמה',
    'שלב 2 - השיטה ליצור הרבה תוכן ברמה גבוהה שלא סיפרו לכם',
    'שלב 3 : יצירת הסרטון (מרעיון למציאות) - איך הופכים רעיון לתוכן ויזואלי : כתיבת התסריט',
    'שלב 4 : צילום ותאורה כמו מקצוענים',
    'שלב 5 : למשוך תשומת לב של הצופים בעזרת עריכה',
    'שלב 6 : העלאת התוכן לרשת החברתית בצורה נכונה יותר',
    'שלב 7 : איך לנתח את התוכן שלכם ולמקסם את התוצאות בדפים שלכם',
  ],
  'ההזדמנות ביצירת תוכן': ['הפוטנציאל ביצירת תוכן'],
  'אל תעשו את הטעות הזו : במה יוצר תוכן צריך להתמקד בהתחלה': [
    'היכולת שמבדילה בין יוצרי תוכן בינוניים ליוצרי תוכן מצליחים',
  ],
  'המיינדסט של יוצרי תוכן מובילים': ['מה המנטליות שנדרשת ממכם בשביל להצליח בתור יוצרי תוכן'],
  לסיכום: ['כמה נקודות לקחת מכאן והלאה'],
  'פרק בונוס : איך ליצור סרטונים קצרים ויראלים': ['פרק בונוס : ניר לוגאסי'],
};

// ----------------------------------------------------------------------

export function AccordionView({ title, accordions = _accordions, mode = 0 }) {
  const [controlled, setControlled] = useState(false);
  const theme = useTheme();
  const { mainColor, textGradient } = useContext(ColorContext);
  const [expanded, setExpanded] = useState(() => {
    const res = {};
    if (mode === 1) {
      Object.keys(_Syllabus).forEach((item) => {
        res[item] = false;
      });
    } else {
      accordions.forEach((item) => {
        if (item.defaultOpen) {
          res[item.value] = true;
        }
      });
    }
    return res;
  });

  let accordionDiv;

  if (mode === 1) {
    accordionDiv = (
      <ComponentBlock
        sx={{
          my: 4,
          pt: 2,
          mx: 0,
          px: { md: 2, xs: 0.8 },
          width: 1,
          maxWidth: { md: '70%', xs: '100%' },
        }}
      >
        <Typography textAlign="start" variant="h4" component="h4" sx={{ ...textGradient }}>
          סילבוס הקורס
        </Typography>
        <div className=" z-10 mx-0 px-0">
          {Object.keys(_Syllabus).map((accordion, index) => (
            <Accordion
              // expanded={expanded[accordion] || true}
              // onChange={() =>
              //   setExpanded((p) => ({
              //     ...p,
              //     [accordion.value]: p[accordion.value] ? !p[accordion.value] : true,
              //   }))
              // }
              // defaultExpanded
              sx={{ '&.Mui-expanded': { boxShadow: customShadows().z1 } }}
              onChange={() =>
                setExpanded((p) => ({
                  ...p,
                  [accordion]: p[accordion] ? !p[accordion] : false,
                }))
              }
              key={index}
              id={accordion}
              // sx={{ mt: index === accordion.length ? 0 : 4 }}
            >
              <AccordionSummary
                // expandIcon={expanded[accordion.value] ? <RemoveFormattingIcon /> : <AddIcon />}
                expandIcon={
                  <Iconify
                    icon={expanded[accordion] ? 'eva:arrow-up-fill' : 'eva:arrow-down-fill'}
                  />
                }
                sx={{
                  zIndex: 10,
                  '& .MuiAccordionSummary-content': {
                    mb: 0,
                  },
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    transition: 'transform 0.4s ease-in-out', // Adjust the duration and easing of the animation
                  },
                }}
                // expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                // expandIcon={<ExpandMoreRounded />}
              >
                <Typography component="p" my={1.2} ml={6} mr={1} variant="p">
                  {accordion}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul className="list-disc mr-6">
                  {_Syllabus[accordion].map((item, indx) => (
                    <Typography component="li" key={indx}>
                      {item}
                    </Typography>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </ComponentBlock>
    );
  } else {
    accordionDiv = (
      <ComponentBlock
        sx={{
          my: 0,
          pt: 2,
          mx: 0,
          px: { md: 2, xs: 0.8 },
          width: 1,
          maxWidth: { md: '70%', xs: '100%' },
        }}
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
              sx={{ mt: index === accordion.length ? 0 : 4 }}
            >
              <AccordionSummary
                // expandIcon={expanded[accordion.value] ? <RemoveIcon /> : <AddIcon />}
                expandIcon={
                  <Iconify
                    icon={expanded[accordion.value] ? 'ic:round-minus' : 'mingcute:add-fill'}
                  />
                }
                sx={{
                  zIndex: 10,
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    transition: 'transform 0.4s ease-in-out', // Adjust the duration and easing of the animation
                  },
                }}
                // expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                // expandIcon={<ExpandMoreRounded />}
              >
                <Typography ml={8} variant="p">
                  {accordion.heading}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ opacity: 0.8 }} lineHeight={2}>
                  {accordion.detail}
                </Typography>
                {accordion.button && (
                  <Container sx={{ width: 1, display: 'flex', justifyContent: 'center' }}>
                    <Button
                      sx={{
                        zIndex: 40,
                        fontSize: { md: '1rem', xs: '1rem' },
                        my: 2,
                        borderRadius: 1,
                      }}
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
    );
  }

  return (
    // <AnimateBorder
    //   sx={{ borderRadius: 1.5, maxWidth: { md: '66%', xs: '100%' } }}
    //   animate={{ color: theme.palette.success.main || '#fff' }}
    // >
    <>{accordionDiv}</>
    // </AnimateBorder>
  );
}
