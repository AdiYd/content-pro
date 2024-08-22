// eslint-disable-next-line import/no-extraneous-dependencies
import { CheckIcon } from 'lucide-react';
import { useState, useEffect, useContext } from 'react';

import { Box, useTheme, Typography } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { varBounce, AnimateText } from '../animate';

const arrowsDown = (mainColor = 'currentColor', accentColor = 'currentColor') => (
  <div className="flex justify-around">
    <svg width="28px" height="28px" viewBox="0 -960 960 960" fill="url(#gradientAnimation)">
      <defs>
        <linearGradient id="gradientAnimation" x1="0%" y1="0%" x2="0%" y2="100%">
          <animateTransform
            attributeName="transform"
            type="translateY"
            from="0%"
            to="100%"
            dur="1s"
            repeatCount="indefinite"
          />
          <stop offset="0%" stopColor={accentColor} />
          <stop offset="100%" stopColor={mainColor} />
        </linearGradient>
      </defs>
      <path d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z" />
    </svg>
  </div>
);

const arrowsDown2 = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="currentColor"
  >
    <path d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z" />
  </svg>
);

const steps = [
  {
    name: 'מתחילים מ - 0',
    description: 'לומדים את הטכניקות, הכלים והטיפים הכי חמים',
    href: '#',
    id: 'step 1',
    InnerSteps: ['לומדים ממי שכבר עשו את זה', 'חוקרים, שואלים ומפנימים', 'מתרגלים ומתנסים'],
  },
  {
    name: 'מצטרפים לקהילה',
    description: 'מתחברים לקהילה, משתפים עבודות ומקבלים טיפים של אלופים',
    href: '#',
    id: 'step 2',
    InnerSteps: [
      'קהילה אקסלוסיבית 🤫',
      'המקום לשאלות, עדכונים ועזרה',
      'תכני העשרה, מדריכים וטיפים שיקצרו לכם את הדרך 🚀',
    ],
  },
  {
    name: 'בונים תיק עבודות',
    description: 'מתחילים להתנסות, יוצרים סירטונים ותכנים ומשתפרים',
    href: '#',
    id: 'step 3',
    InnerSteps: ['משקיעים בתיק מרשים', 'משתפים רעיונות ומתחילים ליצור תוכן מקורי', 'צוברים ניסיון'],
  },

  {
    name: 'הכנסה ראשונה מיצירת תוכן',
    description: 'לקהילה שלנו יש ביקוש, מי שיקח את הכלים שלנו ברצינות יקבל הצעות עבודה',
    href: '#',
    id: 'step 4',
    InnerSteps: [
      'הקהילה שלנו מבוקשת',
      'יוצרים חיבורים עם לקוחות פוטנציאלים 🤝',
      'איך מרוויחים 500 ש"ח מסירטון קצר? בואו לגלות 😉',
    ],
  },
  {
    name: '',
    description: '',
    href: '#',
    id: 'final step',
    InnerSteps: ['איך מרוויחים 500 ש"ח מסירטון קצר? בואו לגלות'],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
function Stepper({ children }) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  const themeColor = theme.palette[mainColor]?.main || theme.palette.info.main;
  console.log('This is main Color: ', mainColor);
  const [activeStep, setActive] = useState(0);
  const stepsId = steps.map((item) => item.id);
  useScrollTrigger(stepsId, (index) => setActive(index));

  return (
    <nav dir="rtl" className="mx-4" aria-label="Progress">
      <ol className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            id={step.id}
            className={classNames(stepIdx !== steps.length - 1 ? 'pb-8' : ' invisible', 'relative')}
          >
            {stepIdx < activeStep ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    aria-hidden="true"
                    style={{
                      background: themeColor,
                    }}
                    className={`absolute right-4 top-4 -mr-px mt-0.5 h-full w-0.5  ${stepIdx === steps.length - 2 ? 'invisible' : ''}`}
                  />
                ) : null}
                <a
                  href=""
                  onClick={() => {
                    setActive(stepIdx);
                  }}
                  className="group relative flex items-start"
                >
                  <span className="flex h-9 items-center">
                    <span
                      style={{
                        background: themeColor,
                      }}
                      className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-info-dark"
                    >
                      <CheckIcon aria-hidden="true" className="h-5 w-5 text-white" />
                    </span>
                  </span>
                  <Typography
                    variant="h3"
                    sx={{ display: 'flex', mr: 4, flexDirection: 'column', minWidth: 0 }}
                    className="mr-4 flex min-w-0 flex-col"
                  >
                    <span className="text-2xl font-medium">{step.name}</span>
                    {step.InnerSteps.map((item, index) => (
                      <div className="my-2" key={index}>
                        <span className="text-base justify-start opacity-80 flex max-sm:justify-center max-sm:text-center text-start ">
                          {item}
                        </span>
                        {index !== step.InnerSteps.length - 1 &&
                          arrowsDown(
                            theme.palette[mainColor]?.light,
                            theme.palette[mainColor]?.dark
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
                    className={`absolute right-4 top-4 -mr-px mt-0.5 h-full w-0.5 bg-gray-300 ${stepIdx === steps.length - 2 ? 'invisible' : ''}`}
                  />
                ) : null}
                <a aria-current="step" className="group relative flex items-start">
                  <span aria-hidden="true" className="flex h-9 items-center">
                    <span
                      style={{
                        borderColor: themeColor,
                      }}
                      className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white"
                    >
                      <span
                        style={{
                          background: themeColor,
                        }}
                        className={`h-2.5 w-2.5 rounded-full `}
                      />
                    </span>
                  </span>
                  <Typography
                    variant="h3"
                    sx={{ display: 'flex', mr: 4, flexDirection: 'column', minWidth: 0 }}
                    className="mr-4 flex min-w-0 flex-col"
                  >
                    <span
                      style={{
                        color: themeColor,
                        marginBottom: '10px',
                      }}
                      // className="text-2xl font-medium"
                    >
                      {step.name}
                    </span>
                    {step.InnerSteps.map((item, index) => (
                      <div className="my-2" key={index}>
                        <span className="text-base justify-start opacity-80 flex max-sm:justify-center max-sm:text-center text-start ">
                          {item}
                        </span>
                        {index !== step.InnerSteps.length - 1 &&
                          arrowsDown(theme.palette[mainColor]?.light)}
                      </div>
                    ))}
                  </Typography>
                </a>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className={`absolute right-4 top-4 -mr-px mt-0.5 h-full w-0.5 bg-gray-300 ${stepIdx === steps.length - 2 ? 'invisible' : ''}`}
                  />
                ) : null}
                <a // not Active steps
                  href=""
                  onClick={() => {
                    setActive(stepIdx);
                  }}
                  className="group relative flex items-start"
                >
                  <span aria-hidden="true" className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <Typography
                    variant="h3"
                    sx={{ display: 'flex', mr: 4, flexDirection: 'column', minWidth: 0 }}
                    className="mr-4 flex min-w-0 flex-col"
                  >
                    <span className="text-2xl font-medium ">{step.name}</span>
                    {step.InnerSteps.map((item, index) => (
                      <div className="my-2" key={index}>
                        <span className="text-base justify-start opacity-80 flex max-sm:justify-center max-sm:text-center text-start ">
                          {item}
                        </span>
                        {index !== step.InnerSteps.length - 1 &&
                          arrowsDown(theme.palette[mainColor]?.light)}
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
          const isActive = rect.top <= window.innerHeight && rect.bottom >= 0;

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

export default function StepperSection({ ...props }) {
  return (
    <Box sx={{ my: 8, mx: { md: 8, xs: 2 } }}>
      <AnimateText
        variant="h3"
        sx={{ mb: 4 }}
        variants={varBounce({ durationIn: 0.05 }).inX}
        text="איך הופכים תוכן מקורי למקור הכנסה?"
      />
      <Stepper />
    </Box>
  );
}
