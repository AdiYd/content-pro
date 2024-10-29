import { m } from 'framer-motion';
import { useContext } from 'react';

import { useTheme, Container } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { FormWizardView } from './form-wizard-view';
import { varSlide, MotionContainer } from '../animate';

function SignUp({ coursName = 'Video-pro', influencer = false, coursePrice, ...props }) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  return (
    <Container
      id="signUp"
      component={MotionContainer}
      // maxWidth="lg"
      sx={{
        // pt: { xs: 2, md: 2 },
        pb: { xs: 8, md: 10 },
        direction: 'rtl',
        alignItems: 'center',
        textAlign: { xs: 'center', md: 'unset', direction: 'rtl' },
      }}
    >
      {/* <Divider
        sx={{
          mb: 6,
          background: `linear-gradient(to right, ${theme.palette.primary?.main}, ${theme.palette.info?.main},${theme.palette.secondary?.main},${theme.palette.error?.main})`,
          width: '100%',
          height: 1.5,
          borderRadius: 50,
          border: 'none',
          backgroundSize: '200% 100%', // This makes the gradient larger than the container
          animation: 'slide 30s linear infinite', // Define the animation timing and type
          '@keyframes slide': {
            '0%': {
              backgroundPosition: '0% 50%', // Start at the beginning of the gradient
            },
            '50%': {
              backgroundPosition: '100% 50%', // End at the end of the gradient
            },
            '100%': {
              backgroundPosition: '0% 100%', // End at the end of the gradient
            },
          },
        }}
      /> */}
      <m.div variants={varSlide().in}>
        <FormWizardView influencer={influencer} courseName={coursName} coursePrice={coursePrice} />
      </m.div>
      {/* <Divider
        sx={{
          mt: 6,
          background: `linear-gradient(to right, transparent,${theme.palette.success?.main}), transparent`,
          width: '100%',
          height: 1.5,
          borderRadius: 50,
          border: 'none',
          backgroundSize: '200% 100%', // This makes the gradient larger than the container
          animation: 'slide 3s ease-in-out infinite', // Define the animation timing and type
          '@keyframes slide': {
            '0%': {
              backgroundPosition: '0% 50%', // Start at the beginning of the gradient
            },
            '50%': {
              backgroundPosition: '100% 50%', // End at the end of the gradient
            },
            '100%': {
              backgroundPosition: '0% 100%', // End at the end of the gradient
            },
          },
        }}
      /> */}
      {/* <Divider
        sx={{
          mt: 6,
          background: `linear-gradient(to right, ${theme.palette.info?.main},${theme.palette.warning?.main},${theme.palette.error?.main})`,
          width: '100%',
          height: 1.5,
          borderRadius: 50,
          border: 'none',
          backgroundSize: '200% 100%', // This makes the gradient larger than the container
          animation: 'slide 20s linear infinite', // Define the animation timing and type
          '@keyframes slide': {
            '0%': {
              backgroundPosition: '0% 50%', // Start at the beginning of the gradient
            },
            '50%': {
              backgroundPosition: '100% 50%', // End at the end of the gradient
            },
            '100%': {
              backgroundPosition: '0% 100%', // End at the end of the gradient
            },
          },
        }}
      /> */}
    </Container>
  );
}

export default SignUp;
