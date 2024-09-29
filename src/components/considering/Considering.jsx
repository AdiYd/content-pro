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
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { useCountdownSeconds } from 'src/hooks/use-countdown';

import { trackEvent } from 'src/utils/GAEvents';

import { customShadows } from 'src/theme/core';
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
  buttonBefore = ' אהבתם?! תנו לייק 👍',
  buttonAfter = 'אתם בדרך הנכונה  להפוך ליוצרי תוכן מבוקשים 👏😎',
  afterText = 'ממשיכים לגלות',
  confettiOnly = false,
  ...props
}) {
  const theme = useTheme();
  const { mainColor, mode, textGradient, textGradientAnimation } = useContext(ColorContext);
  const [confetti, setConfetti] = useState(false);
  const [email, setEmail] = useState('');
  const { countdown, startCountdown, counting } = useCountdownSeconds(NumOfMinutes * 60);
  const [active, setActive] = useState(false);
  const errorMsg = useRef();
  const buttonMsg = useRef(buttonBefore);
  color = color === 'mainColor' ? mainColor : color;

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
    trackEvent('like', confettiOnly ? 'confetti' : '10% OFF');
    const isCounting = Cookies.get('counting');
    const payed = localStorage.getItem('payed');
    if (props.booklet) {
      setActive(true);
    } else if (!isCounting && !payed && !confettiOnly) {
      setActive(true);
    }
    if (!confetti) {
      setTimeout(() => {
        setConfetti(false);
      }, 6 * 1e3);
    }
  };

  const handleChange = (e) => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
    if (!emailValid) {
      errorMsg.current = (
        <Typography textAlign="end" variant="body1" color="error">
          אימייל לא תקין
        </Typography>
      );
    } else if (emailValid) {
      errorMsg.current = undefined;
    }
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
    const formData = new FormData(e);
    if (!email) {
      return;
    }
    console.log('Form Data:', formData);
  };

  const dialog = props.booklet ? (
    <Dialog
      sx={{
        // minWidth: '50%',
        // width: 'fit-content',
        // p: 15,
        // position: 'relative',
        pt: 4,
        direction: 'rtl',
        textAlign: 'center',
      }}
      open={!counting && active}
      onClose={() => setActive(false)}
    >
      <DialogTitle>
        חוברת הדרכה במתנה
        <IconButton
          aria-label="close"
          onClick={() => {
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
        <Typography variant="p">
          החוברת שתעזור לכם להתחיל ליצור תוכן של מקצוענים, להרוויח כסף ולבנות את עצמכם בצורה נכונה
        </Typography>
        <br />
        <Typography color="text.primary" variant="p">
          השאירו פרטים וקבלו קישור לחוברת חינם
        </Typography>

        <TextField
          label="אימייל"
          name="email"
          variant="filled"
          fullWidth
          required
          inputProps={{ dir: 'ltr', sx: { boxShadow: customShadows(mode).z16 } }}
          value={email}
          onChange={handleChange}
          margin="normal"
          // error={Boolean(errors.email)}
          // helperText={errors.email}
        />
        {errorMsg.current && errorMsg.current}
      </DialogContent>

      <DialogActions sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
        <Button
          // color={mainColor}
          size="small"
          variant="contained"
          onClick={() => {
            handleSubmit();
            setActive(false);
          }}
          autoFocus
        >
          הורדה
        </Button>
      </DialogActions>
    </Dialog>
  ) : (
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
        <Typography color="text.primary" variant="body1">
          קבלו קוד הנחה של {NumOfDiscount}% בתוקף ל {NumOfMinutes} דקות הקרובות
        </Typography>
        <br />
        <Typography color="text.primary" variant="body1">
          לרכישת חבילת הפרמיום Master-Pro
        </Typography>
        <br />
        <br />
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Box
            title="העתק ללוח"
            onClick={() => {
              toast.success('הועתק!');
              navigator.clipboard.writeText(`MasterPro_${NumOfDiscount}`);
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
              ...textGradientAnimation,
            }}
          >
            MasterPro_{NumOfDiscount}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
        <Button
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
  );

  const countdownSection = counting && (
    <ComponentContainer
      title="לחצו למעבר להרשמה"
      onClick={() => ScrollComponent('signUp')}
      sx={{
        border: '0.1px solid',
        cursor: 'pointer',
        borderRadius: 1,
        borderColor: theme.palette.divider,
        boxShadow: theme.shadows[13],
        width: 'fit-content',
        height: 'fit-content',
        gap: 2,
        textAlign: 'center',
        transition: 'transform 0.3s ease',
        my: 3,
        px: 2,
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <div>
        <Typography variant="h5">זמן שנותר לקופון</Typography>
        <Typography sx={textGradientAnimation} variant="h5">
          MasterPro_{NumOfDiscount}
        </Typography>
      </div>
      <Box
        gap={2}
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
        <div className="flex justify-center w-full">
          <Container sx={{ mb: { md: 8, xs: 6 } }} component={MotionContainer}>
            <m.div variants={varBounce({ durationIn: 1 }).in}>
              <div className="flex justify-center ">
                <Button
                  sx={{
                    // alignSelf: 'center',
                    // mx: 8,
                    px: 4,
                    // borderRadius: 25,
                    transition: 'all 0.3s ease-in',
                    fontSize: { md: '24px', xs: '18px' },
                    maxWidth: '80vw',
                    '&:hover': {
                      transform: active ? '' : 'scale(1.1)',
                    },
                  }}
                  onClick={startConfetti}
                  variant={
                    active || buttonAfter === buttonMsg.current
                      ? 'text'
                      : confettiOnly
                        ? 'outlined'
                        : 'contained'
                  }
                  color={color}
                >
                  {buttonMsg.current}
                </Button>
              </div>
            </m.div>
          </Container>
        </div>
      )}
      {dialog}
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
