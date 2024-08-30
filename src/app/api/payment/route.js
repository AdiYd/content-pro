// /app/api/submit.js

'use server';

import { sendEmail } from 'src/utils/email';

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Message from client: ', data);
    const res = await sendEmail({ data });
    console.log('This is email response: ', res);
    return new Response(JSON.stringify({ message: `Message Received` }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
