import RootLayout from '../layout';

const pageTtitle = 'Video-pro - קורס אונליין ליצירת תוכן וידאו ומדיה חברתית | ערן פרקש';

export default function CustomLayout({ children }) {
  return <RootLayout title={pageTtitle}>{children}</RootLayout>;
}
