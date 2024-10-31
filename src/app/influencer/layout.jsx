import RootLayout from '../layout';

const pageTtitle = 'influencers-pro - קורס אונליין ליצירת תוכן וידאו ומדיה חברתית | ערן פרקש';

export default function CustomLayout({ children }) {
  return <RootLayout title={pageTtitle}>{children}</RootLayout>;
}
