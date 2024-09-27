// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import { Controller } from 'react-hook-form';
import { useRef, useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import MuiStepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import {
  List,
  Card,
  Grid,
  styled,
  Select,
  Dialog,
  Divider,
  MenuItem,
  Checkbox,
  useTheme,
  TextField,
  InputLabel,
  IconButton,
  FormControl,
  DialogTitle,
  CardContent,
  StepConnector,
  DialogActions,
  DialogContent,
  useMediaQuery,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';

import { trackEvent } from 'src/utils/GAEvents';

import { customShadows } from 'src/theme/core';
import { ColorContext } from 'src/context/colorMain';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { AnimateBorder } from 'src/components/animate';
import { NumOfDiscount } from 'src/components/considering/Considering';
import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

const terms = require('../../../utils/terms.json');

export const goalsDict = {
  'make-comunity': 'ליצור קהילה',
  'make-people': 'להכיר יוצרי תוכן',
  'make-money': 'לעבוד בתחום',
  learn: 'ללמוד ולהתמקצע',
};

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`& .MuiStepConnector-horizontal`]: {
    left: 'calc(50% + 20px)',
    right: 'calc(-50% + 20px)',
    transition: 'transform 0.3s ease', // Adds a smooth transition
    transform: 'rotate(180deg)', // Rotates the connector line
  },
}));

// ----------------------------------------------------------------------

export function Stepper({ steps, activeStep }) {
  const { mainColor } = useContext(ColorContext);
  return (
    <MuiStepper
      // connector={<CustomConnector />}
      activeStep={activeStep}
      variant="elevation"
      alternativeLabel
      sx={{
        mb: 5,
        [`& .MuiStepConnector-horizontal`]: {
          left: 'calc(50% + 20px)',
          right: 'calc(-50% + 20px)',
          transition: 'transform 0.3s ease', // Adds a smooth transition
          transform: 'rotate(180deg)', // Rotates the connector line
        },
      }}
    >
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={({ active, completed }) => (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  color: 'text.disabled',
                  typography: 'subtitle2',
                  bgcolor: 'action.disabledBackground',
                  ...(active && {
                    bgcolor: `${mainColor}.main`,
                    color: `${mainColor}.contrastText`,
                  }),
                  ...(completed && {
                    bgcolor: `success.main`,
                    color: `${mainColor}.contrastText`,
                  }),
                }}
              >
                {completed ? (
                  <Iconify width={14} icon="mingcute:check-fill" />
                ) : (
                  <Box sx={{ typography: 'subtitle2' }}>{index + 1}</Box>
                )}
              </Box>
            )}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </MuiStepper>
  );
}

// ----------------------------------------------------------------------

export function StepOne({ setValue, control, errors }) {
  const [active, setActive] = useState(false);
  const { mainColor } = useContext(ColorContext);

  const dialog = (
    <Dialog
      fullWidth
      sx={{
        // minWidth: '50%',
        // width: 'fit-content',
        // p: 15,
        // position: 'relative',
        direction: 'rtl',
        textAlign: 'center',
      }}
      open={active}
      onClose={() => setActive(false)}
    >
      <DialogTitle>
        {terms.title}
        {/* תנאי שימוש לקורס Video-Pro */}
        <IconButton
          aria-label="close"
          onClick={() => setActive(false)}
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
        <Typography textAlign="start" lineHeight={1.5} color="text.secondary" variant="body2">
          {terms.content.split('\n').map((item, index) => (
            <div key={index}>
              {item}
              <br />
            </div>
          ))}
        </Typography>

        <Typography color="text.primary" variant="p" />
      </DialogContent>

      <DialogActions sx={{ display: 'flex', gap: 3, justifyContent: 'space-around' }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            setValue('approveTerms', true);
            setActive(false);
          }}
          autoFocus
        >
          אישור
        </Button>

        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            setValue('approveTerms', false);
            setActive(false);
          }}
        >
          ביטול
        </Button>
      </DialogActions>
    </Dialog>
  );

  const checkBox = (
    <div className="flex flex-col gap-2">
      <Controller
        name="approveTerms"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            sx={{ mr: 0 }}
            control={
              <Checkbox
                {...field}
                color={mainColor}
                checked={field.value}
                // sx={{
                //   border: (theme) =>
                //     errors.approveTerms && `0.4px dashed ${theme.palette.error.main}`,
                // }}
              />
            }
            label={
              <Typography>
                קראתי ואישרתי את{' '}
                <Button
                  size="small"
                  sx={{
                    textDecoration: 'underline',
                    opacity: 0.8,
                  }}
                  // color="text.secondary"
                  onClick={() => setActive((p) => !p)}
                  mx={1}
                >
                  תנאי השימוש
                </Button>
              </Typography>
            }
          />
        )}
      />

      {errors.approveTerms && (
        <Typography mr={1} variant="body2" sx={{ color: (theme) => theme.palette.error.main }}>
          יש לאשר את תנאי השימוש
        </Typography>
      )}
    </div>
  );

  return (
    <div className="z-30 flex flex-col gap-6">
      {dialog}
      <Typography mb={2} variant="h6">
        הפרטים אליהם נשלח את הקישור לקורס ולקהילה:
      </Typography>
      <Field.Text
        name="name"
        type="text"
        label="שם מלא"
        variant="filled"
        InputLabelProps={{
          shrink: true,
          sx: {
            width: '125%',
            textAlign: 'right', // Aligns the label to the right
            // width: '100%', // Ensure the label takes up the full width
          },
        }}
      />
      <Field.Text
        name="email"
        label="אימייל"
        variant="filled"
        sx={{ direction: 'ltr' }}
        inputProps={{ dir: 'ltr', autoComplete: 'on' }}
        InputLabelProps={{
          shrink: true,
          sx: {
            zIndex: 26,
            width: '125%',
            textAlign: 'right', // Aligns the label to the right
            // width: '100%', // Ensure the label takes up the full width
          },
        }}
        autoComplete="on"
      />
      {checkBox}
    </div>
  );
}

export function StepTwo({ name, setValue }) {
  const theme = useTheme();
  const [update, setUpdate] = useState(false);
  const [gender, setGender] = useState('');
  const { mainColor } = useContext(ColorContext);
  const [goals, setGoals] = useState({
    learn: true,
    'make-money': false,
    'make-comunity': false,
    'make-people': false,
  });
  const goalsErrors = useRef();

  const onChangeHandler = (e) => {
    let newGoals;
    const tempGoals = Object.keys(goals).filter((item) => goals[item]);
    let numOfGoals = tempGoals.length;

    if (e.target.checked) {
      numOfGoals += 1;
      tempGoals.push(e.target.name);

      if (numOfGoals > 2) {
        goalsErrors.current = (
          <Typography mt={0} variant="body2" color="error">
            יש לבחור את 2 המטרות העיקריות
          </Typography>
        );
        setUpdate((p) => !p);
      } else {
        goalsErrors.current = undefined;
        newGoals = {
          ...goals,
          [e.target.name]: true,
        };
        setGoals(newGoals);
      }
    } else {
      if (goalsErrors.current) {
        goalsErrors.current = undefined;
      }
      tempGoals.splice(tempGoals.indexOf(e.target.name), 1);

      newGoals = {
        ...goals,
        [e.target.name]: false,
      };
      setGoals(newGoals);
    }

    const finalGoals = tempGoals.map((item) => goalsDict[item]);
    setValue('goals', finalGoals);
  };

  return (
    <div className="z-30 flex flex-col gap-6">
      <Typography mb={2} component="div" variant="h6">
        {name && (
          <Typography
            ml={1}
            variant="h6"
            color={theme.palette[mainColor]?.main || theme.palette.error.main}
            component="span"
          >
            היי {name},
          </Typography>
        )}
        נשמח להכיר אותך טוב יותר:
        <br />
        (לא חובה)
      </Typography>

      <div className="z-30 mb-4 w-full flex flex-col gap-4">
        <Typography textAlign="start" variant="body1">
          מה המטרות שלך מהקורס?
        </Typography>
        <div className="flex flex-wrap max-md:flex-col gap-4">
          {Object.keys(goals).map((item, index) => (
            <FormControlLabel
              key={index}
              name="goals"
              control={
                <Checkbox
                  name={item}
                  checked={goals[item]}
                  // checked={goals.learn ?? true}
                  color={mainColor || 'error'}
                  onChange={onChangeHandler}
                />
              }
              label={goalsDict[item]}
            />
          ))}
        </div>
        {goalsErrors.current && goalsErrors.current}
      </div>

      <div className="flex flex-wrap w-full justify-around">
        <div className="z-30 mb-4 max-w-28">
          <FormControl sx={{ textAlign: 'center' }} fullWidth variant="outlined">
            <InputLabel>מין</InputLabel>
            <Select
              variant="filled"
              name="gender"
              sx={{ textAlign: 'center', width: { md: 90, xs: 111 } }}
              itemProp={{ textAlign: 'center' }}
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                setValue('gender', e.target.value);
              }}
              // input={<OutlinedInput label="מין" />}
            >
              {['זכר', 'נקבה', 'אחר'].map((option) => (
                <MenuItem
                  sx={{
                    textAlign: 'center',
                    mx: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  key={option}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="z-30 mb-4  max-w-28">
          {/* <Typography variant="body1"> </Typography> */}
          <Field.Text
            label="גיל"
            type="number"
            name="age"
            sx={{ width: { md: 90, xs: 111 } }}
            fullWidth
            variant="filled"
            InputLabelProps={{
              shrink: true,
              sx: {
                width: '125%',
                textAlign: 'right', // Aligns the label to the right
                // width: '100%', // Ensure the label takes up the full width
              },
            }}
            inputProps={{ min: 14, max: 120 }}
          />
        </div>
      </div>
    </div>
  );
}

export function StepThree({ name, email, coursePrice, setValue, loading }) {
  const theme = useTheme();
  const { mainColor, mode, textGradient } = useContext(ColorContext);
  const [update, setUpdate] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const [validCoupon, setValidCoupon] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [active, setActive] = useState('Master-Pro');
  const totalPrice = useRef(coursePrice || active === 'Master-Pro' ? 499 : 749);
  const color = validCoupon ? theme.palette.success.main : theme.palette.error.main;
  coursePrice =
    active === 'Base-Pro'
      ? 249
      : ['Master-Pro', 'Xtra-Pro', 'Extra-Pro'].includes(active)
        ? 499
        : 749;

  useEffect(() => {
    setValue('totalPrice', totalPrice.current);
  }, [setValue]);

  useEffect(() => {
    if (active === 'Base-Pro') {
      totalPrice.current = 249;
    } else if (active === 'Xtra-Pro' || active === 'Extra-Pro') {
      totalPrice.current = 499;
    } else if (active === 'Master-Pro') {
      totalPrice.current = 499;
    } else {
      totalPrice.current = 749;
    }
    console.log('Changing price to : ', totalPrice.current);
    setUpdate((p) => !p);
    setValue('totalPrice', totalPrice.current);
    setValue('packageType', active);
  }, [active, setValue]);

  useEffect(() => {
    setUpdate((p) => !p);
  }, [loading]);

  const handleCoupon = (e) => {
    const isCoupon = Cookies.get('counting');
    if (e.target.value === `ExtraPro_${NumOfDiscount}` && !validCoupon && isCoupon) {
      totalPrice.current *= (100 - NumOfDiscount) / 100;
      totalPrice.current = Math.floor(totalPrice.current);
      setValidCoupon(true);
      setValue('totalPrice', totalPrice.current);
      trackEvent('Coupon Redeem', 'Coupons', `${NumOfDiscount}%`);
    } else if (e.target.value === 'MasterPro_gift' && !validCoupon) {
      totalPrice.current = 99;
      setValidCoupon(true);
      setValue('totalPrice', totalPrice.current);
      trackEvent('Coupon Redeem', 'Coupons', `99₪`);
    } else if (e.target.value === 'SuperPro_free' && !validCoupon && false) {
      totalPrice.current = 0;
      setValidCoupon(true);
      setValue('totalPrice', totalPrice.current);
      trackEvent('Coupon Redeem', 'Coupons', `free`);
    } else if (e.target.value.includes(`AdminPro_`) && !validCoupon) {
      const discount = Number(e.target.value.split('_')[1]);
      if (!Number.isNaN(discount) && [10, 15].includes(discount)) {
        totalPrice.current *= (100 - discount) / 100;
        totalPrice.current = Math.floor(totalPrice.current);
        setValidCoupon(true);
        setValue('totalPrice', totalPrice.current);
        trackEvent('Coupon Redeem', 'Coupons', `Admin ${discount}%`);
      }
    }
    if (totalPrice.current !== coursePrice) {
      setValue('totalPrice', totalPrice.current);
      setUpdate((p) => !p);
    }
  };

  return (
    <>
      <Typography textAlign="center" mb={2} variant="h6">
        כדי שכולם יוכלו להינות מהתכנים שלנו, הוספנו הנחות לזמן מוגבל ומבצעים למספר מצומצם של נרשמים
      </Typography>
      <CourseOptions active={active} setActive={setActive} isMobile={isMobile || false} />
      <Typography component="div" variant="h4" sx={{ my: 0, textAlign: 'center' }}>
        {active}
      </Typography>
      {active === 'Master-Pro' && (
        <>
          <Typography
            textAlign="center"
            my={0}
            mx={1}
            component="a"
            color="text.secondary"
            variant="h6"
          >
            יש לנו מבצע לזמן מוגבל ול-20 נרשמים הבאים בלבד 🎁
          </Typography>
          <Typography
            sx={{ textDecoration: 'line-through' }}
            textAlign="center"
            my={0}
            mx={1}
            component="a"
            color="GrayText"
            variant="h6"
          >
            במקום ₪749
          </Typography>
          <Typography my={0} textAlign="center" variant="h3">
            רק ב - {coursePrice} ₪
          </Typography>
        </>
      )}
      {(active === 'Xtra-Pro' || active === 'Extra-Pro') && (
        <>
          <Typography
            // sx={{ textDecoration: 'line-through' }}
            textAlign="center"
            mt={0}
            mx={1}
            component="a"
            color="text.secondary"
            variant="h6"
          >
            ל 20 נרשמים הבאים - מקבלים שדרוג לחבילת Master הכל כלול 🤫
          </Typography>
          <Typography my={0} textAlign="center" variant="h3">
            רק ב - {coursePrice} ₪
          </Typography>
        </>
      )}
      {/* <div className="flex justify-center">
        {!coupon && (
          <Button onClick={() => setCoupon(true)} variant="outlined" size="small">
            יש לי קוד קופון
          </Button>
        )}

        {coupon && (
          <TextField
            variant="standard"
            inputMode="text"
            sx={{
              direction: 'ltr',
              '& .MuiInputBase-input': {
                textAlign: 'center', // Center the text when typing
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: color, // Default underline color
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: color, // Color of underline when focused
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottomColor: color, // Color of underline on hover
              },
            }}
            type="text"
            onChange={handleCoupon}
            // fullWidth
            label="קופון"
            InputLabelProps={{
              shrink: true,
              sx: {
                width: '125%',
                textAlign: 'right',
              },
            }}
            helperText={validCoupon ? 'הקופון הוזן בהצלחה' : 'קופון לא תקין'}
          />
        )}
      </div> */}
      <div className="">
        <Typography textAlign="start" sx={{ opacity: 0.8 }} mr={2} mb={0} variant="body2">
          סיכום הרכישה
        </Typography>
        <Divider mt={0} sx={{ borderStyle: 'dashed' }} variant="middle" />
      </div>
      <div className="flex flex-wrap gap-4">
        {name && (
          <Typography my={0} variant="body2">
            שם: {name}
          </Typography>
        )}
        {email && (
          <Typography my={0} variant="body2">
            אימייל: {email}
          </Typography>
        )}
      </div>
      <Typography my={0} variant="p">
        {'סה"כ לתשלום : '} {totalPrice.current} ₪
        <Typography
          noWrap
          component="a"
          sx={{ textDecoration: 'line-through' }}
          mx={1}
          color="text.secondary"
        >
          {validCoupon && `( ₪ ${coursePrice})`}
        </Typography>
      </Typography>

      <Field.Text
        sx={{ visibility: 'hidden', display: 'none' }}
        value={totalPrice.current}
        name="totalPrice"
        // inputProps={{}}
      />

      <div className="flex justify-start">
        {!coupon && (
          <Button onClick={() => setCoupon(true)} variant="outlined" size="small">
            יש לי קוד קופון
          </Button>
        )}

        {coupon && (
          <TextField
            variant="standard"
            inputMode="text"
            sx={{
              direction: 'ltr',
              '& .MuiInputBase-input': {
                textAlign: 'center', // Center the text when typing
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: color, // Default underline color
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: color, // Color of underline when focused
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottomColor: color, // Color of underline on hover
              },
            }}
            type="text"
            onChange={handleCoupon}
            // fullWidth
            label="קופון"
            InputLabelProps={{
              shrink: true,
              sx: {
                width: '125%',
                textAlign: 'right',
              },
            }}
            helperText={validCoupon ? 'הקופון הוזן בהצלחה' : 'קופון לא תקין'}
          />
        )}
      </div>

      <div className="flex justify-center">
        {loading ? (
          <CircularProgress />
        ) : (
          <Button type="submit" variant="contained" size="large" color="success">
            מעבר לתשלום
          </Button>
        )}
      </div>
      <div className="flex gap-8 max-sm:gap-4 items-center justify-center">
        <Iconify width={50} icon="logos:google-pay" />
        {/* <Iconify width={40} icon={mode === 'dark' ? 'cib:apple-pay' : 'logos:apple-pay'} /> */}
        <Iconify width={30} icon="logos:mastercard" />
        <Iconify width={30} icon={mode === 'dark' ? 'fontisto:visa' : 'logos:visa'} />
        <div
          className="p-1 w-14"
          style={{
            backgroundImage: 'linear-gradient(270deg, #2C5E8B 0%, #39A3B2 100%)',
            borderRadius: '8px',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            width="44.922"
            height="24.475"
            viewBox="0 0 44.922 24.475"
          >
            <defs>
              <style>{'.cls-1{fill:#fff}.cls-2{fill:#d32733}'}</style>
            </defs>
            <path
              d="M11.443 22.714a8.133 8.133 0 0 1-8.116-8.132v-4.83H1.648a1.651 1.651 0 0 1 0-3.3h1.678v-4.8a1.647 1.647 0 1 1 3.295 0v4.8h4.821a8.132 8.132 0 0 1 0 16.264zM6.621 9.752v4.83a4.821 4.821 0 1 0 4.821-4.83z"
              className="cls-1"
            />
            <path
              d="M1.638 16.3A1.647 1.647 0 0 1 0 14.648V1.655A1.647 1.647 0 0 1 1.638 0a1.647 1.647 0 0 1 1.638 1.655v12.993A1.647 1.647 0 0 1 1.638 16.3"
              className="cls-1"
              transform="translate(20.396 6.452)"
            />
            <path
              d="M10.392 19.411a4.808 4.808 0 0 1-4.719-4.828V9.752h4.15a1.651 1.651 0 1 0 0-3.3h-4.15v-4.8a1.656 1.656 0 0 0-3.312 0v4.8h-.705a1.651 1.651 0 1 0 0 3.3h.705v4.83a8.144 8.144 0 0 0 7.946 8.129h.043a1.651 1.651 0 0 0 .041-3.3"
              className="cls-1"
              transform="translate(24.423)"
            />
            <path
              d="M3.686 1.843A1.843 1.843 0 1 1 1.843 0a1.843 1.843 0 0 1 1.843 1.843"
              className="cls-2"
              transform="translate(20.232 2.028)"
            />
            <path
              d="M.965 7.3l6.827-3.813a.435.435 0 0 0-.063-.787L.383.017a.286.286 0 0 0-.346.126.3.3 0 0 0-.011.264l1.058 2.469a.5.5 0 0 0 .441.305l3.018.133a.037.037 0 0 1 .006.073L1.59 4a.5.5 0 0 0-.39.37L.55 6.975a.3.3 0 0 0 .05.26.286.286 0 0 0 .365.065"
              className="cls-2"
              transform="translate(36.907 17.135)"
            />
          </svg>
        </div>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          // xmlns="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          className="iconify iconify--logos mnl__icon__root "
          width="1.29em"
          height="1em"
          viewBox="0 0 256 199"
        >
          <path d="M46.54 198.011V184.84c0-5.05-3.074-8.342-8.343-8.342c-2.634 0-5.488.878-7.464 3.732c-1.536-2.415-3.731-3.732-7.024-3.732c-2.196 0-4.39.658-6.147 3.073v-2.634h-4.61v21.074h4.61v-11.635c0-3.731 1.976-5.488 5.05-5.488c3.072 0 4.61 1.976 4.61 5.488v11.635h4.61v-11.635c0-3.731 2.194-5.488 5.048-5.488c3.074 0 4.61 1.976 4.61 5.488v11.635zm68.271-21.074h-7.463v-6.366h-4.61v6.366h-4.171v4.17h4.17v9.66c0 4.83 1.976 7.683 7.245 7.683c1.976 0 4.17-.658 5.708-1.536l-1.318-3.952c-1.317.878-2.853 1.098-3.951 1.098c-2.195 0-3.073-1.317-3.073-3.513v-9.44h7.463zm39.076-.44c-2.634 0-4.39 1.318-5.488 3.074v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.536-5.488 4.39-5.488c.878 0 1.976.22 2.854.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-59.052 2.196c-2.196-1.537-5.269-2.195-8.562-2.195c-5.268 0-8.78 2.634-8.78 6.805c0 3.513 2.634 5.488 7.244 6.147l2.195.22c2.415.438 3.732 1.097 3.732 2.195c0 1.536-1.756 2.634-4.83 2.634s-5.488-1.098-7.025-2.195l-2.195 3.512c2.415 1.756 5.708 2.634 9 2.634c6.147 0 9.66-2.853 9.66-6.805c0-3.732-2.854-5.708-7.245-6.366l-2.195-.22c-1.976-.22-3.512-.658-3.512-1.975c0-1.537 1.536-2.415 3.951-2.415c2.635 0 5.269 1.097 6.586 1.756zm122.495-2.195c-2.635 0-4.391 1.317-5.489 3.073v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.537-5.488 4.39-5.488c.879 0 1.977.22 2.855.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-58.833 10.976c0 6.366 4.39 10.976 11.196 10.976c3.073 0 5.268-.658 7.463-2.414l-2.195-3.732c-1.756 1.317-3.512 1.975-5.488 1.975c-3.732 0-6.366-2.634-6.366-6.805c0-3.951 2.634-6.586 6.366-6.805c1.976 0 3.732.658 5.488 1.976l2.195-3.732c-2.195-1.757-4.39-2.415-7.463-2.415c-6.806 0-11.196 4.61-11.196 10.976m42.588 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.073 0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.904 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805m-55.1-10.976c-6.147 0-10.538 4.39-10.538 10.976s4.39 10.976 10.757 10.976c3.073 0 6.147-.878 8.562-2.853l-2.196-3.293c-1.756 1.317-3.951 2.195-6.146 2.195c-2.854 0-5.708-1.317-6.367-5.05h15.587v-1.755c.22-6.806-3.732-11.196-9.66-11.196m0 3.951c2.853 0 4.83 1.757 5.268 5.05h-10.976c.439-2.854 2.415-5.05 5.708-5.05m114.372 7.025v-18.879h-4.61v10.976c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.903 0c0-3.732 2.414-6.805 6.366-6.805c3.732 0 6.366 2.854 6.366 6.805c0 3.732-2.634 6.805-6.366 6.805c-3.952-.22-6.366-3.073-6.366-6.805m-154.107 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61zm-17.123 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805" />
          <path fill="#FF5F00" d="M93.298 16.903h69.15v124.251h-69.15z" />
          <path
            fill="#EB001B"
            d="M97.689 79.029c0-25.245 11.854-47.637 30.074-62.126C114.373 6.366 97.47 0 79.03 0C35.343 0 0 35.343 0 79.029s35.343 79.029 79.029 79.029c18.44 0 35.343-6.366 48.734-16.904c-18.22-14.269-30.074-36.88-30.074-62.125"
          />
          <path
            fill="#F79E1B"
            d="M255.746 79.029c0 43.685-35.343 79.029-79.029 79.029c-18.44 0-35.343-6.366-48.734-16.904c18.44-14.488 30.075-36.88 30.075-62.125s-11.855-47.637-30.075-62.126C141.373 6.366 158.277 0 176.717 0c43.686 0 79.03 35.563 79.03 79.029"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          className="iconify iconify--logos mnl__icon__root MuiBox-root css-17b32sj"
          width="3.09em"
          height="1em"
          viewBox="0 0 256 83"
        >
          <defs>
            <linearGradient id="iconifyReact1" x1="45.974%" x2="54.877%" y1="-2.006%" y2="100%">
              <stop offset="0%" stopColor="#222357" />
              <stop offset="100%" stopColor="#254AA5" />
            </linearGradient>
          </defs>
          <path
            fill="url(#iconifyReact1)"
            d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963zm3.037-21.601l6.265-30.027h-17.158zm-118.599 21.6L88.964 1.246h20.687l17.104 79.963zm-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963z"
            transform="matrix(1 0 0 -1 0 82.668)"
          />
        </svg> */}
      </div>
    </>
  );
}

export function StepCompleted({ onReset }) {
  return (
    <Box
      gap={3}
      display="flex"
      flex="1 1 auto"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      sx={{ borderRadius: 'inherit', bgcolor: 'background.neutral' }}
    >
      <Typography variant="subtitle1">All steps completed - you&apos;re finished</Typography>

      <Button
        variant="outlined"
        onClick={onReset}
        startIcon={<Iconify icon="solar:restart-bold" />}
      >
        Reset
      </Button>
    </Box>
  );
}

const courseOptions2 = [
  {
    title: 'Master-Pro',
    subTitle: 'פרמיום הכל כלול',
    bullets: [
      'קורס + מנוי לקהילה',
      'כל מה שיוצר תוכן צריך',
      'ליווי בהכנת תיק עבודות',
      'קבלת הצעות עבודה',
    ],
    oldPrice: '₪1,099',
    currPrice: '₪749',
    master: true,
  },
  {
    title: 'Xtra-Pro',
    subTitle: 'קורס + מנוי לקהילה',
    bullets: ['כל תכני הקורס', 'מנוי לקהילת יוצרי תוכן', 'המשך קבלת תכני העשרה ומדריכים'],
    oldPrice: '₪749',
    currPrice: '₪499',
  },
  {
    title: 'Base-Pro',
    subTitle: 'קורס Video-Pro',
    bullets: ['כל סרטוני הקורס', 'חוברות והדרכות הקורס', 'חיבור לרשימת תפוצה'],
    oldPrice: '₪399',
    currPrice: '₪249',
  },
];
const courseOptions = [
  {
    title: 'Base-Pro',
    subTitle: 'קורס Video-Pro',
    bullets: ['כל סרטוני הקורס', 'חוברות והדרכות הקורס'],
    oldPrice: '₪399',
    currPrice: '₪249',
  },
  {
    title: 'Master-Pro',
    subTitle: 'הכל כלול',
    bullets: [
      'קורס + מנוי לקהילה',
      'כל מה שיוצר תוכן צריך',
      'ליווי בהכנת תיק עבודות',
      'קבלת הצעות עבודה',
    ],
    oldPrice: '₪1,099',
    currPrice: '₪749',
    master: true,
  },
  {
    title: 'Xtra-Pro',
    subTitle: 'קורס + מנוי לקהילה',
    bullets: ['כל תכני הקורס', 'מנוי לקהילת יוצרי תוכן', 'המשך קבלת תכני העשרה ומדריכים'],
    oldPrice: '₪749',
    currPrice: '₪499',
  },
];

const CourseOptions = ({ active, setActive, isMobile }) => {
  const { mainColor, themeColor } = useContext(ColorContext);
  const carousel = useCarousel({
    loop: true,

    plugins: [{ name: 'autoScroll' }],
    thumbs: {
      slidesToShow: 'auto',
    },
  });
  const courseOptionDiv = isMobile ? (
    <div>
      <Carousel
        // sx={{ m: 0, p: 0, display: 'block' }}
        slotProps={{ slide: { display: 'flex', px: 1, m: 1 } }}
        carousel={carousel}
      >
        {courseOptions2.map((option, index) => (
          <CourseCard
            active={active}
            onClick={() => setActive(option.title)}
            index={index - 1}
            title={option.title}
            subTitle={option.subTitle}
            bullets={option.bullets}
            oldPrice={option.oldPrice}
            currPrice={option.currPrice}
            master={option.master}
          />
        ))}
      </Carousel>
      {/* <CarouselArrowFloatButtons
        onClickPrev={carousel.arrows.onClickNext}
        onClickNext={carousel.arrows.onClickPrev}
        slotProps={{ prevBtn: { sx: { left: 0 } }, nextBtn: { sx: { right: -0 } } }}
      /> */}
      <div className="w-full flex justify-center">
        <CarouselDotButtons
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
          sx={{ color: themeColor, direction: 'ltr' }}
        />
      </div>
    </div>
  ) : (
    <Grid
      alignItems="center"
      overflow="visible"
      // display="flex"
      container
      spacing={1}
      paddingX={1}
      justifyContent="center"
    >
      {courseOptions.map((option, index) => (
        <Grid height={1} display="flex" item xs={12} sm={6} md={6} lg={4} key={index}>
          <CourseCard
            active={active}
            onClick={() => setActive(option.title)}
            index={index - 1}
            title={option.title}
            subTitle={option.subTitle}
            bullets={option.bullets}
            oldPrice={option.oldPrice}
            currPrice={option.currPrice}
            master={option.master}
          />
        </Grid>
      ))}
    </Grid>
  );

  return courseOptionDiv;
};

const CourseCard = ({
  title,
  subTitle,
  bullets,
  oldPrice,
  currPrice,
  index,
  master,
  active,
  onClick,
}) => {
  const { textGradient, mainColor, mode } = useContext(ColorContext);
  const [update, setUpdate] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  active = title.includes(active);

  useEffect(() => {
    setUpdate((p) => !p);
  }, [active]);

  return (
    <AnimateBorder
      sx={{
        width: 'fit-content',
        display: 'flex',
        height: 'fit-content',
        my: 'auto',
        mx: 'auto',
        p: active ? 0.2 : 0,
        borderRadius: 2,
        '&:hover': {
          transform: isMobile ? '' : `scale(1.1) rotate(${isMobile ? 0 : -1 * (index * 6)}deg)`,
          zIndex: 40,
          boxShadow: isMobile ? '' : customShadows().z16,
        },
        transform: isMobile ? `` : `rotate(${-1 * (index * 6)}deg)`,
      }}
      animate={{
        color: theme.palette.error.main,
        borderRadius: 2,
        width: active ? '4px' : '0.9px',
        distance: 80,
      }}
    >
      <Card
        sx={{
          position: master ? 'relative' : '',
          // mb: 2,
          boxShadow: customShadows(mode).z4,
          border: active
            ? `0.7px solid ${theme.palette.error.light}`
            : `0.7px solid ${theme.palette.divider}`,
          // ...bgGradient({
          //   color:
          //     mode === 'dark'
          //       ? 't45deg, transparent, #333, #333, transparent'
          //       : `45deg, #f5f5f5, #e5e5e5, transparent`,
          // }),
          // bgcolor: theme.palette.background.paper,
          // height: '100%',
          display: 'flex',
          zIndex: active ? 50 : 40,
          cursor: 'pointer',
          transition: 'all 0.5s ease-in-out',
          width: 1,
          direction: 'rtl',
          textAlign: 'center',
          p: 0.5,
          // transform: isMobile ? 'scale(0.7)' : ``,
        }}
        onClick={onClick}
      >
        {master && (
          <Button
            size="small"
            sx={{ position: 'absolute', top: 2, right: 5, fontSize: 10 }}
            variant="outlined"
          >
            הכי מבוקש
          </Button>
        )}
        <CardContent
          sx={{
            mx: 'auto',
            display: 'flex',
            height: 1,
            // zIndex: 40,
            flexDirection: 'column',
            direction: 'rtl',
            justifyContent: 'space-around',
          }}
        >
          <Typography
            alignItems="baseline"
            sx={{ display: 'flex', justifyContent: 'center', ...textGradient }}
            width={1}
            variant="h4"
            fontWeight={600}
            component="div"
            gutterBottom
          >
            {master && <Iconify sx={{ mx: 1 }} icon="fluent-emoji:crown" />} {title}
          </Typography>
          <Typography
            width={1}
            component="div"
            justifyContent="center"
            variant="subtitle1"
            color="text.secondary"
            gutterBottom
          >
            {subTitle}
          </Typography>
          <List>
            {bullets.map((bullet, indx) => (
              <Typography
                variant="body1"
                my={2}
                sx={{ m: 0, p: 0, textAlign: 'start', display: 'flex', gap: 1 }}
                key={indx}
              >
                <Iconify sx={{ mt: 0.5 }} width={isMobile ? 15 : 15} icon="lets-icons:check-fill" />
                {bullet}
                {/* <ListItemText sx={{ fontSize: '10px', fontWeight: 400, m: 0, p: 0 }} primary={bullet} /> */}
              </Typography>
            ))}
          </List>
          <Divider sx={{ borderStyle: 'dashed', marginY: 2, mb: master ? 0 : '' }} />
          {master && (
            <Typography fontSize={10} mb={2} variant="body2">
              * התחייבות להצעת עבודה ראשונה בתשלום של עד ₪499, עד 3 חודשים מסיום בניית תיק עבודות
            </Typography>
          )}
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textDecoration: 'line-through' }}
          >
            {oldPrice}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            {currPrice}
          </Typography>
        </CardContent>
      </Card>
    </AnimateBorder>
  );
};