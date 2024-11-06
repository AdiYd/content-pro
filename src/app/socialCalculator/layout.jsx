import RootLayout from '../layout';

const pageTtitle = 'Influencers-Pro - מחשבון תמלוגים ברשתות החברתיות';

export default async function CustomLayout({ children }) {
  return <RootLayout title={pageTtitle}>{children}</RootLayout>;
}
