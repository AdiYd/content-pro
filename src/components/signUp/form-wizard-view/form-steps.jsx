import { useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import MuiStepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import {
  styled,
  Select,
  MenuItem,
  Checkbox,
  useTheme,
  InputLabel,
  FormControl,
  StepConnector,
  FormControlLabel,
} from '@mui/material';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

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
                  ...(active && { bgcolor: 'primary.main', color: 'primary.contrastText' }),
                  ...(completed && { bgcolor: 'primary.main', color: 'primary.contrastText' }),
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

export function StepOne() {
  return (
    <div className="z-30 flex flex-col gap-6">
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
        inputProps={{ dir: 'ltr', autocomplete: 'on' }}
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
    </div>
  );
}

export function StepTwo() {
  const theme = useTheme();
  const [goals, setGoals] = useState({});
  const onChangeHandler = (e) => {
    console.log('I want to : ', e.target.name);
    setGoals((p) => ({
      ...p,
      [e.target.name]: p[e.target.name] ? !p[e.target.name] : true,
    }));
  };

  return (
    <div className="z-30 flex flex-col gap-6">
      <Typography mb={2} variant="h6">
        נשמח להכיר אתכם טוב יותר:
        <br />
        (לא חובה)
      </Typography>

      <div className="z-30 mb-4 w-full flex flex-col gap-4">
        <Typography textAlign="start" variant="body1">
          מה המטרות שלכם מהקורס?
        </Typography>
        <div className="flex flex-wrap max-md:flex-col gap-4">
          <FormControlLabel
            control={
              <Checkbox
                name="learn"
                checked={goals.learn ?? true}
                color="info"
                onChange={onChangeHandler}
              />
            }
            label="ללמוד ולהתמקצע"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="make-money"
                checked={goals['make-money'] || false}
                color="success"
                onChange={onChangeHandler}
              />
            }
            label="לעבוד בתחום"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="make-comunity"
                checked={goals['make-comunity'] || false}
                color="error"
                onChange={onChangeHandler}
              />
            }
            label="ליצור קהילה"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="make-people"
                checked={goals['make-people'] || false}
                color="secondary"
                onChange={onChangeHandler}
              />
            }
            label="להכיר יוצרי תוכן"
          />
        </div>
      </div>

      <div className="flex flex-wrap w-full justify-around">
        <div className="z-30 mb-4  max-w-28">
          {/* <Typography variant="body1"> </Typography> */}
          <Field.Text
            label="גיל"
            type="number"
            name="stepTwo.age"
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

        <div className="z-30 mb-4 max-w-28">
          <FormControl sx={{ textAlign: 'center' }} fullWidth variant="outlined">
            <InputLabel>מין</InputLabel>
            <Select
              variant="filled"
              defaultValue=""
              sx={{ textAlign: 'center', width: { md: 90, xs: 111 } }}
              itemProp={{ textAlign: 'center' }}
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
      </div>
    </div>
  );
}

export function StepThree() {
  const [coupon, setCoupon] = useState(false);
  const totalPrice = useRef(499);
  return (
    <>
      <Typography variant="h6">
        החבילה שלנו כוללת את הקורס, קישור לקהילה ועזרה בבניית תיק עבודות
      </Typography>
      <Typography variant="h6">ב - 499 במקום 749</Typography>
      <div className="flex justify-center">
        {!coupon && (
          <Button onClick={() => setCoupon(true)} variant="outlined" size="small">
            יש לי קוד קופון
          </Button>
        )}
        {coupon && (
          <Field.Text
            name="coupon"
            fullWidth
            label="קופון"
            variant="filled"
            sx={{ direction: 'ltr' }}
            inputProps={{ dir: 'ltr' }}
            InputLabelProps={{
              shrink: true,
              sx: {
                zIndex: 26,
                width: '125%',
                textAlign: 'right', // Aligns the label to the right
                // width: '100%', // Ensure the label takes up the full width
              },
            }}
          />
        )}
      </div>
      <Typography variant="p">
        {'סה"כ לתשלום : '} {totalPrice.current}
      </Typography>
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
