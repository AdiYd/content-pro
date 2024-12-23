import { Stack, Tooltip, useColorScheme } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DarkModeTwoTone, LightModeTwoTone } from '@mui/icons-material';

export default function ThemeModePicker({ className = '', color }) {
  const { mode, setMode } = useColorScheme();

  const changeMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };
  return (
    <div className={className}>
      <Stack
        direction="row"
        justifyContent="center"
        // position="absolute"
        bottom={0}
        spacing={4}
      >
        <div className={`p-2 text-white rounded-full ${mode === 'light' && ' bg-slate-400/30'}`}>
          <Tooltip title="תצוגה בהירה">
            <LightModeTwoTone
              onClick={changeMode}
              color="common.white"
              className="cursor-pointer hover:opacity-80"
              titleAccess="Light mode"
            />
          </Tooltip>
        </div>
        <div className={`p-2 text-white rounded-full ${mode === 'dark' && ' bg-slate-400/30'}`}>
          <Tooltip title="תצוגה כהה">
            <DarkModeTwoTone
              onClick={changeMode}
              color="common.white"
              className="cursor-pointer hover:opacity-80"
              titleAccess="DarkModeTwoTone"
            />
          </Tooltip>
        </div>
      </Stack>
    </div>
  );
}
