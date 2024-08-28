// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import { m } from 'framer-motion';
import { useRef, useState, useContext } from 'react';

import {
  Box,
  Stack,
  Button,
  Dialog,
  useTheme,
  Container,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { useCountdownSeconds } from 'src/hooks/use-countdown';

import { trackEvent, trackButtonClick } from 'src/utils/GAEvents';

import { ColorContext } from 'src/context/colorMain';

import Confettis from './Confettis';
import { toast } from '../snackbar';
import { Iconify } from '../iconify';
import { arrowsDown } from '../stepper/Stepper';
import { varBounce, MotionContainer } from '../animate';
import { ComponentContainer } from '../new/component-block';

const getRemainingCookieTimeInSeconds = (cookieName) => {
  const cookieValue = Cookies.get(cookieName);
  if (!cookieValue) {
    // Return null if the cookie doesn't exist
    return null;
  }

  try {
    const parsedValue = JSON.parse(cookieValue);
    const expirationDate = new Date(parsedValue.expires);

    if (!expirationDate || Number.isNaN(expirationDate.getTime())) {
      return null; // Invalid expiration date
    }

    const now = new Date();
    const remainingTimeInMs = expirationDate - now;
    if (remainingTimeInMs <= 0) {
      return 0; // Cookie has already expired
    }

    return Math.floor(remainingTimeInMs / 1000); // Remaining time in seconds
  } catch (error) {
    return null; // Error parsing the cookie value
  }
};

const setCookie = (name = 'counting', numOfSec = NumOfMinutes * 60) => {
  const expirationDate = new Date(new Date().getTime() + numOfSec * 1000);
  const value = JSON.stringify({ expires: expirationDate });
  Cookies.set(name, value, { expires: expirationDate });
};

export const NumOfMinutes = 15;
export const NumOfDiscount = 10;

export const ScrollComponent = (id = 'signUp') => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

function Considering({
  color,
  countDownObj = {},
  buttonBefore = ' אהבתם?! תנו לייק 👍',
  buttonAfter = 'אתם בדרך הנכונה  להפוך ליוצרי תוכן מבוקשים 👏😎',
  afterText = 'ממשיכים לגלות',
  confettiOnly = false,
  ...props
}) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  const [confetti, setConfetti] = useState(false);
  const { countdown, startCountdown, counting } = useCountdownSeconds(NumOfMinutes * 60);
  const [active, setActive] = useState(false);
  const buttonMsg = useRef(buttonBefore);
  color = color || mainColor || 'info';

  // useEffect(() => {
  //   const isCounting = getRemainingCookieTimeInSeconds('counting');
  //   const payed = localStorage.getItem('payed');
  //   if (isCounting && !confettiOnly && !payed && !counting) {
  //     buttonMsg.current = buttonAfter;
  //     startCountdown();
  //   }
  // }, [confettiOnly, buttonAfter]);

  // useEffect(() => {
  //   Cookies.remove('counting');
  // }, []);

  const startConfetti = () => {
    buttonMsg.current = buttonAfter;
    setConfetti((p) => !p);
    trackButtonClick(confettiOnly ? 'confetti' : '10% OFF');
    const isCounting = Cookies.get('counting');
    const payed = localStorage.getItem('payed');
    if (!isCounting && !payed && !confettiOnly) {
      setActive(true);
    }
    if (!confetti) {
      setTimeout(() => {
        setConfetti(false);
      }, 6 * 1e3);
    }
  };

  const countdownSection = counting && (
    <ComponentContainer
      title="לחצו למעבר להרשמה"
      onClick={() => ScrollComponent('signUp')}
      sx={{
        border: '0.1px solid',
        cursor: 'pointer',
        borderRadius: 1,
        borderColor: theme.palette[mainColor]?.main,
        width: 'fit-content',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
        my: 3,
        px: 2,
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <Typography height={8} variant="h5">
        זמן שנותר לקופון
      </Typography>
      <Box
        gap={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ typography: 'body1', textAlign: 'center' }}
      >
        <div>
          <Box sx={{ typography: 'h5' }}>{countdown % 60}</Box>
          <Box sx={{ color: 'text.secondary' }}>שניות</Box>
        </div>
        :
        <div>
          <Box sx={{ typography: 'h5' }}>{Math.floor(countdown / 60)}</Box>
          <Box sx={{ color: 'text.secondary' }}>דקות</Box>
        </div>
      </Box>
    </ComponentContainer>
  );

  return (
    <>
      {confetti && (
        <div className="fixed top-0 w-full">
          <Confettis />
        </div>
      )}
      {(buttonAfter !== buttonMsg.current || confettiOnly) && (
        <div className="my-8 flex justify-center w-full">
          <Container component={MotionContainer}>
            <m.div variants={varBounce({ durationIn: 1 }).in}>
              <div className="flex justify-center ">
                <Button
                  sx={{
                    // alignSelf: 'center',
                    // mx: 8,
                    px: 4,
                    borderRadius: 25,
                    transition: 'all 0.3s ease-in',
                    maxWidth: '80vw',
                    '&:hover': {
                      transform: active ? '' : 'scale(1.1)',
                    },
                  }}
                  onClick={startConfetti}
                  variant={active || confettiOnly ? 'text' : 'outlined'}
                  color={color}
                >
                  {buttonMsg.current}
                </Button>
              </div>
            </m.div>
          </Container>
        </div>
      )}
      <Dialog
        sx={{
          // minWidth: '50%',
          // width: 'fit-content',
          // p: 15,
          // position: 'relative',
          direction: 'rtl',
          textAlign: 'center',
        }}
        open={!counting && active}
        onClose={() => setActive(false)}
      >
        <DialogTitle>
          הסקרנות שלכם משתלמת!
          <IconButton
            aria-label="close"
            onClick={() => {
              startCountdown();
              setCookie();
              setActive(false);
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              // color: (theme) => theme.palette.grey[500],
            }}
          >
            <Iconify icon="carbon:close-filled" />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ color: 'text.secondary' }}>
          <Typography variant="h4">{buttonMsg.current}</Typography>
          <br />
          <Typography color="text.primary" variant="p">
            קבלו קוד הנחה של {NumOfDiscount}% בתוקף ל {NumOfMinutes} דקות הקרובות
          </Typography>
          <br />
          <br />
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Box
              title="העתק ללוח"
              onClick={() => {
                toast.success('הועתק!');
                navigator.clipboard.writeText(`ExtraPro_${NumOfDiscount}`);
              }}
              sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
              mx={2}
            >
              <Iconify
                onClick={() => trackEvent('Coupon clipboard', 'Coupons', `${NumOfDiscount}%`)}
                icon="ion:copy-outline"
              />
            </Box>
            <Typography
              variant="h4"
              sx={{
                background: `linear-gradient(to right, ${theme.palette[mainColor]?.light}, ${theme.palette[mainColor]?.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ExtraPro_{NumOfDiscount}
            </Typography>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
          <Button
            color={mainColor}
            size="small"
            variant="contained"
            onClick={() => {
              startCountdown();
              setCookie();
              setActive(false);
            }}
            autoFocus
          >
            תודה
          </Button>

          {/* <Button
            color={mainColor}
            size="small"
            variant="outlined"
            onClick={() => setActive(false)}
          >
            לא תודה
          </Button> */}
        </DialogActions>
      </Dialog>
      {buttonAfter === buttonMsg.current && (
        <div className="w-full mx-auto">
          {countdownSection}
          <div className="flex justify-center">
            <Iconify icon="fluent-emoji:party-popper" />
          </div>
          <Typography width={1} textAlign="center" variant="h4">
            {' '}
            {afterText}
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
