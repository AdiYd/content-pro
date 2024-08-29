import { Box, Divider, Container, Typography } from '@mui/material';

import { Iconify } from '../iconify';

function Footer({ ...props }) {
  return (
    <Box mt={8} maxWidth="100%">
      <Divider />
      <Container sx={{ my: 4, px: 4 }}>
        <Typography mt={4} variant="p">
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

        <Typography color="text.secondary" variant="body2" />
      </Container>
    </Box>
  );
}

export default Footer;
