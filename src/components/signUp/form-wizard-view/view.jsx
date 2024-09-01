'use client';


import { useContext } from 'react';

import { Typography } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { ComponentContainer } from 'src/components/new/component-block';

import { FormWizard } from './form-wizard';

// ----------------------------------------------------------------------

export function FormWizardView({ coursePrice }) {
  const { textGradient } = useContext(ColorContext);
  return (
    <>
      <Typography sx={{ mb: 2 }} variant="h2">
        איך מצטרפים ל
        <Typography mx={1} variant="h2" component="a" sx={{ ...textGradient }}>
          Video-Pro
        </Typography>
        ?
      </Typography>

      <Typography color="text.secondary" component="div" sx={{ mb: 4 }} variant="p">
        תהליך ההרשמה פשוט מהיר ומאובטח, מיד בסיום ההרשמה תקבלו מייל עם כל הפרטים והקישורים להמשך
      </Typography>
      <ComponentContainer sx={{ m: 0, p: 0 }}>
        <FormWizard coursePrice={coursePrice} />
      </ComponentContainer>
    </>
  );
}
