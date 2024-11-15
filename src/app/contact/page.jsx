'use client';

import Contact from 'src/components/contact/contact';

function Page({ searchParams, ...props }) {
  const userId = searchParams?.id;
  console.log('Im here also!');
  return <Contact id={userId} />;
}

export default Page;
