import { Stack, useColorScheme } from '@mui/material';
import { DarkModeTwoTone, LightModeTwoTone } from '@mui/icons-material';

export default function ThemeModePicker({ className = '' }) {
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
        <div className={`p-2 rounded-full ${mode === 'light' && ' bg-slate-400/30'}`}>
          <LightModeTwoTone
            onClick={changeMode}
            className="cursor-pointer hover:opacity-50"
            titleAccess="Light mode"
          />
        </div>
        <div className={`p-2 rounded-full ${mode === 'dark' && ' bg-slate-400/30'}`}>
          <DarkModeTwoTone
            onClick={changeMode}
            className="cursor-pointer hover:opacity-50"
            titleAccess="DarkModeTwoTone"
          />
        </div>
      </Stack>
    </div>
  );
}
