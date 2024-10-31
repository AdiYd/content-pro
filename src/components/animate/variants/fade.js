import { varTranExit, varTranEnter } from './transition';

// ----------------------------------------------------------------------

export const varFade = (props) => {
  const distance = props?.distance || 120;
  const durationIn = props?.durationIn;
  const durationOut = props?.durationOut;
  const easeIn = props?.easeIn;
  const easeOut = props?.easeOut;
  const delay = props?.delay;

  return {
    // IN
    in: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: varTranEnter },
      exit: { opacity: 0, transition: varTranExit },
    },
    inUp: {
      initial: { y: distance, opacity: 0, zIndex: -10, position: 'relative' },
      animate: {
        y: 0,
        opacity: 1,
        zIndex: 1,
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
      exit: { y: distance, opacity: 0, transition: varTranExit({ durationOut, easeOut }) },
    },
    inDown: {
      initial: { y: -distance, opacity: 0, zIndex: -10, position: 'relative' },
      animate: {
        y: 0,
        opacity: 1,
        zIndex: 1,
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
      exit: { y: -distance, opacity: 0, transition: varTranExit({ durationOut, easeOut }) },
    },
    inLeft: {
      initial: { x: -distance, opacity: 0, zIndex: -10, position: 'relative' },
      animate: {
        x: 0,
        opacity: 1,
        zIndex: 1,
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
      exit: { x: -distance, opacity: 0, transition: varTranExit({ durationOut, easeOut }) },
    },
    inRight: {
      initial: { x: distance, opacity: 0, zIndex: -10, position: 'relative' },
      animate: {
        x: 0,
        opacity: 1,
        zIndex: 1,
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
      exit: { x: distance, opacity: 0, transition: varTranExit({ durationOut, easeOut }) },
    },

    // OUT
    out: {
      initial: { opacity: 1 },
      animate: { opacity: 0, transition: varTranEnter({ durationIn, easeIn, delay }) },
      exit: { opacity: 1, transition: varTranExit({ durationOut, easeOut }) },
    },
    outUp: {
      initial: { y: 0, opacity: 1 },
      animate: {
        y: -distance,
        opacity: 0,
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
      exit: { y: 0, opacity: 1, transition: varTranExit({ durationOut, easeOut }) },
    },
    outDown: {
      initial: { y: 0, opacity: 1 },
      animate: { y: distance, opacity: 0, transition: varTranEnter({ durationIn, easeIn, delay }) },
      exit: { y: 0, opacity: 1, transition: varTranExit({ durationOut, easeOut }) },
    },
    outLeft: {
      initial: { x: 0, opacity: 1 },
      animate: {
        x: -distance,
        opacity: 0,
        transition: varTranEnter({ durationIn, easeIn, delay }),
      },
      exit: { x: 0, opacity: 1, transition: varTranExit({ durationOut, easeOut }) },
    },
    outRight: {
      initial: { x: 0, opacity: 1 },
      animate: { x: distance, opacity: 0, transition: varTranEnter({ durationIn, easeIn, delay }) },
      exit: { x: 0, opacity: 1, transition: varTranExit({ durationOut, easeOut }) },
    },
  };
};
