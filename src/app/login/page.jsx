import Login from 'src/components/login/Login';

async function Page({ searchParams, ...props }) {
  const userId = searchParams?.id;

  return <Login id={userId} />;
}

export default Page;
