import RootLayout from '../layout';

const pageTtitle = 'influencers-pro - משוב לקורס';

export default function CustomLayout({ children }) {
  return <RootLayout title={pageTtitle}>{children}</RootLayout>;
}
