// eslint-disable-next-line import/no-extraneous-dependencies
import { m } from 'framer-motion';
import { useState, useEffect, useContext } from 'react';

import { Box, colors, useTheme, Container, Typography } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { Iconify } from '../iconify';
import { varSlide, varBounce, MotionContainer } from '../animate';

export const arrowsDown = (
  mainColor = 'currentColor',
  accentColor = 'currentColor',
  width = '28px',
  className = ''
) => (
  <div className={`flex justify-start ${className}`}>
    <svg width={width} height={width} viewBox="0 -960 960 960">
      <defs>
        <linearGradient id="gradientAnimation" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="20%" stopColor={mainColor} />
          {/* <stop offset="80%" stopColor="#000" /> */}
          <stop offset="100%" stopColor={accentColor} />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values="1 0; 0 1"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <path
        fill="url(#gradientAnimation)"
        d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z"
      />
    </svg>
  </div>
);

// export const arrowsDown2 = (
//   mainColor = 'currentColor',
//   accentColor = 'currentColor',
//   width = '28px',
//   className = ''
// ) => (
//   <div className={`flex justify-start ${className}`}>
//     <svg width={width} height={width} viewBox="0 -960 960 960" fill="url(#gradientAnimation)">
//       <defs>
//         <linearGradient id="gradientAnimation" x1="0%" y1="0%" x2="0%" y2="100%">
//           <animateTransform
//             attributeName="transform"
//             type="translateY"
//             from="0%"
//             to="100%"
//             dur="1s"
//             repeatCount="indefinite"
//           />
//           <stop offset="0%" stopColor={accentColor} />
//           <stop offset="100%" stopColor={mainColor} />
//         </linearGradient>
//       </defs>
//       <path d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z" />
//     </svg>
//   </div>
// );

// const steps2 = [
//   {
//     name: 'נרשמים לקורס',
//     description: 'לומדים את הטכניקות, הכלים והטיפים הכי חמים',
//     href: '#',
//     id: 'step 1',
//     iconName: 'bi:laptop',
//     InnerSteps: ['מתחילים מ - 0', 'לומדים ממי שכבר עשו את זה', 'מתרגלים, שואלים ומתנסים'],
//   },
//   {
//     name: 'מצטרפים לקהילה שלנו',
//     description: 'מתחברים לקהילה, משתפים עבודות ומקבלים טיפים של אלופים',
//     href: '#',
//     id: 'step 2',
//     iconName: 'iconoir:community',
//     InnerSteps: [
//       'קהילה אקסלוסיבית 🤫',
//       'המקום לשאלות, עדכונים ועזרה',
//       'תכני העשרה, מדריכים וטיפים שיקצרו לכם את הדרך 🚀',
//     ],
//   },
//   {
//     name: 'בונים תיק עבודות',
//     description: 'מתחילים להתנסות, יוצרים סירטונים ותכנים ומשתפרים',
//     href: '#',
//     id: 'step 3',
//     iconName: 'dashicons:portfolio', // 'bytesize:portfolio'
//     InnerSteps: [
//       'משקיעים בתיק מרשים',
//       'משתפים רעיונות ומתחילים ליצור תוכן מקורי',
//       'צוברים ניסיון, ידע וקשרים',
//     ],
//   },

//   {
//     name: 'הכנסה מיצירת תוכן',
//     description: 'לקהילה שלנו יש ביקוש, מי שיקח את הכלים שלנו ברצינות יקבל הצעות עבודה',
//     href: '#',
//     id: 'step 4',
//     iconName: 'game-icons:money-stack',
//     InnerSteps: [
//       'הקהילה שלנו מבוקשת',
//       'יוצרים שיתופי פעולה עם יוצרי תוכן אחרים ',
//       'יוצרים חיבורים עם לקוחות פוטנציאלים 🤝',
//     ],
//   },
//   {
//     name: '',
//     description: '',
//     href: '#',
//     id: 'final step',
//     final: true,
//     iconName: 'solar:cup-star-linear',
//     InnerSteps: ['איך מרוויחים 500 ש"ח מסירטון קצר? בואו לגלות 😉'],
//   },
// ];
const steps = [
  {
    name: 'נרשמים להכשרה שלנו',
    description: 'לומדים את הטכניקות, הכלים והטיפים הכי חמים',
    href: '#',
    id: 'step 1',
    iconName: 'bi:laptop',
    InnerSteps: [
      'מקבלים מייל עם גישה לתכנים הלימודיים ולקהילה',
      'לומדים ממי שכבר עשו את זה',
      'מתחילים לתרגל',
      'מצטרפים לקבוצת ואטסאפ',
    ],
  },
  {
    name: 'קהילה אקסקלוסיבית מלאה ביוצרי תוכן',
    // emoji: '🤫',
    description: 'מתחברים לקהילה, משתפים עבודות ומקבלים טיפים של אלופים',
    href: '#',
    id: 'step 2',
    iconName: 'iconoir:community',
    InnerSteps: [
      'שואלים, מתייעצים ועוזרים אחד לשני',
      'תכני העשרה קבועים מדריכים וטיפים שיקצרו לכם את הדרך 🚀',
      'יוצרים סרטונים ביחד עם יוצרי התוכן בקבוצה',
    ],
  },
  {
    name: 'צוברים ניסיון וידע ייחודי שיש רק ליוצרי התוכן שלנו',
    description: 'מתחילים להתנסות, יוצרים סירטונים ותכנים ומשתפרים',
    href: '#',
    id: 'step 3',
    iconName: 'dashicons:portfolio', // 'bytesize:portfolio'
    InnerSteps: [
      'משקיעים בתיק עבודות מרשים שיבלוט בקלות',
      'משתפים רעיונות ומתחילים ליצור תוכן מקורי',
      'צוברים ניסיון וקשרים ומתחילים',
    ],
  },

  {
    name: 'אנחנו נעזור לכם ליצור חיבורים עם לקוחות פוטנציאליים',
    description: 'לקהילה שלנו יש ביקוש, מי שיקח את הכלים שלנו ברצינות יקבל הצעות עבודה',
    href: '#',
    id: 'step 4',
    iconName: 'game-icons:money-stack',
    InnerSteps: [
      'הקהילה שלנו מבוקשת',
      'ממשיכים להגדיל את החשיפה ברשתות ולשפר את התוכן',
      'יוצרים חיבורים ושיתופי פעולה 🤝',
    ],
  },
  {
    name: '',
    description: '',
    href: '#',
    id: 'final step',
    final: true,
    iconName: 'solar:cup-star-linear',
    InnerSteps: ['איך מרוויחים 500 ש"ח מסרטון של עד דקה? בואו לגלות 😉'],
  },
];

const stepsInfluencerGemini = [
  {
    name: 'נרשמים להכשרה שלנו',
    description: 'הצעד הראשון לקראת קריירה יציבה כיוצר תוכן',
    href: '#',
    id: 'step 1',
    iconName: 'ic:baseline-school', // Represents learning and education
    InnerSteps: [
      'מקבלים גישה מלאה לתכנים הלימודיים',
      'לומדים ממומחים בתחום',
      'מתחילים ליצור את התוכן הראשון שלכם',
    ],
  },
  {
    name: 'קהילה אקסקלוסיבית של יוצרי תוכן',
    description: 'הצטרפו לקהילה תומכת ותתחילו לצמוח',
    href: '#',
    id: 'step 2',
    iconName: 'ic:baseline-people', // Represents a community
    InnerSteps: [
      'שואלים שאלות, מקבלים תשובות',
      'מתחברים עם יוצרים אחרים',
      'משתפים רעיונות ונוצרים קשרים',
    ],
  },
  {
    name: 'בניית תיק עבודות מקצועי',
    description: 'בנו תיק עבודות שיבלוט ויפתח לכם דלתות',
    href: '#',
    id: 'step 3',
    iconName: 'ic:baseline-work', // Represents a portfolio
    InnerSteps: [
      'תיק עבודות מותאם לדרישות המותגים',
      'משקיעים בזמן ובאיכות',
      'מפתחים סגנון אישי ייחודי',
    ],
  },
  {
    name: 'שיתופי פעולה עם מותגים',
    description: 'התחילו להרוויח כסף מהתוכן שלכם',
    href: '#',
    id: 'step 4',
    iconName: 'ic:baseline-handshake', // Represents partnerships
    InnerSteps: ['חיבורים ישירים עם מותגים', 'הצעות עבודה מגוונות', 'הכנסה קבועה ויציבה'],
  },
  {
    name: 'הצלחה והכנסה',
    description: 'הרוויחו 500 ש״ח ומעלה מסרטון אחד',
    href: '#',
    id: 'final step',
    final: true,
    iconName: 'ic:baseline-money', // Represents earnings
    InnerSteps: ['הגיע הזמן שלכם לנצח'],
  },
  {
    name: 'כאן אתם מרוויחים עד 500 ש״ח מסרטון של דקה!',
    description: '',
    href: '#',
    id: 'final step',
    final: true,
    iconName: 'ic:baseline-money', // Represents earnings
    InnerSteps: [
      'תמקסמו את הכסף על כל תוכן שאתם יוצרים. לא עוד עבודות מזדמנות – אצלנו תרוויחו הכנסה יציבה וגדולה מסרטונים קצרים וממוקדים',
    ],
  },
];

const stepsGPT = [
  {
    name: 'נרשמים להכשרה שלנו',
    description: 'הצעד הראשון לקראת קריירה יציבה כיוצר תוכן',
    href: '#',
    id: 'step 1',
    iconName: 'ic:baseline-school', // Represents learning and education
    InnerSteps: [
      'מקבלים גישה מלאה לתכנים הלימודיים',
      'לומדים ממומחים בתחום',
      'מתחילים ליצור את התוכן הראשון שלכם',
    ],
  },
  {
    name: 'קהילה אקסקלוסיבית של יוצרי תוכן',
    description: 'הצטרפו לקהילה תומכת ותתחילו לצמוח',
    href: '#',
    id: 'step 2',
    iconName: 'ic:baseline-people', // Represents a community
    InnerSteps: [
      'שואלים שאלות, מקבלים תשובות',
      'מתחברים עם יוצרים אחרים',
      'משתפים רעיונות ונוצרים קשרים',
    ],
  },
  {
    name: 'בניית תיק עבודות מקצועי',
    description: 'בנו תיק עבודות שיבלוט ויפתח לכם דלתות',
    href: '#',
    id: 'step 3',
    iconName: 'ic:baseline-work', // Represents a portfolio
    InnerSteps: [
      'תיק עבודות מותאם לדרישות המותגים',
      'משקיעים בזמן ובאיכות',
      'מפתחים סגנון אישי ייחודי',
    ],
  },
  {
    name: 'שיתופי פעולה עם מותגים',
    description: 'התחילו להרוויח כסף מהתוכן שלכם',
    href: '#',
    id: 'step 4',
    iconName: 'ic:baseline-handshake', // Represents partnerships
    InnerSteps: ['חיבורים ישירים עם מותגים', 'הצעות עבודה מגוונות', 'הכנסה קבועה ויציבה'],
  },
  // {
  //   name: 'הצלחה והכנסה',
  //   description: 'הרוויחו 500 ש״ח ומעלה מסרטון אחד',
  //   href: '#',
  //   id: 'final step',
  //   final: true,
  //   iconName: 'ic:baseline-money', // Represents earnings
  //   InnerSteps: ['הגיע הזמן שלכם לנצח'],
  // },
  {
    name: 'כאן אתם מרוויחים עד 500 ש״ח מסרטון של דקה!',
    description: '',
    href: '#',
    id: 'final step',
    final: true,
    iconName: 'ic:baseline-money', // Represents earnings
    InnerSteps: [
      'תמקסמו את הכסף על כל תוכן שאתם יוצרים. לא עוד עבודות מזדמנות – אצלנו תרוויחו הכנסה יציבה וגדולה מסרטונים קצרים וממוקדים',
    ],
  },
];

const stepsGPT2 = [
  {
    name: 'נרשמים להכשרה שלנו',
    description: 'לאחר ההרשמה, תקבלו מייל עם גישה לתכני הלמידה המלאים ותוכלו להתחיל ליצור תוכן',
    href: '#',
    id: 'step 1',
    iconName: 'ic:baseline-school',
    InnerSteps: ['צעד ראשון לקראת שיתוף פעולה עם מותגים'],
  },
  {
    name: 'תלמדו ממי שכבר עשו את זה',
    description: 'הכשרה מקצועית מבית המומחים שתגלה את השיטות שהוכחו להצלחה',
    href: '#',
    id: 'step 2',
    iconName: 'fluent:certificate-20-regular',
    InnerSteps: ['לומדים מיוצרי תוכן עם הצלחה יציבה', 'שיטות להעלאת ערך התוכן'],
  },
  {
    name: 'תמיכה רציפה בקבוצת WhatsApp קהילתית ואקסקלוסיבית',
    emoji: '🤫',
    description: 'הצטרפות לקבוצת יוצרי תוכן מובילה לשיתוף ולתמיכה',
    href: '#',
    id: 'step 3',
    iconName: 'mdi:whatsapp',
    InnerSteps: [
      'קבוצה פרטית עם יוצרי תוכן',
      'התייעצות ושיתוף תכנים וטיפים',
      'תמיכה לחיזוק תיק העבודות וההכנסות',
    ],
  },
  {
    name: 'תבנו תיק עבודות מקצועי ותתחילו לבלוט',
    description: 'השקעה בתיק עבודות ייחודי לשיתופי פעולה ארוכי טווח',
    href: '#',
    id: 'step 4',
    iconName: 'dashicons:portfolio',
    InnerSteps: [
      'בניית תיק מרשים וייחודי',
      'מיקוד בתיק מותאם למותגים גדולים',
      'מפתח להזדמנויות עתידיות',
    ],
  },
  {
    name: 'תקבלו הזדמנות ייחודית לשיתופי פעולה וחיבורים עם לקוחות פוטנציאליים',
    description: 'חיבורים ישירים למותגים והזדמנויות להרוויח מהתוכן בקלות',
    href: '#',
    id: 'step 5',
    iconName: 'game-icons:team-idea',
    InnerSteps: [
      'קשרים עם מותגים בתחום',
      'הזדמנויות לפרזנטציה והכנסה קבועה',
      'מעבר להכנסה משמעותית',
    ],
  },
  {
    name: 'תמשיכו לצבור ניסיון ולהגדיל את החשיפה ברשתות החברתיות',
    description: 'שיפור הערך והנראות של התוכן כדי למקסם הכנסות',
    href: '#',
    id: 'step 6',
    iconName: 'mdi:chart-line',
    InnerSteps: ['שיפור הנראות ברשתות', 'כלים מתקדמים להעלאת חשיפה', 'חיזוק התוכן וההכנסות'],
  },
  {
    name: 'כאן אתם מתחילים להרוויח כסף מהתכנים שלכם',
    // emoji: '😊',
    description:
      'תמקסמו את הכסף על כל תוכן שאתם יוצרים. לא עוד עבודות מזדמנות – אצלנו תרוויחו הכנסה יציבה וגדולה מסרטונים קצרים וממוקדים 😊 ',
    href: '#',
    id: 'final step',
    final: true,
    iconName: 'mdi:currency-ils',
    InnerSteps: [],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
function Stepper({ influencer = false, children }) {
  const theme = useTheme();
  const { mainColor, themeColor, textGradient } = useContext(ColorContext);
  const [activeStep, setActive] = useState(0);
  const stepsId = influencer ? stepsGPT2.map((item) => item.id) : steps.map((item) => item.id);
  useScrollTrigger(stepsId, (index) => setActive(index));

  return (
    <nav dir="rtl" className="mx-0" aria-label="Progress">
      <ol className="overflow-hidden">
        {influencer
          ? stepsGPT2.map((step, stepIdx) => (
              <li
                key={step.name}
                id={step.id}
                className={classNames(
                  stepIdx !== stepsGPT2.length ? 'pb-8' : ' invisible',
                  'relative'
                )}
              >
                {stepIdx < activeStep ? (
                  <>
                    {stepIdx !== stepsGPT2.length - 1 ? (
                      <div
                        aria-hidden="true"
                        style={{
                          background: themeColor,
                        }}
                        className={`absolute right-5 top-4 -mr-px mt-0.5 h-full w-0.5  ${stepIdx === stepsGPT2.length - 1 ? 'invisible' : ''}`}
                      />
                    ) : null}
                    <a
                      href=""
                      onClick={() => {
                        setActive(stepIdx);
                      }}
                      className="group relative flex items-start"
                    >
                      <span className="flex h-12 items-center">
                        <span
                          style={{
                            background: themeColor,
                          }}
                          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full group-hover:bg-info-dark"
                        >
                          {/* <CheckIcon aria-hidden="true" className="h-5 w-5 text-white" /> */}
                          <Iconify width={30} color="white" icon={step.iconName} />
                        </span>
                      </span>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{ display: 'flex', mr: 4, flexDirection: 'column', minWidth: 0 }}
                        className="mr-4 flex min-w-0 flex-col"
                      >
                        <span
                          // className="text-2xl font-medium"
                          style={{ marginBottom: '10px' }}
                        >
                          {step.name} {step.emoji}
                        </span>
                        <Typography variant="body1" component="span" sx={{ opacity: 0.8 }}>
                          {step.description}
                        </Typography>
                        {step.InnerSteps.map((item, index) => (
                          <div className="my-2 w-fit" key={index}>
                            <span className="text-base justify-start flex max-md:text-cente text-start ">
                              <Iconify icon="mingcute:check-2-line" color={colors.green[300]} />{' '}
                              <Typography variant="p" color="text.secondary">
                                &nbsp;
                                {item}
                              </Typography>
                            </span>
                            {index === step.InnerSteps.length - 1 &&
                              !step?.final &&
                              arrowsDown(
                                theme.palette[mainColor]?.light,
                                theme.palette[mainColor]?.dark,
                                '28px',
                                'mr-20'
                              )}
                          </div>
                        ))}{' '}
                      </Typography>
                    </a>
                  </>
                ) : stepIdx === activeStep ? (
                  <>
                    {stepIdx !== stepsGPT2.length - 1 ? (
                      <div
                        aria-hidden="true"
                        className={`absolute right-5 top-4 -mr-px mt-0.5 h-full w-0.5 bg-gray-300 ${stepIdx === stepsGPT2.length - 1 ? 'invisible' : ''}`}
                      />
                    ) : null}
                    <a aria-current="step" className="group relative flex items-start">
                      <span aria-hidden="true" className="flex h-10 items-center">
                        <span
                          style={{
                            borderColor: themeColor,
                          }}
                          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white"
                        >
                          {stepIdx !== stepsGPT2.length - 1 ? (
                            <Iconify color={themeColor} icon={step.iconName} />
                          ) : (
                            <span
                              style={{
                                background: themeColor,
                              }}
                              className={`h-2.5 w-2.5 rounded-full `}
                            />
                          )}
                        </span>
                      </span>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          display: 'flex',
                          mr: 4,
                          flexDirection: 'column',
                          minWidth: 0,
                        }}
                        className="mr-4 flex min-w-0 flex-col"
                      >
                        <div className="">
                          <span
                            style={{
                              // color: themeColor,
                              marginBottom: '10px',
                              ...textGradient,
                            }}
                            // className="text-2xl font-medium"
                          >
                            {step.name}
                          </span>
                        </div>
                        <Typography variant="body1" component="span" sx={{ opacity: 0.8 }}>
                          {step.description}
                        </Typography>
                        {step.InnerSteps.map((item, index) => (
                          <div className="my-2 w-fit" key={index}>
                            <span className="text-base justify-start flex max-md:text-cente text-start ">
                              <Iconify icon="mingcute:check-2-line" color={colors.green[300]} />{' '}
                              <Typography variant="p" color="text.secondary">
                                &nbsp;
                                {item}
                              </Typography>
                            </span>
                            {index === step.InnerSteps.length - 1 &&
                              !step?.final &&
                              arrowsDown(
                                theme.palette[mainColor]?.light,
                                undefined,
                                '28px',
                                'mr-20'
                              )}
                          </div>
                        ))}
                      </Typography>
                    </a>
                  </>
                ) : (
                  <>
                    {stepIdx !== stepsGPT2.length - 1 ? (
                      <div
                        aria-hidden="true"
                        className={`absolute right-5 top-4 -mr-px mt-0.5 h-full w-0.5 bg-gray-300 ${stepIdx === stepsGPT2.length - 1 ? 'invisible' : ''}`}
                      />
                    ) : null}
                    <a // not Active steps
                      href=""
                      onClick={() => {
                        setActive(stepIdx);
                      }}
                      className="group relative flex items-start"
                    >
                      <span aria-hidden="true" className="flex h-10 items-center">
                        <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                          <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                        </span>
                      </span>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{ display: 'flex', mr: 4, flexDirection: 'column', minWidth: 0 }}
                        className="mr-4 flex min-w-0 flex-col"
                      >
                        <span
                        // className="text-2xl font-medium "
                        >
                          {step.name} {step.emoji}
                        </span>
                        <Typography variant="body1" component="span" sx={{ opacity: 0.8 }}>
                          {step.description}
                        </Typography>
                        {step.InnerSteps.map((item, index) => (
                          <div className="my-2 w-fit" key={index}>
                            <span className="text-base justify-start flex max-md:text-cente text-start ">
                              <Iconify icon="mingcute:check-2-line" color={colors.green[300]} />{' '}
                              <Typography variant="p" color="text.secondary">
                                &nbsp;
                                {item}
                              </Typography>
                            </span>
                            {index === step.InnerSteps.length - 1 &&
                              !step.final &&
                              arrowsDown(
                                theme.palette[mainColor]?.light,
                                undefined,
                                '28px',
                                'mr-20'
                              )}
                          </div>
                        ))}{' '}
                      </Typography>
                    </a>
                  </>
                )}
                {/* <InnerStep steps={step.InnerSteps} itemNum={stepIdx} /> */}
              </li>
            ))
          : steps.map((step, stepIdx) => (
              <li
                key={step.name}
                id={step.id}
                className={classNames(stepIdx !== steps.length ? 'pb-8' : ' invisible', 'relative')}
              >
                {stepIdx < activeStep ? (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        aria-hidden="true"
                        style={{
                          background: themeColor,
                        }}
                        className={`absolute right-5 top-4 -mr-px mt-0.5 h-full w-0.5  ${stepIdx === steps.length - 1 ? 'invisible' : ''}`}
                      />
                    ) : null}
                    <a
                      href=""
                      onClick={() => {
                        setActive(stepIdx);
                      }}
                      className="group relative flex items-start"
                    >
                      <span className="flex h-12 items-center">
                        <span
                          style={{
                            background: themeColor,
                          }}
                          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full group-hover:bg-info-dark"
                        >
                          {/* <CheckIcon aria-hidden="true" className="h-5 w-5 text-white" /> */}
                          <Iconify width={30} color="white" icon={step.iconName} />
                        </span>
                      </span>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{ display: 'flex', mr: 4, flexDirection: 'column', minWidth: 0 }}
                        className="mr-4 flex min-w-0 flex-col"
                      >
                        <span
                          // className="text-2xl font-medium"
                          style={{ marginBottom: '10px' }}
                        >
                          {step.name} {step.emoji}
                        </span>
                        {step.InnerSteps.map((item, index) => (
                          <div className="my-2 w-fit" key={index}>
                            <span className="text-base justify-start flex max-md:text-cente text-start ">
                              <Typography variant="p" color="text.secondary">
                                {item}
                              </Typography>
                            </span>
                            {index !== step.InnerSteps.length - 1 &&
                              arrowsDown(
                                theme.palette[mainColor]?.light,
                                theme.palette[mainColor]?.dark,
                                '28px',
                                'mr-10'
                              )}
                          </div>
                        ))}{' '}
                      </Typography>
                    </a>
                  </>
                ) : stepIdx === activeStep ? (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        aria-hidden="true"
                        className={`absolute right-5 top-4 -mr-px mt-0.5 h-full w-0.5 bg-gray-300 ${stepIdx === steps.length - 1 ? 'invisible' : ''}`}
                      />
                    ) : null}
                    <a aria-current="step" className="group relative flex items-start">
                      <span aria-hidden="true" className="flex h-10 items-center">
                        <span
                          style={{
                            borderColor: themeColor,
                          }}
                          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white"
                        >
                          {stepIdx === steps.length - 1 ? (
                            <Iconify color={themeColor} icon={step.iconName} />
                          ) : (
                            <span
                              style={{
                                background: themeColor,
                              }}
                              className={`h-2.5 w-2.5 rounded-full `}
                            />
                          )}
                        </span>
                      </span>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          display: 'flex',
                          mr: 4,
                          flexDirection: 'column',
                          minWidth: 0,
                        }}
                        className="mr-4 flex min-w-0 flex-col"
                      >
                        <span
                          style={{
                            // color: themeColor,
                            marginBottom: '10px',
                            ...textGradient,
                          }}
                          // className="text-2xl font-medium"
                        >
                          {step.name}
                        </span>
                        {step.emoji}
                        {step.InnerSteps.map((item, index) => (
                          <div className="my-2 w-fit" key={index}>
                            <span className="text-base justify-start flex max-md:text-cente text-start ">
                              <Typography variant="p" color="text.secondary">
                                {item}
                              </Typography>
                            </span>
                            {index !== step.InnerSteps.length - 1 &&
                              arrowsDown(
                                theme.palette[mainColor]?.light,
                                undefined,
                                '28px',
                                'mr-10'
                              )}
                          </div>
                        ))}
                      </Typography>
                    </a>
                  </>
                ) : (
                  <>
                    {stepIdx !== steps.length ? (
                      <div
                        aria-hidden="true"
                        className={`absolute right-5 top-4 -mr-px mt-0.5 h-full w-0.5 bg-gray-300 ${stepIdx === steps.length - 1 ? 'invisible' : ''}`}
                      />
                    ) : null}
                    <a // not Active steps
                      href=""
                      onClick={() => {
                        setActive(stepIdx);
                      }}
                      className="group relative flex items-start"
                    >
                      <span aria-hidden="true" className="flex h-10 items-center">
                        <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                          <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                        </span>
                      </span>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{ display: 'flex', mr: 4, flexDirection: 'column', minWidth: 0 }}
                        className="mr-4 flex min-w-0 flex-col"
                      >
                        <span
                        // className="text-2xl font-medium "
                        >
                          {step.name} {step.emoji}
                        </span>
                        {step.InnerSteps.map((item, index) => (
                          <div className="my-2 w-fit" key={index}>
                            <span className="text-base justify-start flex max-md:text-cente text-start ">
                              <Typography variant="p" color="text.secondary">
                                {item}
                              </Typography>
                            </span>
                            {index !== step.InnerSteps.length - 1 &&
                              arrowsDown(
                                theme.palette[mainColor]?.light,
                                undefined,
                                '28px',
                                'mr-10'
                              )}
                          </div>
                        ))}{' '}
                      </Typography>
                    </a>
                  </>
                )}
                {/* <InnerStep steps={step.InnerSteps} itemNum={stepIdx} /> */}
              </li>
            ))}
      </ol>
    </nav>
  );
}

function useScrollTrigger(elementIds, callback) {
  useEffect(() => {
    const handleScroll = () => {
      elementIds.forEach((id, index) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isActive = rect.top <= window.innerHeight - 150 && rect.bottom >= 0;

          if (isActive) {
            callback(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementIds, callback]);
}

export default function StepperSection({ influencer = false, ...props }) {
  return (
    <Box sx={{ mb: { md: 8, xs: 6 }, mx: { md: 8, xs: 2 } }}>
      {/* <Divider
        sx={{
          mt: 6,
          mb: 4,
          background: `linear-gradient(to right, ${theme.palette.secondary?.main},${theme.palette.warning?.main},${theme.palette.primary?.main})`,
          width: '100%',
          height: 1.5,
          borderRadius: 50,
          border: 'none',
          backgroundSize: '200% 100%', // This makes the gradient larger than the container
          animation: 'slide 20s linear infinite', // Define the animation timing and type
          '@keyframes slide': {
            '0%': {
              backgroundPosition: '0% 50%', // Start at the beginning of the gradient
            },
            '50%': {
              backgroundPosition: '100% 50%', // End at the end of the gradient
            },
            '100%': {
              backgroundPosition: '0% 100%', // End at the end of the gradient
            },
          },
        }}
      /> */}
      <Container sx={{ textAlign: { xs: 'center', sm: 'justify' } }} component={MotionContainer}>
        <m.div animate={varBounce().in}>
          <Typography mb={2} variant="h3">
            {influencer ? "איך תכל'ס מכניסים כסף מסרטונים" : 'איך הופכים תוכן מקורי למקור הכנסה ?'}
          </Typography>
        </m.div>
        <m.div animate={varBounce({ delay: 0.1 }).in}>
          <Typography color="text.secondary" component="div" mb={4} variant="p">
            {influencer
              ? 'הגיע הזמן לקחת את כישרון היצירה שלך לשלב הבא. בהכשרה של Influencers-Pro, תלמד את כל התהליך המלא מא’ עד ת’, כדי להפוך את התוכן שלך להכנסה יציבה, קבועה ומתגמלת.'
              : 'התקדמנו הרבה מעבר לחוברון והיום אתם עדים בפעם הראשונה להכשרה המלאה של video-pro שמלמדת אתכם את התהליך המלא של איך יוצרים תוכן איכותי והופכים אותו להכנסה. אז איך זה עובד?'}
          </Typography>
        </m.div>
        <m.div animate={varSlide().inDown}>
          <Stepper influencer={influencer} />
        </m.div>
      </Container>
      {/* <AnimateText
        variant="h3"
        sx={{ mb: 4 }}
        variants={varBounce({ durationIn: 0.05 }).inX}
        text=
      /> */}
      {/* <Stepper /> */}
    </Box>
  );
}
