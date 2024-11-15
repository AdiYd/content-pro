import RootLayout from '../layout';

const pageTtitle = 'Video-pro - השארת פרטים | ערן פרקש';

export default function CustomLayout({ children }) {
  return <RootLayout title={pageTtitle}>{children}</RootLayout>;
}
