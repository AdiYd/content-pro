import { useRef, useState } from 'react';

import { Button } from '@mui/material';

import Confettis from './Confettis';

function Considering({ ...props }) {
  const [confetti, setConfetti] = useState(false);
  const buttonMsg = useRef(' אהבתם?! תנו לייק 👍');

  const startConfetti = () => {
    buttonMsg.current = '👏 אתם בדרך הנכונה - להפוך ליוצרי תוכן מבוקשים 👏';
    setConfetti((p) => !p);

    if (!confetti) {
      setTimeout(() => {
        setConfetti(false);
      }, 6 * 1e3);
    }
  };
  return (
    <div className="my-8 flex justify-center w-full">
      {confetti && (
        <div className="fixed top-0 w-full">
          <Confettis />
        </div>
      )}
      <Button
        sx={{
          alignSelf: 'center',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
        onClick={startConfetti}
        variant="outlined"
        color="error"
      >
        {buttonMsg.current}
      </Button>
    </div>
  );
}

export default Considering;
