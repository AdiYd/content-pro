import { m } from 'framer-motion';
import { useRef, useState, useContext } from 'react';

import { Button, useTheme, Container, Typography } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import Confettis from './Confettis';
import { arrowsDown } from '../stepper/Stepper';
import { varBounce, MotionContainer } from '../animate';

function Considering({
  color,
  buttonBefore = ' אהבתם?! תנו לייק 👍',
  buttonAfter = '👏 אתם בדרך הנכונה - להפוך ליוצרי תוכן מבוקשים 👏',
  ...props
}) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  const [confetti, setConfetti] = useState(false);
  const [active, setActive] = useState(false);
  const buttonMsg = useRef(buttonBefore);
  color = color || mainColor || 'info';

  const startConfetti = () => {
    buttonMsg.current = buttonAfter;
    setConfetti((p) => !p);
    setActive(true);

    if (!confetti) {
      setTimeout(() => {
        setConfetti(false);
      }, 6 * 1e3);
    }
  };
  return (
    <>
      <div className="my-8 flex justify-center w-full">
        {confetti && (
          <div className="fixed top-0 w-full">
            <Confettis />
          </div>
        )}
        <Container component={MotionContainer}>
          <m.div variants={varBounce().in}>
            <div className="flex justify-center">
              <Button
                sx={{
                  // alignSelf: 'center',
                  // mx: 8,
                  transition: 'all 0.3s ease-in',
                  maxWidth: '80vw',
                  '&:hover': {
                    transform: active ? '' : 'scale(1.1)',
                  },
                }}
                onClick={startConfetti}
                variant={active ? 'text' : 'outlined'}
                color={color}
              >
                {buttonMsg.current}
              </Button>
            </div>
          </m.div>
        </Container>
      </div>
      {active && (
        <div className="w-full mx-auto">
          <Typography width={1} textAlign="center" variant="h4">
            {' '}
            ממשיכים לגלות
          </Typography>
          {arrowsDown(
            theme.palette[mainColor]?.main,
            theme.palette[mainColor]?.light,
            '35px',
            'justify-center mr-0'
          )}
          {arrowsDown(
            theme.palette[mainColor]?.dark,
            theme.palette[mainColor]?.main,
            '35px',
            'justify-center mr-0'
          )}
        </div>
      )}
    </>
  );
}

export default Considering;
