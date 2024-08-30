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
  StepConnector,
  DialogActions,
  DialogContent,
  FormControlLabel,
} from '@mui/material';

import { trackEvent } from 'src/utils/GAEvents';

import { ColorContext } from 'src/context/colorMain';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { NumOfDiscount } from 'src/components/considering/Considering';

const terms = require('../../../utils/terms.json');

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
                    bgcolor: `${mainColor}.main`,
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
  const { mainColor } = useContext(ColorContext);
  const onChangeHandler = (e) => {
    setValue(e.target.name, e.target.checked);
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
          <FormControlLabel
            control={
              <Checkbox
                name="learn"
                defaultChecked
                // checked={goals.learn ?? true}
                color={mainColor || 'error'}
                onChange={onChangeHandler}
              />
            }
            label="ללמוד ולהתמקצע"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="make-money"
                // checked={goals['make-money'] || false}
                color={mainColor || 'error'}
                onChange={onChangeHandler}
              />
            }
            label="לעבוד בתחום"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="make-comunity"
                // checked={goals['make-comunity'] || false}
                color={mainColor || 'error'}
                onChange={onChangeHandler}
              />
            }
            label="ליצור קהילה"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="make-people"
                // checked={goals['make-people'] || false}
                color={mainColor || 'error'}
                onChange={onChangeHandler}
              />
            }
            label="להכיר יוצרי תוכן"
          />
        </div>
      </div>

      <div className="flex flex-wrap w-full justify-around">
        <div className="z-30 mb-4 max-w-28">
          <FormControl sx={{ textAlign: 'center' }} fullWidth variant="outlined">
            <InputLabel>מין</InputLabel>
            <Select
              variant="filled"
              name="gender"
              onChange={(e) => setValue('gender', e.target.value)}
              sx={{ textAlign: 'center', width: { md: 90, xs: 111 } }}
              itemProp={{ textAlign: 'center' }}
              defaultValue=""
              // value={}
              // onChange={handleOptionsChange}
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

export function StepThree({ name, email, coursePrice, setValue }) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  const [update, setUpdate] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const [validCoupon, setValidCoupon] = useState(false);
  const totalPrice = useRef(coursePrice || 199);
  const color = validCoupon ? theme.palette.success.main : theme.palette.error.main;

  useEffect(() => {
    setValue('totalPrice', totalPrice.current);
  }, [setValue]);

  const handleCoupon = (e) => {
    const isCoupon = Cookies.get('counting');
    console.log(e.target.value, isCoupon);
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
    } else if (e.target.value === 'SuperPro_free' && !validCoupon) {
      totalPrice.current = 0;
      setValidCoupon(true);
      setValue('totalPrice', totalPrice.current);
      trackEvent('Coupon Redeem', 'Coupons', `free`);
    } else if (e.target.value.includes(`AdminPro_`) && !validCoupon) {
      const discount = Number(e.target.value.split('_')[1]);
      if (!Number.isNaN(discount) && [10, 15, 20, 25].includes(discount)) {
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
      <Typography variant="h6">
        מחיר חבילה הכוללת את הקורס, קישור לקהילה ועזרה בבניית תיק עבודות
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
        במקום ₪ 749
      </Typography>
      <Typography my={0} textAlign="center" variant="h3">
        רק ב - ₪ {coursePrice}
      </Typography>
      <div className="flex justify-center">
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

      <div className="flex justify-center">
        <Button type="submit" variant="contained" size="large" color="success">
          מעבר לתשלום
        </Button>
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
