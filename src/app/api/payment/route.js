// /app/api/submit.js

'use server';


import { addPrePayer } from 'src/utils/firebaseFunctions';

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Payment - Message from client: ', data);
    // console.log('calling: ', data.apiUrl);

    const res = await fetch(data.apiUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    const url = await res.text();
    // console.log('This is Text result: ', url);

    const tempUser = { ...data };
    delete tempUser.apiUrl;

    await addPrePayer(tempUser);

    return new Response(JSON.stringify({ message: `Message Received`, url }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request', log: error }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
