'use-client';

import Confetti from 'react-confetti';
import React, { useState, useEffect } from 'react';

import { useTheme } from '@mui/material';

const emojis = ['🎉', '🎊', '🥳', '💥', '✨'];

// Custom drawShape function to render emojis
const drawEmoji = (ctx) => {
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  ctx.font = '35px serif'; // Set the font size for the emoji
  ctx.fillText(emoji, -12, 12); // Draw the emoji centered on the canvas
};

const Confettis = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const theme = useTheme();

  useEffect(() => {
    // Set the window dimensions in the client-side
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <div>
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={600}
        gravity={0.08}
        wind={0.01}
        recycle={false}
        // drawShape={drawEmoji}
        colors={[
          theme.palette.warning.dark,
          theme.palette.warning.main,
          theme.palette.warning.light,
          theme.palette.info.dark,
          theme.palette.info.main,
          theme.palette.info.light,
          theme.palette.success.dark,
          theme.palette.success.main,
          theme.palette.success.light,
          theme.palette.secondary.dark,
          theme.palette.secondary.main,
          theme.palette.secondary.light,
          theme.palette.warning.dark,
          theme.palette.warning.main,
          theme.palette.warning.light,
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FFFF00',
        ]}
      />
    </div>
  );
};

export default Confettis;
