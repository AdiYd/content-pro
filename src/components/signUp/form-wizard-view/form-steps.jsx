import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import MuiStepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import {
  Chip,
  styled,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  StepConnector,
  OutlinedInput,
  FormHelperText,
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
    <>
      <Typography variant="body2">הפרטים אליהם ישלח את הקישור לקורס ול - WhatsApp</Typography>
      <Field.Text
        name="stepOne.fullName"
        label="שם מלא"
        variant="filled"
        InputLabelProps={{ shrink: true }}
      />
      <Field.Text
        name="stepOne.email"
        label="אימייל"
        variant="filled"
        InputLabelProps={{ shrink: true }}
      />
    </>
  );
}

export function StepTwo() {
  return (
    <>
      <Typography mb={0} variant="body2">
        פרטים נוספים - כדי שנכיר אתכם טוב יותר
      </Typography>
      <Typography variant="body2">(לא חובה)</Typography>
      <form noValidate autoComplete="off">
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Email"
            type="email"
            // value={email}
            // onChange={handleEmailChange}
            // error={!!emailError}
            // helperText={emailError}
            fullWidth
            variant="outlined"
          />
        </div>

        <div style={{ marginBottom: '16px', width: '100px' }}>
          <TextField
            label="Age"
            type="number"
            // value={age}
            // onChange={handleAgeChange}
            // error={!!ageError}
            // helperText={ageError}
            fullWidth
            variant="outlined"
            inputProps={{ min: 16, max: 120 }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="multiple-select-label">Options</InputLabel>
            <Select
              labelId="multiple-select-label"
              multiple
              value={[]}
              // onChange={handleOptionsChange}
              input={<OutlinedInput label="Options" />}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {['אפשרות 1', 'אפשרות 2', 'אפשרות 3'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select multiple options</FormHelperText>
          </FormControl>
        </div>
      </form>
    </>
  );
}

export function StepThree() {
  return (
    <Field.Text
      name="stepThree.email"
      label="Email"
      variant="filled"
      InputLabelProps={{ shrink: true }}
    />
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
