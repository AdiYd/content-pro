import Mashov from 'src/components/feedback/Mashov';

async function Page({ searchParams, ...props }) {
  const email = searchParams?.email;

  return <Mashov email={email} />;
}

export default Page;
