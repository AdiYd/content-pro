// /app/api/submit.js

'use server';

import { sendEmail, leadTemplate } from 'src/utils/email';

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Message from client: ', data);
    const template = leadTemplate(data);
    await sendEmail({ data, template, title: 'מתעניין חדש' });
    return new Response(JSON.stringify({ message: `Received: ${data.email}` }), {
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



