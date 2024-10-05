// /app/api/submit.js

'use server';

import { sendEmail, feedBackTemplate } from 'src/utils/email';

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Feedback form - Message from client: ', data);
    const template = feedBackTemplate(data);
    await sendEmail({
      title: 'טופס משוב חדש',
      template,
    });

    return new Response(JSON.stringify({ message: `Received` }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.log('There was an error with sending feedback form email', e);
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
