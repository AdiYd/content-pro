import { useContext } from 'react';

import { useTheme } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { ColorContext } from 'src/context/colorMain';

const stats = [
  { id: 1, name: 'סירטוני תדמית', value: 'Brand 1' },
  { id: 2, name: 'סרטוני מכירות', value: 'Brand 2' },
  { id: 3, name: 'שיווק באינסטגרם', value: 'Brand 3' },
  { id: 4, name: 'תוכן לטיקטוק', value: 'Brand 4' },
];

export default function Promotion1() {
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);

  return (
    <div
      style={{
        backgroundRepeat: 'round',
        // backgroundImage: `url(${CONFIG.site.basePath}/assets/background/pexels-belle-co-99483-1000444.jpg), url(${CONFIG.site.basePath}/assets/background/overlay.svg)`,
      }}
      className="relative isolate overflow-hidden bg-gray-900 pt-24 pb-12 sm:pt-32 sm:pb-12"
    >
      <img
        alt=""
        src={`${CONFIG.site.basePath}/assets/background/pexels-belle-co-99483-1000444.jpg`}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="aspect-[1266/975] w-[79.125rem] bg-gradient-to-tr from-[#717171] to-[#123] opacity-30"
          />
        </div>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
          <h2
            style={{ color: theme.palette[mainColor]?.main }}
            className="text-lg font-semibold leading-8 "
          >
            עם מי אנחנו עובדים?
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            יוצרים קשרים וחיבורים בין בעלי עסקים ויוצרי תוכן מצויניים
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            כשתצטרפו לקהילה תוכלו לדבר עם יוצרי תוכן מתחילים ומנוסים, לקבל טיפים וליצור קשרים עם
            עסקים שצריכים יוצרי תוכן איכותיים לעסק שלהם
          </p>
        </div>
        <dl className="mx-auto mt-24 pt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
              <dt className="text-sm leading-6">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
