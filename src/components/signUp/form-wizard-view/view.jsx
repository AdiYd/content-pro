'use client';

import { ComponentContainer } from 'src/components/new/component-block';

import { FormWizard } from './form-wizard';

// ----------------------------------------------------------------------

export function FormWizardView() {
  return (
    <>
      {/* <ComponentHero>
        <Typography>Somthing</Typography>
      </ComponentHero> */}

      <ComponentContainer sx={{ m: 1, p: 0 }}>
        <FormWizard />
      </ComponentContainer>
    </>
  );
}
