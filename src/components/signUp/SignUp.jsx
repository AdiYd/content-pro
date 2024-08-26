import { m } from 'framer-motion';
import { useContext } from 'react';

import { useTheme, Container } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { FormWizardView } from './form-wizard-view';
import { varBounce, MotionContainer } from '../animate';
import { ComponentBlock } from '../new/component-block';

function SignUp({ ...props }) {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  return (
    <Container
      id="signUp"
      component={MotionContainer}
      // maxWidth="lg"
      sx={{
        py: { xs: 4, md: 4 },
        direction: 'rtl',
        alignItems: 'center',
        textAlign: { xs: 'center', md: 'unset', direction: 'rtl' },
      }}
    >
      <m.div variants={varBounce().in}>
        <ComponentBlock title="הצטרפות ל Video-Pro" sx={{ direction: 'rtl', mx: 0, px: 0 }}>
          <FormWizardView />
        </ComponentBlock>
      </m.div>
    </Container>
  );
}

export default SignUp;
