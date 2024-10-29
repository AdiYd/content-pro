'use client';


import { useContext } from 'react';

import { Typography } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { ComponentContainer } from 'src/components/new/component-block';

import { FormWizard } from './form-wizard';

// ----------------------------------------------------------------------

export function FormWizardView({ courseName = 'Video-Pro', coursePrice, ...props }) {
  const { textGradient } = useContext(ColorContext);
  return (
    <>
      <Typography sx={{ mb: 2 }} variant="h2">
        איך מצטרפים ל
        <Typography mx={1} variant="h2" component="a" sx={{ ...textGradient }}>
          {courseName}
        </Typography>
        ?
      </Typography>

      <Typography color="text.secondary" component="div" sx={{ mb: 4 }} variant="p">
        {props?.influencer
          ? 'בשלשה צעדים פשוטים ומהירים משלמים ומתחילים לקבל את כל התכנים והפרטים ההרלוונטים ישירות למייל שלכם'
          : 'בשלשה צעדים פשוטים ומהירים תקבלו את כל הפרטים והקישורים להצטרפות אלינו ישירות למייל שלכם'}
      </Typography>
      <ComponentContainer sx={{ m: 0, p: 0 }}>
        <FormWizard coursePrice={coursePrice} influencer={props?.influencer} />
      </ComponentContainer>
    </>
  );
}
