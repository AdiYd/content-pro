import RootLayout from '../layout';

const pageTtitle = 'influencers-pro - מחשבון תמלוגים ברשתות החברתיות';

export default async function CustomLayout({ children }) {
  return <RootLayout title={pageTtitle}>{children}</RootLayout>;
}
