import { ShareTwoTone } from '@mui/icons-material';
import { Button, useTheme, useMediaQuery } from '@mui/material';

const WhatsAppShareButton = ({ queryParams }) => {
  const theme = useTheme();
  let isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  isMobile = isMobile && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const shareOnWhatsApp = () => {
    // const url = encodeURIComponent(window.location.href); // Current page URL
    const url = encodeURIComponent(window.location.href); // Current page URL
    // const message = encodeURIComponent(
    //   `Check out this site: ${url}${queryParams && `?${queryParams}`}`
    const message = `See how much you can make: ${url}${queryParams && `?${queryParams}`}`;
    // Custom message
    const whatsappUrl = isMobile
      ? `whatsapp://send?text=${message}`
      : `https://wa.me/?text=${message}`;

    window.open(whatsappUrl, '_blank'); // Opens WhatsApp on mobile devices
  };

  return (
    <Button onClick={shareOnWhatsApp} variant="text" startIcon={<ShareTwoTone />}>
      &nbsp; שיתוף &nbsp;
    </Button>
  );
};

export default WhatsAppShareButton;
