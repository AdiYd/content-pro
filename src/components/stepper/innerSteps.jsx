import { useContext } from 'react';

import { Container, Typography } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

const pages = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true },
];

export default function InnerStep({ ...props }) {
  const { mainColor } = useContext(ColorContext);
  return (
    <Container
      sx={{ border: '1px solid', borderRadius: 1, width: 'fit-content', p: 2 }}
      aria-label="Breadcrumb"
      className="flex mx-12 mt-8 mb-8"
    >
      <ol className="flex space-x-4 rounded-md  px-6 shadow">
        <li className="flex">
          <div className="flex items-center">
            <Typography variant="p">לומדים</Typography>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name} className="flex">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                <path fill="#2196f3" d="m30.9 43l3.1-3.1L18.1 24L34 8.1L30.9 5L12 24z" />
              </svg>
              <a
                href={page.href}
                aria-current={page.current ? 'page' : undefined}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
