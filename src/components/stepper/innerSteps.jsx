import { useContext } from 'react';

import { useTheme, Container, Typography, useMediaQuery } from '@mui/material';

import { customShadows } from 'src/theme/core';
import { ColorContext } from 'src/context/colorMain';

export default function InnerStep({ steps = [], itemNum = 1, ...props }) {
  const { mainColor } = useContext(ColorContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container
      sx={{
        borderRadius: 2,
        width: 'fit-content',
        p: 1,
        mt: 4,
        boxShadow: customShadows()?.[mainColor],
      }}
      aria-label="Breadcrumb"
      // className="flex mx-12 mt-8 mb-8"
    >
      <ol className="flex space-x-4 rounded-md ">
        {steps.map((item, index) => (
          <li key={index} className="flex">
            <div className="flex items-center">
              <Typography sx={{ width: itemNum === 3 ? 1 : 1 }} variant={isMobile ? 'p' : 'h4'}>
                {item}
                {itemNum === 3 ? ' 😉' : ''}
              </Typography>
            </div>
            {index !== steps.length - 1 && (
              <Container
                sx={{
                  m: 0,
                  color: theme.palette[mainColor]?.main || theme.palette.primary.main,
                  mx: { md: 2, xs: 1 },
                  p: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 48 48"
                >
                  <path fill="currentColor" d="m30.9 43l3.1-3.1L18.1 24L34 8.1L30.9 5L12 24z" />
                </svg>
              </Container>
            )}
          </li>
        ))}
      </ol>
    </Container>
  );
}
