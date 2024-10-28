import HowMuchYouWorth from 'src/components/worthCalculator/HowMuchYouWorth';

async function Page({ searchParams, ...props }) {
  const { userId, followers, likes, niche } = searchParams;

  return (
    <HowMuchYouWorth
      courseName="Influencers-Pro"
      id={userId}
      followers={followers}
      niche={niche}
      likes={likes}
    />
  );
}

export default Page;
