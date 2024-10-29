import HowMuchYouWorth from 'src/components/worthCalculator/HowMuchYouWorth';

async function Page({ searchParams, ...props }) {
  const { userId, followers, likes, niche, engagementRate } = searchParams;

  return (
    <HowMuchYouWorth
      courseName="Influencer-Pro"
      id={userId}
      followers={followers}
      engagementRate={engagementRate}
      niche={niche}
      likes={likes}
    />
  );
}

export default Page;
