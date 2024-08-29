import { useState, useContext } from 'react';

import {
  Box,
  Stack,
  Button,
  Dialog,
  Divider,
  Typography,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { customShadows } from 'src/theme/core';
import { ColorContext } from 'src/context/colorMain';

import { Iconify } from '../iconify';
import COLORS from '../../theme/core/colors.json';

const terms = require('../../utils/terms.json');

// function createFooterBoxShadow(mode) {
//   const shadowColor = alpha(mode === 'light' ? 'black' : 'white', 0.25);
//   const shadowOffset = mode === 'light' ? '0px 2px 4px 0px' : '0px -2px 4px 0px';

//   return `${shadowOffset} ${shadowColor}`;
// }

const gradDivider = (
  <Divider
    sx={{
      mt: 6,
      background: `linear-gradient(to right,${COLORS.error?.main},${COLORS.info?.main}, ${COLORS.info?.dark},${COLORS.secondary?.light} ,${COLORS.secondary?.main},${COLORS.warning?.main},${COLORS.primary?.main})`,
      width: '100%',
      height: 1.2,
      borderRadius: 50,
      border: 'none',
      backgroundSize: '200% 100%', // This makes the gradient larger than the container
      animation: 'slide 2s linear infinite', // Define the animation timing and type
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
  />
);

function Footer({ ...props }) {
  const { mode } = useContext(ColorContext);
  const [takanon, setTakanon] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const dialog = (
    <Dialog
      fullWidth
      sx={{
        // minWidth: '50%',
        // width: 'fit-content',
        // p: 15,
        // position: 'relative',
        direction: 'rtl',
        textAlign: 'center',
      }}
      open={takanon}
      onClose={() => setTakanon(false)}
    >
      <DialogTitle>
        {terms.title}
        {/* תנאי שימוש לקורס Video-Pro */}
        <IconButton
          aria-label="close"
          onClick={() => setTakanon(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            // color: (theme) => theme.palette.grey[500],
          }}
        >
          <Iconify icon="carbon:close-filled" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ color: 'text.secondary' }}>
        <Typography textAlign="start" lineHeight={1.5} color="text.secondary" variant="body2">
          {terms.content.split('\n').map((item, index) => (
            <div key={index}>
              {item}
              <br />
            </div>
          ))}
        </Typography>

        <Typography color="text.primary" variant="p" />
      </DialogContent>

      <DialogActions sx={{ display: 'flex', gap: 3, justifyContent: 'space-around' }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            setTakanon(false);
          }}
          autoFocus
        >
          אישור
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box component="footer" boxShadow={customShadows(mode).z20} height={8} mt={8} maxWidth="100%">
      <Divider />

      <div className="px-4 w-full mt-4 flex flex-wrap-reverse justify-around">
        <div className="max-w-3xl px-4 flex w-fit">
          <Typography color="text.secondary" noWrap variant="p">
            כל הזכויות שמורות © 2024 Webly
            <a
              href="https://wa.me/527242775"
              target="_blank"
              className="mx-4 hover:scale-150 cursor-pointer"
              rel="noreferrer"
            >
              <Iconify icon="logos:whatsapp-icon" />
            </a>
          </Typography>
        </div>

        <Stack spacing={4} direction="row" sx={{ px: 4 }}>
          <Typography noWrap>
            <Button
              size="small"
              sx={{
                textDecoration: 'underline',
                opacity: 0.8,
              }}
              // color="text.secondary"
              onClick={() => setTakanon((p) => !p)}
              px={1}
            >
              תקנון אתר
            </Button>
          </Typography>
          <Typography noWrap>
            <Button
              size="small"
              sx={{
                textDecoration: 'underline',
                opacity: 0.8,
              }}
              // color="text.secondary"
              onClick={() => setPrivacy((p) => !p)}
              px={1}
            >
              מדיניות פרטיות
            </Button>
          </Typography>

          <Typography color="text.secondary" variant="body2" />
        </Stack>
      </div>
      <div className="h-4" />
    </Box>
  );
}

export default Footer;
