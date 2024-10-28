import HowMuchYouWorth from 'src/components/worthCalculator/HowMuchYouWorth';

async function Page({ searchParams, ...props }) {
  const userId = searchParams?.id;

  return <HowMuchYouWorth courseName="Influencers-Pro" id={userId} />;
}

export default Page;
