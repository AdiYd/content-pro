'use client';

import { z as zod } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useContext, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Card, useTheme, Container } from '@mui/material';

import { trackEvent, trackFormSubmission } from 'src/utils/GAEvents';

import { customShadows } from 'src/theme/core';
import { ColorContext } from 'src/context/colorMain';

import { Form } from 'src/components/hook-form';
import { AnimateBorder } from 'src/components/animate';

import { StepTwo, Stepper, StepOne, StepThree } from './form-steps';

// ----------------------------------------------------------------------

const steps = ['פרטי התקשרות', 'פרטים כלליים', 'תשלום'];

const StepOneSchema = zod.object({
  fullName: zod.string().min(2, { message: 'נא למלא שם מלא' }),
  email: zod
    .string()
    .min(1, { message: 'נא למלא כתובת אימייל' })
    .email({ message: 'נא למלא כתובת אימייל תקינה' }),
});

const StepTwoSchema = zod.object({});

const StepThreeSchema = zod.object({});

const WizardSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'נא למלא כתובת אימייל' })
    .email({ message: 'נא למלא כתובת אימייל תקינה' }),
  name: zod.string().min(2, { message: 'נא למלא שם מלא' }),
  approveTerms: zod.boolean().refine((val) => val === true, {
    message: 'יש לאשר את תנאי השימוש ותקנון האתר',
  }),
  age: zod.number().optional(),
  gender: zod.string().optional(),
  'make-comunity': zod.boolean().optional(),
  'make-money': zod.boolean().optional(),
  'make-people': zod.boolean().optional(),
  learn: zod.boolean().optional(),
  totalPrice: zod.number().optional(),
  // stepOne: StepOneSchema,
  // stepTwo: StepTwoSchema,
  // stepThree: StepThreeSchema,
});

// ----------------------------------------------------------------------

const colorSteps = {
  0: 'error',
  1: 'info',
  2: 'success',
};

const defaultValues = {
  email: '',
  name: '',
  approveTerms: false,
  age: 0,
  gender: 'other',
  'make-comunity': false,
  'make-money': false,
  'make-people': false,
  learn: true,
  totalPrice: 99,
};

export function FormWizard({ coursePrice }) {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(WizardSchema),
    defaultValues,
  });

  const {
    reset,
    trigger,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const handleNext = useCallback(
    async (step) => {
      if (step) {
        let isValid = true;
        if (step === 'stepOne') {
          isValid = await trigger(['email', 'name', 'approveTerms']);
        } else {
          await trigger([
            'age',
            'learn',
            'make-comunity',
            'make-people',
            'make-money',
            'totalPrice',
            'gender',
          ]);
        }

        if (isValid) {
          trackFormSubmission(`New user: ${methods.getValues().email}`);
          trackEvent('Signup', 'Signup form', `Step #${activeStep + 1}`, activeStep + 1);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } else {
        trackEvent('Signup', 'Signup form', `Step #${activeStep + 1}`, activeStep + 1);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    },
    [trigger, activeStep, methods]
  );

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleReset = useCallback(() => {
    reset();
    setActiveStep(0);
  }, [reset]);

  // const onSubmit = (e) => {
  //   // e.preventDefault();
  //   console.log('data: ', e);
  // };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Create success!');
      console.info('DATA', data);

      // handleNext();
    } catch (error) {
      console.error(error);
    }
  });

  const completedStep = activeStep === steps.length;
  const name = methods.getValues().name.split(' ')[0];
  const { email } = methods.getValues();
  return (
    <AnimateBorder
      sx={{ borderRadius: 2, borderWidth: 0 }}
      animate={{
        angle: 250,
        outline: '',
        distance: 10,
        // disableDoubleline: true,
        length: 10,
        color: theme.palette[colorSteps[activeStep] || 'error'].main,
        // width: '1px',
      }}
    >
      <Container
        sx={{
          zIndex: 30,
          boxShadow: customShadows().z16,
          py: 4,
          px: 2,
          width: 1,
          borderRadius: 2,
          border: `1px dashed ${theme.palette.divider}`,
          mx: 'auto',
          maxWidth: 720,
        }}
      >
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stepper steps={steps} activeStep={activeStep} />
          {/* <AnimateBorder
            sx={{ zIndex: 10, maxWidth: { md: '60%', xs: '100%' }, borderRadius: 2, mx: 'auto' }}
            animate={{
              disable: true,
              color: theme.palette.success.main,
              // outline: '',
              disableDoubleline: true,
              width: '1px',
              length: 30,
            }}
          > */}
          <Card
            gap={3}
            // display="flex"
            // flexDirection="column"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              p: 3,
              zIndex: 25,
              mb: 3,
              maxWidth: { md: '60%', xs: '100%' },
              minHeight: 240,
              mx: 'auto',
              borderRadius: 2,
              // border: theme.palette.mode === 'light' && `solid 1px ${theme.vars.palette.divider}`,
              // background: theme.palette.background.paper,
            }}
          >
            {activeStep === 0 && <StepOne errors={errors} control={control} setValue={setValue} />}
            {activeStep === 1 && <StepTwo setValue={setValue} name={name} />}
            {activeStep === 2 && (
              <StepThree setValue={setValue} coursePrice={coursePrice} name={name} email={email} />
            )}
            {/* {completedStep && <StepCompleted onReset={handleReset} />} */}
          </Card>
          {!completedStep && (
            <Box zIndex={30} display="flex" width={1} justifyContent="center">
              {activeStep !== 0 && (
                <Button sx={{ zIndex: 30 }} color={mainColor} onClick={handleBack}>
                  חזרה
                </Button>
              )}

              <Box sx={{ flex: 'auto 1 1' }} />

              {activeStep === 0 && (
                <Button
                  sx={{ zIndex: 30 }}
                  variant="contained"
                  color={mainColor}
                  onClick={() => handleNext('stepOne')}
                >
                  הבא
                </Button>
              )}
              {activeStep === 1 && (
                <Button
                  sx={{ zIndex: 30 }}
                  color={mainColor}
                  variant="contained"
                  onClick={() => handleNext('stepTwo')}
                >
                  הבא
                </Button>
              )}
              {activeStep === 2 && <></>}
            </Box>
          )}

          {/* </AnimateBorder> */}
        </Form>
      </Container>
    </AnimateBorder>
  );
}
