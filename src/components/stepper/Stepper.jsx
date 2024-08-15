// eslint-disable-next-line import/no-extraneous-dependencies
import { CheckIcon } from 'lucide-react';
import { useState, useEffect, useContext } from 'react';

import { Box, useTheme, Typography } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import InnerStep from './innerSteps';
import { varBounce, AnimateText } from '../animate';

const steps = [
  {
    name: 'מתחילים מ - 0',
    description: 'לומדים ומתרגלים את הטכניקות, הכלים והטיפים הכי חמים',
    href: '#',
    id: 'step 1',
  },
  {
    name: 'תיק עבודות',
    description: 'מתחילים להתנסות, יוצרים סירטונים ותכנים ומשתפרים',
    href: '#',
    id: 'step 2',
  },
  {
    name: 'מצטרפים לקהילה',
    description: 'מתחברים לקהילה, משתפים עבודות ומקבלים טיפים של אלופים',
    href: '#',
    id: 'step 3',
  },
  {
    name: 'הכנסה ראשונה מיצירת תוכן',
    description: 'לקהילה שלנו יש ביקוש, מי שיקח את הכלים שלנו ברצינות יקבל הצעות עבודה',
    href: '#',
    id: 'step 4',
  },
  {
    name: '',
    description: '',
    href: '#',
    id: 'final step',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
function Stepper({ children }) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
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
            className={classNames(
              stepIdx !== steps.length - 1 ? 'pb-10' : ' invisible',
              'relative'
            )}
          >
            {stepIdx < activeStep ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    aria-hidden="true"
                    style={{
                      background: mainColor
                        ? theme.palette[mainColor].main
                        : theme.palette.info.main,
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
                        background: mainColor
                          ? theme.palette[mainColor].main
                          : theme.palette.info.main,
                      }}
                      className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-info-dark"
                    >
                      <CheckIcon aria-hidden="true" className="h-5 w-5 text-white" />
                    </span>
                  </span>
                  <Typography
                    variant="h2"
                    sx={{ display: 'flex', mr: 4, flexDirection: 'column', minWidth: 0 }}
                    className="mr-4 flex min-w-0 flex-col"
                  >
                    <span className="text-2xl font-medium">{step.name}</span>
                    <span className="text-base text-gray-500">{step.description}</span>
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
                        borderColor: mainColor
                          ? theme.palette[mainColor].main
                          : theme.palette.info.main,
                      }}
                      className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white"
                    >
                      <span
                        style={{
                          background: mainColor
                            ? theme.palette[mainColor].main
                            : theme.palette.info.main,
                        }}
                        className={`h-2.5 w-2.5 rounded-full `}
                      />
                    </span>
                  </span>
                  <Typography
                    variant="h2"
                    sx={{ display: 'flex', mr: 4, flexDirection: 'column', minWidth: 0 }}
                    className="mr-4 flex min-w-0 flex-col"
                  >
                    <span
                      style={{
                        color: mainColor ? theme.palette[mainColor].main : theme.palette.info.main,
                      }}
                      className="text-2xl font-medium"
                    >
                      {step.name}
                    </span>
                    <span className="text-base text-gray-500">{step.description}</span>
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
                    variant="h2"
                    sx={{ display: 'flex', mr: 4, flexDirection: 'column', minWidth: 0 }}
                    className="mr-4 flex min-w-0 flex-col"
                  >
                    <span className="text-2xl font-medium text-gray-500">{step.name}</span>
                    <span className="text-base text-gray-500">{step.description}</span>
                  </Typography>
                </a>
              </>
            )}
            {children}
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
        variant="h2"
        sx={{ mb: 4 }}
        variants={varBounce({ durationIn: 0.1 }).inX}
        text="הקורס והקהילה שלנו ילוו אתכם מההתחלה עד לעצמאות"
      />
      <Stepper>
        <InnerStep />
      </Stepper>
    </Box>
  );
}
