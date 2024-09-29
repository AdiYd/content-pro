import { NewUser } from 'src/components/newUser/NewUser';

async function Page({ searchParams, ...props }) {
  const userId = searchParams?.id;
  // console.log('This is search params: ', searchParams);

  return <NewUser params={searchParams} />;
}

export default Page;
