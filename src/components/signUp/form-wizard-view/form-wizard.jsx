import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useContext, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { ColorContext } from 'src/context/colorMain';

import { toast } from 'src/components/snackbar';
import { Form } from 'src/components/hook-form';

import { Stepper, StepOne, StepTwo, StepThree, StepCompleted } from './form-steps';

// ----------------------------------------------------------------------

const steps = ['פרטי התקשרות', 'פרטים כלליים', 'תשלום'];

const StepOneSchema = zod.object({
  fullName: zod.string().min(1, { message: 'נא למלא שם מלא' }),
  email: zod.string().min(1, { message: 'נא למלא אימייל' }),
});

const StepTwoSchema = zod.object({
  age: zod
    .number()
    .min(1, { message: 'Age is required!' })
    .min(16, { message: 'Age must be between 18 and 100' })
    .max(120, { message: 'Age must be between 18 and 100' }),
});

const StepThreeSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
});

const WizardSchema = zod.object({
  stepOne: StepOneSchema,
  stepTwo: StepTwoSchema,
  stepThree: StepThreeSchema,
});

// ----------------------------------------------------------------------

const defaultValues = {
  stepOne: { fullName: '', email: '' },
  stepTwo: { age: 22 },
};

export function FormWizard() {
  const [activeStep, setActiveStep] = useState(1);
  const { mainColor } = useContext(ColorContext);

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(WizardSchema),
    defaultValues,
  });

  const {
    reset,
    trigger,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleNext = useCallback(
    async (step) => {
      if (step) {
        const isValid = await trigger(step);

        if (isValid) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    },
    [trigger]
  );

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleReset = useCallback(() => {
    reset();
    setActiveStep(0);
  }, [reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Create success!');
      console.info('DATA', data);
      handleNext();
    } catch (error) {
      console.error(error);
    }
  });

  const completedStep = activeStep === steps.length;

  return (
    <Card sx={{ zIndex: 25, p: 5, width: 1, mx: 'auto', maxWidth: 720 }}>
      <Form methods={methods} onSubmit={onSubmit}>
        <Stepper steps={steps} activeStep={activeStep} />

        <Box
          gap={3}
          display="flex"
          flexDirection="column"
          sx={{
            p: 3,
            mb: 3,
            minHeight: 240,
            borderRadius: 1.5,
            border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
          }}
        >
          {activeStep === 0 && <StepOne />}
          {activeStep === 1 && <StepTwo />}
          {activeStep === 2 && <StepThree />}
          {completedStep && <StepCompleted onReset={handleReset} />}
        </Box>

        {!completedStep && (
          <Box display="flex" width={1} justifyContent="center">
            {activeStep !== 0 && <Button onClick={handleBack}>חזרה</Button>}

            <Box sx={{ flex: 'auto 1 1' }} />

            {activeStep === 0 && (
              <Button variant="contained" color={mainColor} onClick={() => handleNext('stepOne')}>
                הבא
              </Button>
            )}
            {activeStep === 1 && (
              <Button variant="contained" onClick={() => handleNext('stepTwo')}>
                הבא
              </Button>
            )}
            {activeStep === 2 && (
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                לתשלום
              </LoadingButton>
            )}
          </Box>
        )}
      </Form>
    </Card>
  );
}
