import { parseTokenToQueryParams } from 'src/utils/webToken';

import HowMuchYouWorth from 'src/components/worthCalculator/HowMuchYouWorth';
// eslint-disable-next-line import/no-extraneous-dependencies

async function Page({ searchParams, ...props }) {
  const { token } = searchParams;
  let parsedToken = '';
  if (token) {
    parsedToken = parseTokenToQueryParams(token);
  }
  console.log('This is token : ', token, 'parsed into: ', parsedToken);
  const { userId, followers, likes, niche, engagementRate } = parsedToken;

  return (
    <HowMuchYouWorth
      courseName="Influencer-Pro"
      id={userId}
      followers={followers && followers?.toLocaleString()}
      engagementRate={engagementRate && Number(engagementRate)}
      niche={niche}
      likes={likes && likes.toLocaleString()}
    />
  );
}

export default Page;
