'use client';

import Contact from 'src/components/contact/contact';

function Page({ searchParams, ...props }) {
  const userId = searchParams?.id;
  console.log('Contact - Leads - Page');
  return <Contact id={userId} />;
}

export default Page;
